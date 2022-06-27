import { IWeatherData } from "./util/filterData";


  window.onload = () => {
    if (localStorage.location) {
      displayWeather(localStorage.location as string);
      return;
    } else {
      displayWeather("london");
    }
  }
(document.querySelector("#form") as HTMLFormElement).addEventListener(
  "submit",
  (e: SubmitEvent) => {
    e.preventDefault();
    if ((document.querySelector("#location") as HTMLInputElement).value == "") {
      window.alert("Please enter location");
      return;
    }
    displayWeather(
      (document.querySelector("#location") as HTMLInputElement).value
    );
    localStorage.location = (
      document.querySelector("#location") as HTMLInputElement
    ).value;
  }
);

const reqData = async (location: string): Promise<IWeatherData> => {
    const res = await fetch(`./weather/${location}`);
    const weather = await res.json();
    return weather;
};

const displayWeather = async (location: string) => {
  try {
    const weather = await reqData(location);
    updateUI(weather);
  } catch (err) {
    window.alert("Please try again");
    throw err;
  }
};

const updateUI = async (weatherData: IWeatherData) => {
  const city = document.querySelector(".city") as Element;
  const temp = document.querySelector(".temp") as Element;
  const cloud = document.querySelector(".cloud") as Element;
  const humidity = document.querySelector(".humidity") as Element;
  const country = document.querySelector(".country") as Element;
  const sky = document.querySelector(".sky") as Element;
  const windSpeed = document.querySelector(".wind-speed") as Element;
  const icon = document.querySelector(".icon") as HTMLImageElement;
  const date = document.querySelector(".date") as Element;
  const bg = document.querySelector(".bg img") as HTMLImageElement;
  try {
    temp.innerHTML = `${weatherData.temp.toFixed(0)}&deg;`;
    city.innerHTML = weatherData.name;
    country.innerHTML = weatherData.country;
    cloud.innerHTML = `${weatherData.cloud}%`;
    humidity.innerHTML = `${weatherData.humidity}%`;
    sky.innerHTML = weatherData.text;
    windSpeed.innerHTML = `${weatherData.windSpeed}km/h`;
    icon.src = weatherData.icon;

    let timeOfTheDay = "day";
    if (weatherData.isDay == 1) {
      timeOfTheDay = "day";
    } else {
      timeOfTheDay = "night";
    }
    const skyStateImg = setSkyState(weatherData.code);
    bg.src = `./images/${timeOfTheDay}/${skyStateImg}.jpg`;

    const { hour, min, dayInWeek, dayInMonth, month, year } = formatDate(
      weatherData.localtime
    );

    date.innerHTML = `${hour}:${min}-${dayInWeek}, ${dayInMonth} ${month} '${year}`;
    (document.querySelector("#location") as HTMLInputElement).value = "";
  } catch (error) {
    console.log(error);
  }
};

const formatDate = (localtime_epoch: number) => {
  const time = new Date(localtime_epoch * 1000);
  const hour = time
    .getHours()
    .toLocaleString("en-US", { minimumIntegerDigits: 2 });
  const min = time
    .getMinutes()
    .toLocaleString("en-US", { minimumIntegerDigits: 2 });
  const dayInMonth = time.getDate();
  const year = time.getFullYear().toString().slice(2);
  const days = ["Sun", "Mon", "Tues", "Wed", "Thu", "Fri", "Sat"];
  const dayInWeek = days[time.getDay()];
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const month = months[time.getMonth()];
  return { hour, min, dayInWeek, dayInMonth, year, month };
};

const setSkyState = (code: number): string => {
  let skyState = "partly-cloudy";

  if (code == 1000) {
    skyState = "clear";
  } else if (code == 1003) {
    skyState = "partly-cloudy";
  } else if (
    code == 1009 ||
    code == 1006 ||
    code == 1063 ||
    code == 1230 ||
    code == 1066 ||
    code == 1069 ||
    code == 1072 ||
    code == 1087 ||
    code == 1135 ||
    code == 1147 ||
    code == 1150 ||
    code == 1153 ||
    code == 1168 ||
    code == 1180
  ) {
    skyState = "cloudy";
  } else if (
    code == 1219 ||
    code == 1222 ||
    code == 1213 ||
    code == 1114 ||
    code == 1204 ||
    code == 1216 ||
    code == 1207 ||
    code == 1210 ||
    code == 1225 ||
    code == 1237 ||
    code == 1255 ||
    code == 1258 ||
    code == 1261 ||
    code == 1264 ||
    code == 1282
  ) {
    skyState = "snow";
  } else if (
    code == 1117 ||
    code == 1171 ||
    code == 1183 ||
    code == 1189 ||
    code == 1186 ||
    code == 1192 ||
    code == 1195 ||
    code == 1198 ||
    code == 1201 ||
    code == 1240 ||
    code == 1243 ||
    code == 1246 ||
    code == 1273 ||
    code == 1276 ||
    code == 1279
  ) {
    skyState = "rain";
  }
  return skyState;
};
