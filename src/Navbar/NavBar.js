import React from 'react';
import {logout} from '../Redux/actions.js';
import {connect} from 'react-redux';

//************** Event Handlers **************
let handleClickLogout = (props) => {
	props.logout()
	console.log("user logged out")
}

let handleLoginClick = (history) => {
	history.push("/signup")
}

let handleHomeClick = (history) => {
	history.push("/")
}

//************** Helper Functions **************
let showProfile = (props) => {
	return (
		<div className="Profile">
			Welcome, {props.user.name}
			<p className="logout" onClick={() => handleClickLogout(props)}> logout </p>
		</div>
	)
}

let login_signup = (props) => {
	return (
		<div className="login right" onClick={() => handleLoginClick(props.history)}>
			Click here to login/signup
		</div>
	)
}

const NavBar = (props) => {
	console.log("User:", props.user)
  return (
    <div className="NavBar">
      <p onClick={() => handleHomeClick(props.history)}> Testing Nav Bar </p>
      {props.user 
      	? showProfile(props)
      	: login_signup(props)}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    user: state.user
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
