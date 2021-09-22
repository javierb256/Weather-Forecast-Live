import { useState, useEffect } from "react";
import classes from "./Weather.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import Location from "./Location/Location";
import Forecast from "./Forecast/Forecast";
import Current from "./Current/Current";
import Main from "../layout/Main";

function Weather() {
  const [locationName, setLocationName] = useState(null);
  const [loading, setLoading] = useState(true);
  const [value, setValue] = useState("");
  const [pressure, setPressure] = useState();
  const [visibility, setVisibility] = useState();
  const [wind, setWind] = useState();
  const [humidity, setHumidity] = useState();
  const [icon, setIcon] = useState();
  const [text, setText] = useState();
  const [forecastFahrenheit, setForecastFahrenheit] = useState();
  const [forecastCelsius, setForecastCelsius] = useState();
  const [isFarenheight, setFarenheight] = useState(true);
  const [weatherFahrenheit, setWeatherFahrenheit] = useState();
  const [weatherCelsius, setWeatherCelsius] = useState();

  //default zip code
  const [zipCode, setzipCode] = useState(91324);

  // const [error, setError] = useState(null);
  const [days, setDays] = useState([]);

  //GETS data from api and will rerun when the zipcode is changed
  useEffect(() => {
    //sets the loading state as true to indicate loading data
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
        convertDates(data);
        //function to setup initial data
        setInitial(data);
      })
      .finally(() => setLoading(false))
      .catch((error) => {
        console.error("Error fetching data: ", error);
        // setError(error);
      });
  }, [zipCode]);

  //A function that sets the initial data that will passed on to different child components (Forecast, Current)
  function setInitial(data) {
    //[0] = temp_f; [1]=feelslike_f
    const temperatureFahrenheit = [];
    //[0] = temp_c, [1]=feelslike_c
    const temperatureCelsius = [];
    //[0] = miles [1]=kilometers
    const visibility = [];
    //[0] = in [1] = mb
    const pressure = [];
    //[0] = mph [1] = kph
    const wind = [];

    const forecastF = [];
    const forecastC = [];

    temperatureFahrenheit.push(data.current.temp_f);
    temperatureFahrenheit.push(data.current.feelslike_f);
    temperatureCelsius.push(data.current.temp_c);
    temperatureCelsius.push(data.current.feelslike_c);
    visibility.push(data.current.vis_miles + " mi");
    visibility.push(data.current.vis_km + " km");
    pressure.push(data.current.pressure_in + " in");
    pressure.push(data.current.pressure_mb + " mb");
    wind.push(data.current.wind_mph + " mph");
    wind.push(data.current.wind_kph + " km/h");

    //loops throught the forecastday array and stores the fahrenheit data
    data.forecast.forecastday.forEach((day) => {
      forecastF.push({
        max_temp: day.day.maxtemp_f,
        min_temp: day.day.mintemp_f,
        icon: day.day.condition.icon,
        text: day.day.condition.text,
        daily_chance_of_rain: day.day.daily_chance_of_rain,
      });
    });
    //loops throught the forecastday array and stores the celsius data
    data.forecast.forecastday.forEach((day) => {
      forecastC.push({
        max_temp: day.day.maxtemp_c,
        min_temp: day.day.mintemp_c,
        icon: day.day.condition.icon,
        text: day.day.condition.text,
        daily_chance_of_rain: day.day.daily_chance_of_rain,
      });
    });
    setPressure(pressure);
    setVisibility(visibility);
    setWind(wind);
    setWeatherFahrenheit(temperatureFahrenheit);
    setWeatherCelsius(temperatureCelsius);
    setHumidity(data.current.humidity);
    setIcon(data.current.condition.icon);
    setText(data.current.condition.text);
    setForecastFahrenheit(forecastF);
    setForecastCelsius(forecastC);
  }

  //stores the typed value in the zip code search bar in a variable
  const handleChange = (event) => {
    setValue(event.target.value);
  };

  //sets the zipcode from the stored value variable
  const handleSubmit = (event) => {
    event.preventDefault();
    setzipCode(value);
  };

  //changes the fahrenheit state when the unit button is pressed
  const toggleWeather = () => {
    if (isFarenheight) {
      setFarenheight(false);
    } else {
      setFarenheight(true);
    }
  };

  //converts the dates into days of the week
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
          <div className={classes.searchFilter}>
            <form onSubmit={handleSubmit}>
              <input
                className={classes.search}
                type="text"
                value={value}
                onChange={handleChange}
                placeholder="Enter Zip Code"
              />
              <button type="submit" value="submit" className="searchButton">
                <FontAwesomeIcon icon={faSearch} />
              </button>
            </form>

            <div className={classes.toggleBox}>
              <div className={classes.toggle}>
                <input type="checkbox" onClick={toggleWeather} />
                <label className={classes.onbtn}>
                  C°
                </label>
                <label className={classes.offbtn}>
                  F°
                </label>
              </div>
            </div>
          </div>

          <Location location={locationName} />
          {isFarenheight ? (
            <Current
              currentWeather={weatherFahrenheit}
              icon={icon}
              text={text}
              humidity={humidity}
              pressure={pressure[0]}
              visibility={visibility[0]}
              wind={wind[0]}
            />
          ) : (
            <Current
              currentWeather={weatherCelsius}
              icon={icon}
              text={text}
              humidity={humidity}
              pressure={pressure[1]}
              visibility={visibility[1]}
              wind={wind[1]}
            />
          )}
          <h2 className={classes.title}>5 day forecast</h2>
          <Main>
            {isFarenheight ? (
              <Forecast forecast={forecastFahrenheit} days={days} />
            ) : (
              <Forecast forecast={forecastCelsius} days={days} />
            )}
          </Main>
        </>
      )}
    </>
  );
}

export default Weather;
