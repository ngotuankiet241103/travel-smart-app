/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { fetchWeather } from "../../fetchApi/fetchLocationDetails ";

interface WeatherInfoProps {
  lat: number;
  lng: number;
}

// interface WeatherData {
//   weather: { description: string }[];
//   main: { temp: number };
// }

const weatherTranslations: { [key: string]: string } = {
  "clear sky": "Trời quang",
  "few clouds": "Ít mây",
  "scattered clouds": "Mây rải rác",
  "overcast clouds" : "Mây u ám",
  "broken clouds": "Mây đứt đoạn",
  "shower rain": "Mưa rào",
  "light rain": "Mưa nhẹ",
  "light intensity shower rain" : "Mưa rào",
  "rain": "Mưa",
  "thunderstorm": "Bão",
  "snow": "Tuyết",
  "mist": "Sương mù",
};

const WeatherInfo: React.FC<WeatherInfoProps> = ({ lat, lng }) => {
  const [weather, setWeather] = useState<any>(null);
  const [lastFetchTime, setLastFetchTime] = useState<number | null>(null);

  const translateWeatherDescription = (description: string) => {
    return weatherTranslations[description] || description;
  };

  useEffect(() => {
    const getWeather = async () => {
      const currentTime = Date.now();
      if (!lastFetchTime || currentTime - lastFetchTime > 10 * 60 * 1000) {
        const data = await fetchWeather(lat, lng);
        setWeather(data);
        setLastFetchTime(currentTime);
      }
    };

    getWeather();
    const interval = setInterval(getWeather, 10 * 60 * 1000);

    return () => clearInterval(interval);
  }, [lat, lng, lastFetchTime]);

  return (
    weather && (
      <div>
        <p>
          <strong>Thời tiết:</strong> {translateWeatherDescription(weather.weather[0].description)}
        </p>
        <p>
          <strong>Nhiệt độ:</strong> {Math.floor(weather.main.temp)}°C
        </p>
      </div>
    )
  );
};

export default WeatherInfo;
