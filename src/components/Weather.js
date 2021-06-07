import React from "react";
import moment from "moment";
import { Button } from "semantic-ui-react";

import "./Weather.css";

const refresh = () => {
  window.location.reload();
};

const WeatherCard = ({ weatherData }) => {
  console.log(weatherData);
  return (
    <div className="weather-main">
      <div className="weather-top">
        <p className="header">{weatherData.name}</p>
        <Button
          className="refresh-btn"
          onClick={refresh}
          inverted
          circular
          color="blue"
          icon="refresh"
        />
      </div>
      <div className="position">
        <p className="date">
          {moment().format("dddd") + " " + moment().format("LL")}
        </p>
        <p className="desc">{weatherData.weather[0].description}</p>
      </div>
      <div className="position">
        <p className="temp">Temperature: {weatherData.main.temp} &deg;C</p>
        <p className="hum">Humidity: {weatherData.main.humidity} %</p>
      </div>
      <div className="position">
        <p className="sun">
          Sunrise -{" "}
          {new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString("en-US")}
        </p>
        <p className="sun">
          Sunset -{" "}
          {new Date(weatherData.sys.sunset * 1000).toLocaleTimeString("en-US")}
        </p>
      </div>
    </div>
  );
};

export default WeatherCard;
