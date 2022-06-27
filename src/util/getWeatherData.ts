import filterData from "./filterData";

const getWeather = async (location: string) => {
  const apiKey = "725db190927346f79ea144536220503";
  const apiUrl = "https://api.weatherapi.com/v1/current.json?key=";
  try {
    const res = await fetch(`${apiUrl}${apiKey}&q=${location}&aqi=no`);
    if (res.status === 200) {
      const data = await res.json();
      const filtered = filterData(data);
      return filtered;
    }
  } catch (err) {
    throw `Failed, ${err}`;
  }
};

export default getWeather;
