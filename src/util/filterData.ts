export default (data: any): IWeatherData => {
    const filteredData: IWeatherData = {
      name: data.location.name as string,
      country: data.location.country as string,
      localtime: data.location.localtime_epoch as number,
      temp: data.current.temp_c as number,
      isDay: data.current.is_day as 0 | 1,
      icon: data.current.condition.icon as string,
      code: data.current.condition.code as number,
      windSpeed: data.current.wind_kph as number,
      humidity: data.current.humidity as number,
      cloud: data.current.cloud as number,
      text: data.current.condition.text as string,
    };
    return filteredData;
  
};

export interface IWeatherData {
  name: string;
  country: string;
  localtime: number;
  temp: number;
  isDay: 0 | 1;
  icon: string;
  code: number;
  windSpeed: number;
  humidity: number;
  cloud: number;
  text: string;
}
