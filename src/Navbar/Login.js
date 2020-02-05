import React, {useState} from 'react';
import {connect} from 'react-redux';
import {setUserToken} from '../Redux/actions.js';
import "../CSS/login.css";

const Login = (props) => {

	let [loginData, setLoginData] = useState({
		username: "",
		password: "",
		password_show: false,
	})

	//********** Event Handlers **********
	let handleChange = (event) => {
		setLoginData({
			...loginData,
			[event.target.name]: event.target.value,
		})
	}

	let handlePasswordShow = () => {
		setLoginData({
			...loginData,
			password_show: !loginData.password_show
		})
	}

	let handleSubmitClick = () => {
		fetch('http://localhost:3000/login', {
			method:'POST',
			mode: 'cors',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(loginData)
		})
		.then(r => r.json())
		.then(respond => {
			console.log(respond);
			if (respond.user)
			{
				props.setUserToken(respond.user, respond.token)
				localStorage.setItem('token', respond.token)
				props.history.push("/")
			}
			else
			{
				console.log("User DNE");
			}
		})
	}

	let handleSignupClick = () => {
		props.history.push("/signup")
	}

	//********** JSX Return **********
  return (
    <form className="login_form">
      <p className="title"> Login Sheet </p>
      <p className="signup_link"
      	onClick={handleSignupClick}>
      	New here? Click to signup
      </p>
      <div className="login_div">
      	<input type="text"
      		placeholder="Username"
      		className="login_input"
      		name="username"
      		onChange={handleChange}
      		value={loginData.username} />
      </div>

      <div className="login_div">
      	<input type={loginData.password_show ? "text" : "password"} 
      		placeholder="Password"
      		className="password_input login_input"
      		name="password"
      		onChange={handleChange}
      		value={loginData.password} />
      	<img src="/logo512.png" alt="showpass_icon" className="showpass_icon right" onClick={handlePasswordShow}/>
      </div>

      <button type="button"
      		onClick={handleSubmitClick}
      		className="login_input login_submit">
      		Login 
      </button>
    </form>
  );
}

const mapStateToProps = (state) => {
	return {
		user: state.user
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


export default connect(mapStateToProps, mapDispatchToProps)(Login);
