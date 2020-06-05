import React from 'react';

import rolLogo from '../../assets/logo.png';
import classes from './Logo.module.css';
const logo = () => (
    <div className={classes.Logo}>
        <img src={rolLogo} alt='Rol Game' />
    </div>
);

export default logo;