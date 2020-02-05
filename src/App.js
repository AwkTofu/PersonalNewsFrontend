import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {setUserToken} from './Redux/actions.js';
import './App.css';
import NavBar from "./Navbar/NavBar.js";
import MainPage from "./News/MainPage.js";
import Login from "./Navbar/Login.js";
import Signup from "./Navbar/Signup.js"
import { Route, Switch, withRouter } from 'react-router-dom';

function App(props) {
  useEffect(() => {
    let token = localStorage.getItem("token")
    console.log("token from local storage: ", token, props.login)
    if (token && !props.login)
    {    //If we are already logged in, no need to do another fetch
        fetch('http://localhost:3000/tokenlogin', {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({token: token})
      })
      .then(r => r.json())
      .then(respond => {
        props.setUserToken(respond.user, token)

      })
    }

    
  })

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

const mapStateToProps = (state) => {
  return {
    login: state.login
  }
}

const mapDispatchToProps = dispatch => {
  const settingUser = (user, token) => {
    dispatch(setUserToken(user, token));
  }
  return {
    setUserToken: settingUser
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(App));
