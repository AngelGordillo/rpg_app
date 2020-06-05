import React from 'react';

import classes from './ToggleIcon.module.css';
const toogleIcon = (props) =>(
    <div className={classes.DrawerToggle} onClick={props.clicked}>
        <div></div>
        <div></div>
        <div></div>
    </div>
);

export default toogleIcon;