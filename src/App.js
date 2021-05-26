import React, { useState } from 'react';
import {BrowserRouter as Router,Route,Switch,  Redirect} from "react-router-dom";
import './App.css';
import {ForceRender} from './index.js'

import 'bootstrap/dist/css/bootstrap.min.css';
import folderList from './components/folderList.component';
import Error from './components/Error.component';
import addFolder from './components/addFolder.component';
import updateFolder from './components/updateFolder.component';

import ItemPage from './components/itemPage.component';
import addItem from './components/addItem.component';
import updateItem from './components/updateItem.component';

import Navbar from './components/Navbar.component';
import useToken from './components/useToken';
import userList from './components/UserComponent/userlist.component';

function App() {
const authGuard = (Component) => () => {
  
  return localStorage.getItem("token") ? (
    
    <Route component={Component} />
) : (
    ForceRender()
  );
};
  return (
    <div className="container">
        <Router>

          <Navbar/>
          <Route path="/folders/:id?" exact render={authGuard(folderList)}/>
          <Route path="/" exact render={authGuard(folderList)} />
          <Route path="/Error/"  exact component={Error}/>
          <Route  path="/addfolder" render={authGuard(addFolder)} />
          <Route  path="/updatefolder" render={authGuard(updateFolder)}  />
          <Route  path="/additem" render={authGuard(addItem)} />
          <Route  path="/updateitem" render={authGuard(updateItem)}/>
          <Route  path="/item" render={authGuard(ItemPage)} />
          <Route  path="/reset"  component={folderList}/>
          <Route path="/users" render={authGuard(userList)}/> 
        </Router>
    </div>
  );
}

export default App;
