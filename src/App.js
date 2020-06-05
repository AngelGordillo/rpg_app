import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';


import Layout from './hoc/Layout/Layout';
import RolBuilder from './containers/RolBuilder/RolBuilder';
import PjGenerator from './containers/PjGenerator/PjGenerator';
import MonsterGenerator from './containers/MonsterGenerator/MonsterGenerator';
import MonsterDisplay from './containers/MonsterDisplay/MonsterDisplay';
import PjDisplay from './containers/PjDisplay/PjDisplay';
import Battlefield from './containers/Battlefield/Battlefield';
import './App.css';

class App extends Component {
  render() {
    let routes = (
    <Switch>
      <Route path='/' exact component={RolBuilder} />
      <Route path='/pjForm' component={PjGenerator} />
      <Route path='/monsterForm' component={MonsterGenerator} />
      <Route path='/pjs' component={PjDisplay} />
      <Route path='/monsters' component={MonsterDisplay} />
      <Route path='/battlefield' component={Battlefield} />
      <Redirect to='/' />
    </Switch>)
    return (
      <div>
        <Layout>
          {routes}
        </Layout>
      </div>
    )
  }
}

export default App;
