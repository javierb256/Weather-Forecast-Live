import classes from "./Current.module.css"

function Current(props) {
    // console.log(props)
    return (
        <div className={classes.container}>
            <h2 className={classes.title}>Current Weather</h2>
            <div className={classes.info}>
                <div>
                    <img src={props.current.condition.icon} alt="current weather icon"/>
                    <div>{props.current.temp_f}°</div>
                </div>
                <div>
                    <h2>{props.current.condition.text}</h2>
                </div>
            </div>
        </div>
    )
}

export default Current;