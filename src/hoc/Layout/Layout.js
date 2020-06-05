import React, { Component } from 'react';

import Auxiliary from '../Auxiliary/Auxiliary';
import Toolbar from '../../components/Navigation/ToolBar/ToolBar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import classes from './Layout.module.css'


class Layout extends Component {
    state = {
        showSidedrawer: false
    };

    sideDrawerHandler = () => {
        this.setState({
            showSidedrawer: false
        })
    };

    toggleDrawerHandler = () => {
        this.setState({
            showSidedrawer: !this.state.showSidedrawer
        })
    };
    render() {
        return (
            <Auxiliary >
                <Toolbar
                    drawerClicked={this.toggleDrawerHandler} />
                <SideDrawer open={this.state.showSidedrawer} closed={this.sideDrawerHandler}
                />
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Auxiliary>);
    }
}



export default Layout;