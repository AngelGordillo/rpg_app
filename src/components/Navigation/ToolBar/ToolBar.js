import React from 'react';


import Logo from '../../Logo/Logo';
import classes from './toolBar.module.css';
import NavigationItems from '../NavigationItems/NavigationItems';
const toolBar = () => (
    <header className={classes.Toolbar}>
        <div className={classes.Logo}>
            <Logo />
        </div>
        <nav>
        <NavigationItems></NavigationItems>
        </nav>
    </header>
)

export default toolBar;