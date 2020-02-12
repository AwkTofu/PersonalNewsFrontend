import React from 'react';
import {logout} from '../Redux/actions.js';
import {connect} from 'react-redux';

//************** Event Handlers **************
let handleClickLogout = (props) => {
	props.logout()
	localStorage.removeItem("token");
	console.log("user logged out")
}

let handleChangePageClilck = (history, url) => {
	history.push(url)
}

let handleHomeClick = (history) => {
	history.push("/")
}

let changeCurrentInterest = (props, newInterest) => {
	props.changeDefaultDiv(newInterest);
}

//************** Helper Functions **************
let showProfile = (props) => {
	return (
		<div className="profile">
			Welcome, 
			<span className="user_name" onClick={() => handleChangePageClilck(props.history, "profile")}>
				{" " + props.user.name} 
			</span>
			<h4 className="logout" onClick={() => handleClickLogout(props)}> logout </h4>
		</div>
	)
}

let login_signup = (props) => {
	return (
		<div className="login right" onClick={() => handleChangePageClilck(props.history, "login")}>
			SIGN IN
		</div>
	)
}

let dropdown_content_elements = (props) => {
	//If there is no interest, default is New York Times
	if(props.interests.length < 1) {
		return (<p className="dropdown-content-element cursor_pointer"> New York Times </p>)
	}

	return props.interests.map((interest) => {
		return (
			<p className="dropdown-content-element cursor_pointer" 
				key={`interest ${interest.id}`}
				onClick={() => changeCurrentInterest(props, interest.interest)}> 
				{interest.interest} 
			</p>
		)
	})
}


	//************** JSX Return **************
const NavBar = (props) => {
	console.log("User:", props.user, "interests:", props.currentInterest)
	//console.log("Token:", props.token)
  return (
    <div className="NavBar">
      <div className="home_button cursor_pointer" onClick={() => handleHomeClick(props.history)}> 
      	Personal News
      </div>
      <div className="dropdown">
	    <button className="dropbtn">
	    	{`${props.currentInterest} ⇩`}
	    </button>
	    <div className="dropdown-content">
	      {dropdown_content_elements(props)}
	    </div>
	  </div> 
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
    interests: state.interests,
    currentInterest: state.currentInterest,
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
