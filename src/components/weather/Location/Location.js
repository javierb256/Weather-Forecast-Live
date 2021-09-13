import classes from './Location.module.css';

function Location(props){
    return (
        <>
        <h2 className={classes.title}>Current Location: {props.location.name}, {props.location.country}</h2>
        </>
    )
}

export default Location;