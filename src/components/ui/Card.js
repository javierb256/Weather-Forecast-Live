import classes from './Card.module.css';

//use props to pass in 
function Card(props) {
    return (
    <div className={classes.card}>
        {props.children}
    </div>
    )
}

export default Card;