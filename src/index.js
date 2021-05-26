import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Login from './components/UserComponent/login.component';
import Register from './components/UserComponent/Register.component';
import {BrowserRouter  as Router, Route, Switch } from 'react-router-dom';
import UserGate from './components/UserComponent/usergate.component';


export function ForceRender(register)
{  

  window.location.href = "http://localhost:3000";

  
}
const token=localStorage.getItem("token");
ReactDOM.render(
  <React.StrictMode>
      {token?<App/>:<UserGate />}
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
