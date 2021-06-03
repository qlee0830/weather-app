import React, { useState, useEffect } from "react";
import WeatherCard from "./components/Weather";
import { Dimmer, Loader } from "semantic-ui-react";

import "./App.css";

export default function App() {
  const [lat, setLat] = useState([]);
  const [long, setLong] = useState([]);
  const [data, setData] = useState([]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setLat(position.coords.latitude);
      setLong(position.coords.longitude);
    });
  }, []);

  useEffect(() => {
    if (lat && long) {
      fetchData();
    }
  }, [lat, long]);

  const fetchData = async () => {
    await fetch(
      `${process.env.REACT_APP_API_URL}/weather/?lat=${lat}&lon=${long}&units=metric&APPID=${process.env.REACT_APP_API_KEY}`
    )
      .then((res) => res.json())
      .then((result) => {
        setData(result);
        console.log(result);
      });
  };

  return (
    <div className="App">
      {typeof data.main != "undefined" ? (
        <WeatherCard weatherData={data} />
      ) : (
        <div>
          <Dimmer active>
            <Loader>Loading ...</Loader>
          </Dimmer>
        </div>
      )}
    </div>
  );
}
