import React from 'react';
import './App.css';
import NavBar from "./Navbar/NavBar.js";
import MainPage from "./News/MainPage.js";
import { Route, Switch, withRouter } from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <NavBar />
      <MainPage />
    </div>
  );
}

export default withRouter(App);
