import Card from "../../ui/Card";
import classes from "./Forecast.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faTint } from "@fortawesome/free-solid-svg-icons";

function Forecast(props) {

  return props.forecast.map((day, index) => {
    return (
      <Card key={index}>
      <div className={classes.container}>
        <h1 className={classes.day}>{props.days[index]}</h1>
        <div className={classes.weatherIcon}>
          <img src={day.icon} alt="weather icon"/>
        </div>
        <div className={classes.weatherDescription}>
          {day.text}
        </div>
        <div className={classes.precipitation}>
          <div>
            <FontAwesomeIcon icon={faTint} />
          </div>
          <div>{day.daily_chance_of_rain}%</div>
        </div>
        <h2 className={classes.highReading}>
          {day.max_temp}°
        </h2>
        <h2 className={classes.lowReading}>
          {day.min_temp}°
        </h2>
      </div>
    </Card>

    );
  });

}

export default Forecast;
