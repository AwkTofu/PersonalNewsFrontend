import React, {useState} from 'react';
import {connect} from 'react-redux';
import {setUserToken} from '../Redux/actions.js';
import "../CSS/Signup.css"

const GetErrorsInForm = (formData, setFormData) => {
	//Vars used to check if there's missing or error in the fields
		let errors = {
			name: null,
			username: null,
			password: null,
		}
		let errorCheck = false;

		//Checking if there's missing fields
		//Checking Name
		if (formData.name.length <= 0)
		{
			errors = {
				...errors,
				name: "Please enter your name."
			}
			errorCheck = true;
		} //Checking Username
		if (formData.username.length <= 0)
		{
			errors = {
				...errors,
				username: "Please enter a username."
			}
			errorCheck = true;
		} //Checking Password
		if (formData.password.length < 8)
		{
			errors = {
				...errors,
				password: "Please enter a valid password with at least 8 characters."
			}
			errorCheck = true;
		}

		setFormData({
			...formData,
			errors: errors,
		})

		return errorCheck;
}

const Signup = (props) => {
	let [formData, setFormData] = useState({
		name: "",
		username: "",
		password: "",
		email: "",
		password_show: false,
		errors: {
			name: null,
			username: null,
			password: null,
		}
	})


	//********** Event Handlers **********
	let handleChange = (event) => {
		setFormData({
			...formData,
			[event.target.name]: event.target.value,
		})
	}

	let handlePasswordShow = () => {
		setFormData({
			...formData,
			password_show: !formData.password_show
		})
	}

	let handleSubmitClick = () => {
		//Vars used to check if there's missing or error in the fields
		let errorCheck = GetErrorsInForm(formData, setFormData);

		//If there's no error, then create the user in the database
		if (!errorCheck)
		{
			fetch('http://localhost:3000/users', {
				method:'POST',
				mode: 'cors',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(formData)
			})
			.then(r => r.json())
			.then(respond => {
				props.setUserToken(respond.user, respond.token)
				localStorage.setItem('token', respond.token)
				props.history.push("/")
			})
		}
	}

	let handleLoginClick = () => {
		props.history.push("/login")
	}

	//********** JSX Return **********
  return (
    <div className="Signup">
      <p className="title"> Signup Form </p>
      <p className="login_link"
      	onClick={handleLoginClick}>
      	Already registered? Click to login.
      </p>
      	<div className={`signup_div ${formData.errors.name ? "error_div" : ''}`}>
      		<input type="text" 
	      		placeholder="Name"
	      		className="Signupinputs"
	      		name="name" 
	      		onChange={handleChange} 
	      		value={formData.name}  />
      	</div>
      	{formData.errors.name ? (<p className="form_error">{formData.errors.name}</p>) : null}
      	
      	<div className="signup_div">
	      	<input type="text" 
	      		placeholder="Email"
	      		className="Signupinputs"
	      		name="email" 
	      		onChange={handleChange} 
	      		value={formData.email} />
	    </div>
      	
      	<div className={`signup_div ${formData.errors.username ? "error_div" : ''}`}>
	      	<input type="text" 
	      		placeholder="Username"
	      		className="Signupinputs"
	      		name="username" 
	      		onChange={handleChange} 
      			value={formData.username}  />
      	</div>
      	{formData.errors.username ? (<p className="form_error">{formData.errors.username}</p>) : null}

      	<div className={`signup_div password_field ${formData.errors.name ? "error_div" : ''}`}>
	      	<input type={formData.password_show ? "text" : "password"} 
	      		placeholder="Password"
	      		className="password_input Signupinputs"
	      		name="password" 
	      		onChange={handleChange} 
	      		value={formData.password} />
      		<img src="/logo512.png" className="showpass_icon right" alt="showpass_icon" onClick={handlePasswordShow}/>
      	</div>
      	{formData.errors.password ? (<p className="form_error">{formData.errors.password}</p>) : null}
      	
      	<button type="button"
      		onClick={handleSubmitClick}
      		className="Signupinputs signup_submit">
      		Create 
      	</button>
    </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
