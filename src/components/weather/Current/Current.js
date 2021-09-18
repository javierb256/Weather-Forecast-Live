import classes from "./Current.module.css";

function Current(props) {
  console.log(props);
  return (
    <div className={classes.container}>
      <h2 className={classes.title}>Current Weather</h2>
      <div className={classes.info}>
        <div>
          <img src={props.current.condition.icon} alt="current weather icon" />
          <div>{props.current.temp_f}°</div>
        </div>
        <div>
          <h2>{props.current.condition.text}</h2>
          <p>Feels Like {props.current.feelslike_f}°</p>
        </div>
      </div>
      <div className={classes.subInfo}>
        <div>
          <h3>Humidity</h3>
          <p>{props.current.humidity}%</p>
        </div>
        <div>
          <h3>Pressure</h3>
          <p>{props.current.pressure_in}in</p>
        </div>
        <div>
          <h3>Visibility</h3>
          <p>{props.current.vis_miles} mi</p>
        </div>
        <div>
          <h3>Wind</h3>
          <p>{props.current.wind_mph} mph</p>
        </div>
      </div>
    </div>
  );
}

export default Current;
