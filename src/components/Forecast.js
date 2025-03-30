import React, { useEffect, useState } from "react";
import axios from "axios";
import ReactAnimatedWeather from "react-animated-weather";

function Forecast({ weather }) {
  const { data } = weather;
  const [forecastData, setForecastData] = useState([]);
  const [isCelsius, setIsCelsius] = useState(true);
  const [forecast, setForecast] = useState([]);
  const [loading,setLoading]=useState(true);
  
  console.log("OpenWeatherMap data", data);
 let city=data.name;
 console.log("city",city);
  const API_KEY = process.env.REACT_APP_API_KEY;

  useEffect(() => {
    fetchWeather();
  }, [city]);

  const fetchWeather = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`
      );
      setForecast(response.data.list);
    } catch (error) {
      console.error("Error fetching weather:", error);
    } finally {
      setLoading(false);
    }
  };
  console.log("5Dyas",forecast)
 
  const formatDay = (timestamp) => {
    const options = { weekday: "short" };
    const date = new Date(timestamp * 1000);
    return date.toLocaleDateString("en-US", options);
  };

  const getCurrentDate = () => {
    const options = {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    };
    return new Date().toLocaleDateString("en-US", options);
  };

  const toggleTemperatureUnit = () => {
    setIsCelsius((prevState) => !prevState);
  };

  const convertToFahrenheit = (temperature) => {
    return Math.round((temperature * 9) / 5 + 32);
  };

  const renderTemperature = (temperature) => {
    return isCelsius
      ? Math.round(temperature)
      : convertToFahrenheit(temperature);
  };

  return (
    <div>
      <div className="city-name">
        <h2>
          {data.name}, <span>{data.sys?.country}</span>
        </h2>
      </div>
      
      <div className="date">
        <span>{getCurrentDate()}</span>
      </div>
      
      <div className="temp">
        {data.weather?.[0]?.icon && (
          <img
            src={`http://openweathermap.org/img/w/${data.weather[0].icon}.png`}
            alt={data.weather[0].description}
            className="temp-icon"
          />
        )}
        <div className="temp-value">
          {renderTemperature(data.main?.temp)}
          <sup className="temp-deg" onClick={toggleTemperatureUnit}>
            {isCelsius ? "°C" : "°F"} | {isCelsius ? "°F" : "°C"}
          </sup>
        </div>
      </div>
      
      <p className="weather-des">{data.weather?.[0]?.description}</p>
      
      <div className="weather-info">
        <div className="col">
          <ReactAnimatedWeather icon="WIND" size="40" />
          <div>
            <p className="wind">{data.wind?.speed} m/s</p>
            <p>Wind speed</p>
          </div>
        </div>
        <div className="col">
          <ReactAnimatedWeather icon="RAIN" size="40" />
          <div>
            <p className="humidity">{data.main?.humidity}%</p>
            <p>Humidity</p>
          </div>
        </div>
      </div>
      <div className="forecast">
  <h3>5-Day Forecast:</h3>
  <div className="forecast-container">
    {forecast &&
      forecast.slice(0, 5).map((day) => (
        <div className="day" key={day.dt}>
          <p className="day-name">{formatDay(day.dt)}</p>
          {day.weather?.[0]?.icon && (
            <img
              className="day-icon"
              src={`https://openweathermap.org/img/w/${day.weather[0].icon}.png`}
              alt={day.weather[0].description}
            />
          )}
          <p className="day-temperature">
            {Math.round(day.main.temp_min)}° /{" "}
            <span>{Math.round(day.main.temp_max)}°</span>
          </p>
        </div>
      ))}
  </div>
</div>
    
    </div>
  );
}

export default Forecast;