import React from 'react';
import {logout} from '../Redux/actions.js';
import {connect} from 'react-redux';

//************** Event Handlers **************
let handleClickLogout = (props) => {
	props.logout()
	localStorage.removeItem("token");
	console.log("user logged out")
}

let handleLoginClick = (history) => {
	history.push("/login")
}

let handleHomeClick = (history) => {
	history.push("/")
}

//************** Helper Functions **************
let showProfile = (props) => {
	return (
		<div className="profile">
			Welcome, {props.user.name}
			<h4 className="logout" onClick={() => handleClickLogout(props)}> logout </h4>
		</div>
	)
}

let login_signup = (props) => {
	return (
		<div className="login right" onClick={() => handleLoginClick(props.history)}>
			SIGN IN
		</div>
	)
}

const NavBar = (props) => {
	console.log("User:", props.user)
	console.log("Token:", props.token)
  return (
    <div className="NavBar">
      <p className="home_button" onClick={() => handleHomeClick(props.history)}> Testing Nav Bar </p>
      {props.user 
      	? showProfile(props)
      	: login_signup(props)}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    token: state.token,
  }
}

const mapDispatchToProps = dispatch => {
	const loggingout = () => {
		dispatch(logout());
	}
	return {
		logout: loggingout
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
