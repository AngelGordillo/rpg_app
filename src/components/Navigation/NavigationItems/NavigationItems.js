import React from 'react';
import classes from './NavigationItems.module.css';
import NavigationItem from '../NavigationItems/NavigationItem/NavigationItem';
const navigationItems = (props) => (
  <ul className={classes.NavigationItems}>
    <NavigationItem link='/'>Home</NavigationItem>
    <NavigationItem link='/pjForm'>Add Inventigator</NavigationItem>
    <NavigationItem link='/monsterForm'>Add Monster</NavigationItem>
    <NavigationItem link='/pjs'>See Investigator</NavigationItem>
    <NavigationItem link='/monsters'>See Monster</NavigationItem>
    <NavigationItem link='/battlefield'>Battlefield</NavigationItem>
  </ul>
);

export default navigationItems;