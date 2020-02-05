import React from 'react';
import './App.css';
import NavBar from "./Navbar/NavBar.js";
import MainPage from "./News/MainPage.js";
import Login from "./Navbar/Login.js";
import Signup from "./Navbar/Signup.js"
import { Route, Switch, withRouter } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Route path="/" component={NavBar} />
      <Switch>
        <Route path="/" exact component={MainPage} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
      </Switch>
    </div>
  );
}

export default withRouter(App);
