import React, { Component } from 'react'
import {Switch,Route,Redirect} from 'react-router-dom'

import Admin from './containers/Admin/Admin'
import Login from './containers/Login/Login'

export default class App extends Component {
  render() {
    return (
      <Switch>
        <Route path="/login" component={Login}/>
        <Route path="/admin" component={Admin}/>
        <Redirect to="login"/>
      </Switch>
    )
  }
}
