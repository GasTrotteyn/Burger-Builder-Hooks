import React from 'react';
import burguerLogo from '../../assets/images/burger-logo.png'
import classes from './Logo.module.css'

const logo = (props) => (
    <div className={classes.Logo} >
        <img src={burguerLogo} alt='logo'></img>

    </div>
);

export default logo;