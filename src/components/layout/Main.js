import classes from "./Main.module.css";

function Main(props) {
  return (
    <div className={classes.main}>
      {props.children}
    </div>
  );
}

export default Main;
