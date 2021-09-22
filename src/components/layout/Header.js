import classes from './Header.module.css';
import image from '../../weather logo.png'

function Header() {
 return (
     <header className={classes.header}>
         <div className={classes.imageContainer}><img src={image} alt="sun and cloud logo" className={classes.logo}/></div>
         <h1 className={classes.title}>Weather Forecast</h1>
     </header>
 )
}

export default Header;
