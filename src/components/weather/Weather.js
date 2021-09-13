import { useState, useEffect } from "react";
import classes from "./Weather.module.css";
import Location from "./Location/Location";
import Forecast from "./Forecast/Forecast";
import Current from "./Current/Current";
import Main from "../layout/Main";

function Weather() {
  const [locationName, setLocationName] = useState(null);
  // const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(true);
  const [forecast, setForecast] = useState(null);
  const [current, setCurrent] = useState();

  //default zip code
  const zipCode = 91324;

  // const [error, setError] = useState(null);
  const [days, setDays] = useState([]);

  useEffect(() => {
    setLoading(true);
    fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=${process.env.REACT_APP_API_KEY}${zipCode}`
    )
      //gets a response and parses it into a json object
      .then((response) => {
        //if the response is received return the json and move to next .then
        if (response.ok) {
          return response.json();
        }
        //if error throw the error to catch handling
        throw response;
      })
      .then((data) => {
        setLocationName(data.location);
        setForecast(data.forecast);
        convertDates(data);
        setCurrent(data.current)
        console.log(data)
      })
      .finally(() => setLoading(false))
      .catch((error) => {
        console.error("Error fetching data: ", error);
        // setError(error);
      });
  }, []);

  function convertDates(data) {
    const temp = [];
    data.forecast.forecastday.forEach((day) => {
      let oldDate = day.date.split("-");
      //change "-" with "/" to work with safari browsers
      let newDate = oldDate[1] + "/" + oldDate[2] + "/" + oldDate[0];
      let date = new Date(newDate);
      temp.push(date.toLocaleDateString("en-US", { weekday: "long" }));
    });
    setDays(temp);
  }

  return (
    <>
      {loading ? (
        <h1 className={classes.loading}>Getting Weather Data</h1>
      ) : (
        <>
          <Location location={locationName} />
          <Current current={current}/>
          <h2 className={classes.title}>5 day forecast</h2>
          <Main>
          <Forecast forecast={forecast} days={days} current={current} />
          </Main>
        </>
      )}
    </>
  );
}

export default Weather;
