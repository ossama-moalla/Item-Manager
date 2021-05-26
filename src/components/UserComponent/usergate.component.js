import React, {Component, useState } from 'react';
import {BrowserRouter as Router,Route,Switch,  Redirect} from "react-router-dom";
import Login from './login.component';
import Register from './Register.component';

class UserGate extends Component {

render(){

    return (
    
        <div className="container">
      <Router>
      <Route path="/register" component={Register} />

        <Route path="/login" component={Login}/>
        <Route component={ Login } />

        </Router>
        </div>
      );
    
}
  }

export default UserGate;
