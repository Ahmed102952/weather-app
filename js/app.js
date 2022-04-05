let weatherData = {}

// const location = 'cairo'
const city = document.querySelector('.city');
const temp = document.querySelector('.temp');
const cloud = document.querySelector('.cloud');
const humidity = document.querySelector('.humidity');
const country = document.querySelector('.country');
const sky = document.querySelector('.sky');
const windSpeed = document.querySelector('.wind-speed');
const btn = document.querySelector('.btn');
const icon = document.querySelector('.icon');
const date = document.querySelector('.date')
const body = document.querySelector('body');
let input = 'london'
window.addEventListener('load', performAction);
btn.addEventListener('click',(event)=> {
  event.preventDefault();
  input = document.querySelector('#location').value;
  performAction();
});

function performAction(event){
  
  

  if (input == '') {
    window.alert('Please type city name or zip code')
  } else {
    
    getWeather(input)
    
    .then(function(data) {
      weatherData = {
        name: data.location.name,
        country: data.location.country,
        localtime: data.location.localtime_epoch,
        temp: data.current.temp_c,
        isDay: data.current.is_day,
        icon: data.current.condition.icon,
        code: data.current.condition.code,
        windSpeed: data.current.wind_kph,
        humidity: data.current.humidity,
        cloud: data.current.cloud,
        text: data.current.condition.text,
    };
      updateUI()
    }) 
    
  }
  
    
}

const getWeather = async (location) => {
    const apiKey = '725db190927346f79ea144536220503'
    const apiUrl = 'https://api.weatherapi.com/v1/current.json?key='
    const res = await fetch(`${apiUrl}${apiKey}&q=${location}&aqi=no`) 
      try {
        const data = await res.json();
        return data
      } catch(error) {
        window.alert('please, try again');
      }
    
}

const updateUI = ()=> {
    
    temp.innerHTML = `${weatherData.temp.toFixed(0)}&deg;`;
    city.innerHTML = weatherData.name;
    country.innerHTML = weatherData.country;
    cloud.innerHTML = `${weatherData.cloud}%`;
    humidity.innerHTML = `${weatherData.humidity}%`;
    sky.innerHTML = weatherData.text;
    windSpeed.innerHTML = `${weatherData.windSpeed}km/h`;
    icon.src = weatherData.icon
    const isDay = weatherData.isDay;
    const code = weatherData.code;
    let localtime = weatherData.localtime;
    let timeOfTheDay = 'day'
    let skyState = 'clear';
    if (
      code == 1000
    ) {
      skyState = 'clear'
    } else if (code == 1003) {
      skyState = 'partly-cloudy'
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
      skyState = 'cloudy'
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
      skyState = 'snow'
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
      skyState = 'rain'
    }
    if (isDay == 1) {
      timeOfTheDay = 'day'
    } else {
      timeOfTheDay = 'night'
    }
    body.style.backgroundImage = `url(../assests/img/${timeOfTheDay}/${skyState}.)`
    let time = new Date(localtime * 1000)
    let h = time.getHours().toLocaleString('en-US', {minimumIntegerDigits: 2});
    let min = time.getMinutes().toLocaleString('en-US', {minimumIntegerDigits: 2});
    let day = time.getDay();
    let d = time.getDate();
    let m = time.getMonth();
    let y = time.getFullYear().toString().slice(2);
    const days = ["Sun", "Mon", "Tues", "Wed", "Thu", "Fri", "Sat"];
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    date.innerHTML = `${h}:${min}-${days[day]}, ${d} ${months[m]} '${y}`
    document.querySelector('#location').value = '';
  } 

