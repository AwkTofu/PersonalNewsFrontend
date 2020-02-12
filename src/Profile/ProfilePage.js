import React, {useState} from 'react';
import "../CSS/profile.css";
import {addInterest, deleteInterest} from '../Redux/actions.js';
import {connect} from 'react-redux';

//Interest Create, Post to /interest
//Interest Delete, DELEte to /interest/:id

const ProfilePage = (props) => {
	let [profileState, setProfileState] = useState({
		newInterest: "",
		allowAddInterest: true, 
	})

	//********** Event Listeners **********
	const createInterest = () => {
		const interest = profileState.newInterest;
		if(profileState.allowAddInterest && interest.length > 0)
		{
			//Not allowing user to add anymore while data is sending
			setProfileState({
				...profileState,
				allowAddInterest: false,
			})
			
			//Sending interest to backend
			fetch('http://localhost:3000/interests', {
	          method: 'POST',
	          mode: 'cors',
	          headers: {
	            'Content-Type': 'application/json'
	          },
	          body: JSON.stringify({
	          	user_id: props.user.id,
	          	interest: interest,
	          })
	        })
	        .then(r => r.json())
	        .then(respond => {
	        	props.addInterest(respond.interest)

	        	//Reallowing user to add new interest, and set text box to blank
	        	setProfileState({
					...profileState,
					newInterest: "",
					allowAddInterest: true,
				})
	        })
		}
	}

	const deleteInterest = (interest) => {
		fetch(`http://localhost:3000/interests/${interest.id}`, {
			method: 'DELETE'
		})
		.then(r => r.json())
		.then(respond => {
			props.deleteInterest(respond.interest.id)
		})
	}

	const handleChange = (event) => {
		setProfileState({
			...profileState,
			[event.target.name]: event.target.value,
		})
	}


	//Creating list of Interest
	const showInterest = () => {
		if (props.interests.length < 1) {
			return (<div className="NoInterest"> There isn't any interest, you should add some </div>)
		}
		return props.interests.map((interest) => {
			return (
				<div key={interest.id} className="Interest"> 
					{interest.interest}
					<button onClick={() => deleteInterest(interest)}> Delete </button>
				</div>
			)
		})
	}

	//If your not logged in, go back to home page
	if(!props.login){
		props.history.push("/")
	}

	//********** JSX Return **********
  return (
    <div className="ProfilePage">
    	<h1> Show Profile here </h1>
    	<div className="newInterest">
    		<input type="text"
      		placeholder="New Interest"
      		className="new_interest_input"
      		name="newInterest"
      		onChange={handleChange}
      		value={profileState.newInterest} />

    		<button type="button"
    			className={`add_interest_button ${profileState.allowAddInterest? null : "disable_interest_button"}`}
    			onClick={createInterest}> 
    			Add
    		</button>
    	</div>
    	<div className="InterestList">
    		{showInterest()}
    	</div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    currentInterest: state.currentInterest,
    interests: state.interests,
    user: state.user,
    login: state.login,
  }
}

const mapDispatchToProps = dispatch => {
  const AddingMoreInterest = (interest) => {
    dispatch(addInterest(interest))
  }
  const DeleteSelectedInterest = (interest_id) => {
  	console.log("Dispatch,", interest_id)
  	dispatch(deleteInterest(interest_id))
  }

  return {
    addInterest: AddingMoreInterest,
    deleteInterest: DeleteSelectedInterest,
  }
}



export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);
