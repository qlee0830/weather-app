import React, { useState, useEffect } from "react";
import WeatherCard from "./components/Weather";
import { Dimmer, Loader } from "semantic-ui-react";
import LocationSearchInput from "./components/PlaceInput";

import "./App.css";

export default function App() {
  const [latLng, setLatLng] = useState(null);
  const [data, setData] = useState([]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setLatLng({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
    });
  }, []);

  useEffect(() => {
    if (latLng && latLng.lat && latLng.lng) {
      fetchData();
    }
  }, [latLng]);

  const fetchData = async () => {
    await fetch(
      `${process.env.REACT_APP_API_URL}/weather/?lat=${latLng.lat}&lon=${latLng.lng}&units=metric&APPID=${process.env.REACT_APP_API_KEY}`
    )
      .then((res) => res.json())
      .then((result) => {
        setData(result);
      });
  };

  const saveLocation = (location) => {
    setLatLng(location);
  };

  return (
    <div className="App">
      {typeof data.main != "undefined" ? (
        <div>
          <LocationSearchInput saveLocation={saveLocation} />
          <WeatherCard weatherData={data} />
        </div>
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
