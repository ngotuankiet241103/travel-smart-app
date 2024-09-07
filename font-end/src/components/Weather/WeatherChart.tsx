/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import {
  fetchWeather,
  fetchDailyWeather,
} from "../../fetchApi/fetchWeatherApi";

interface WeatherSmartCardProps {
  lat: number;
  lng: number;
}

const weatherTranslations: { [key: string]: string } = {
  "clear sky": "Trời quang",
  "few clouds": "Ít mây",
  "scattered clouds": "Mây rải rác",
  "overcast clouds": "Mây u ám",
  "broken clouds": "Mây đứt đoạn",
  "shower rain": "Mưa rào",
  "light rain": "Mưa nhẹ",
  "light intensity shower rain": "Mưa rào",
  "moderate rain": "Mưa vừa",
  rain: "Mưa",
  thunderstorm: "Bão",
  snow: "Tuyết",
  mist: "Sương mù",
};

const WeatherSmartCard: React.FC<WeatherSmartCardProps> = ({ lat, lng }) => {
  const [weatherData, setWeatherData] = useState<any>(null);
  const [forecastData, setForecastData] = useState<any[]>([]);

  useEffect(() => {
    const getWeatherData = async () => {
      const weather = await fetchWeather(lat, lng);
      const forecast = await fetchDailyWeather(lat, lng);

      // Lọc ra chỉ một bản ghi mỗi ngày
      const filteredForecast = forecast.list.filter(
        (entry: any, index: number, self: any) =>
          new Date(entry.dt * 1000).getDate() !==
          new Date(self[index - 1]?.dt * 1000).getDate()
      );

      setWeatherData(weather);
      setForecastData(filteredForecast);
    };

    getWeatherData();
  }, [lat, lng]);

  const translateWeatherDescription = (description: string) => {
    return weatherTranslations[description] || description;
  };

  return weatherData ? (
    <div className="p-2 bg-slate-200 rounded-lg shadow-lg max-w-md mx-auto">
      <div className="flex items-center">
        <img
          src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
          alt={weatherData.weather[0].description}
          className="w-12 h-12"
        />
        <div className="ml-2">
          <p>
            <strong>Thời tiết:</strong>{" "}
            {translateWeatherDescription(weatherData.weather[0].description)}
          </p>
          <p>
            <strong>Nhiệt độ:</strong> {Math.round(weatherData.main.temp)}°C
          </p>
        </div>
      </div>
      <h3 className="text-md font-bold mb-2 text-primary">Dự báo thời tiết trong các ngày tới</h3>
      <ul className="space-y-2">
        {forecastData.map((entry, index) => (
          <li key={index} className="flex items-center justify-between">
            <span>
              {new Date(entry.dt * 1000).toLocaleDateString("vi-VN", {
                weekday: "long",
                day: "numeric",
                month: "numeric",
              })}
            </span>
            <span>{Math.round(entry.main.temp)}°C</span>
            <span>
              {translateWeatherDescription(entry.weather[0].description)}
            </span>
          </li>
        ))}
      </ul>
    </div>
  ) : (
    <p>Đang tải dữ liệu...</p>
  );
};

export default WeatherSmartCard;
