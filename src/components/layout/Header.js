import classes from './Header.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun } from '@fortawesome/free-solid-svg-icons';
import {faCloud } from '@fortawesome/free-solid-svg-icons';
import image from '../../weather logo.png'

function Header() {
 return (
     <header className={classes.header}>
         <div className={classes.imageContainer}><img src={image} alt="sun and cloud logo" className={classes.logo}/></div>
         <h1 className={classes.title}>Weather Forecast</h1>
         {/* <div><FontAwesomeIcon icon={faCloud} size="3x"/></div> */}
     </header>
 )
}

export default Header;
