import Card from "../../ui/Card";
import classes from "./Forecast.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faTint } from "@fortawesome/free-solid-svg-icons";

function Forecast(props) {
  // const forecast = props.weather.forecast.forecastday[0].day;
//   console.log(props)
//   console.log(props.forecast.forecastday[0].day.daily_chance_of_rain)
  return props.forecast.forecastday.map((day, index) => {
    return (
        <Card >
          <div className={classes.container}>
            <h1 className={classes.day}>{props.days[index]}</h1>
            <div className={classes.weatherIcon}>
              {/* <FontAwesomeIcon icon={faSun} size="3x" /> */}
              <img src={day.day.condition.icon} alt="weather icon"/>
            </div>
            <div className={classes.weatherDescription}>
              {day.day.condition.text}
            </div>
            <div className={classes.precipitation}>
              <div>
                <FontAwesomeIcon icon={faTint} />
              </div>
              <div>{day.day.daily_chance_of_rain}%</div>
            </div>
            <h2 className={classes.highReading}>
              {day.day.maxtemp_f}°
            </h2>
            <h2 className={classes.lowReading}>
              {day.day.mintemp_f}°
            </h2>
          </div>
        </Card>
    );
  });
}

export default Forecast;
