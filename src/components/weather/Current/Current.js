import classes from "./Current.module.css";

function Current(props) {
  return (
    <div className={classes.container}>
      <h2 className={classes.title}>Current Weather</h2>
      <div className={classes.info}>
        <div>
          <img src={props.icon} alt="current weather icon" />
          <div>{props.currentWeather[0]}°</div>
        </div>
        <div>
          <h2>{props.text}</h2>
          <p>Feels Like {props.currentWeather[1]}°</p>
        </div>
      </div>
      <div className={classes.subInfo}>
        <div>
          <h3>Humidity</h3>
          <p>{props.humidity}%</p>
        </div>
        <div>
          <h3>Pressure</h3>
          <p>{props.pressure}</p>
        </div>
        <div>
          <h3>Visibility</h3>
          <p>{props.visibility}</p>
        </div>
        <div>
          <h3>Wind</h3>
          <p>{props.wind}</p>
        </div>
      </div>
    </div>
  );
}

export default Current;
