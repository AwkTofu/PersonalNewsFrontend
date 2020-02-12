import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {setUserToken, resetNYTimesContent} from './Redux/actions.js';
import './App.css';
import NavBar from "./Navbar/NavBar.js";
import MainPage from "./News/MainPage.js";
import ProfilePage from './Profile/ProfilePage.js'
import Login from "./Navbar/Login.js";
import Signup from "./Navbar/Signup.js"
import { Route, Switch, withRouter } from 'react-router-dom';

import {NYTimes_API_KEY} from "./api_key.js"

function App(props) {

  //Functions used to pre render details on the screen
  const getTokenFromLocalStorage = () => {
    let token = localStorage.getItem("token")
    //console.log("token from local storage: ", token, props.login)
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
          props.setUserToken(respond.user, token, respond.interest)
          
          //If user have an interest, set the loading interest to that first one
          let interest = props.currentInterest
          if (respond.interest[0]) {
            interest = respond.interest[0].interest
          }
          //Load the Default News After getting the user information
          loadDefaultNewsInfo(interest);
        })
    } else {
      //Load default news after everything is over

      loadDefaultNewsInfo(props.currentInterest);
    }
  }

  const loadDefaultNewsInfo = (interest) => {
    const defaultSearchValue = interest;
    let pageNumber = props.NYTimesPageCount;

    fetch(`https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${defaultSearchValue}&page=${0}&api-key=${NYTimes_API_KEY}`)
    .then(r => r.json())
    .then(respond => {
      //console.log(respond.response.docs);
      let articleFormatted = respond.response.docs.map((article) => {
        const title = article.headline.main;
        const author = article.byline.original;
        const url = article.web_url;
        const content = article.abstract;
        const publishDate = article.pub_date;

        return {
          title: title,
          author: author,
          url: url,
          content: content,
          publishDate: publishDate,
        };
      })
      //console.log("Formated", articleFormatted)
      props.resetNYTimesContent(articleFormatted, interest);
    })
  }

  //Useeffect is called everytime it's loaded.
  useEffect(() => {
    getTokenFromLocalStorage();
  }, []) 

  //If the user login/logout, the default information should reset
  if (props.changeDefaultDiv)
  {
    console.log("Changed default Div", props.currentInterest)
    loadDefaultNewsInfo(props.currentInterest);
  }

  console.log("Main Menu INterest", props.currentInterest, props.NYTimesPageCount)
  //useEffect(()=>{},[]) If passing a second argument (array), 
  //React will run the callback after the first render and 
  //every time one of the elements in the array is changed. 
  //for example when placing useEffect(() => console.log('hello'), [someVar, someOtherVar]) - the callback will run after the first render and after any render that one of someVar or someOtherVar are changed.
  return (
    <div className="App">
      <Route path="/" render={(props) => <NavBar changeDefaultDiv={loadDefaultNewsInfo} history={props.history}/>} />
      <Switch>
        <Route path="/" exact component={MainPage} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/profile" component={ProfilePage} />
      </Switch>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    login: state.login,
    NYTimePageCount: state.NYTimesPageCount,
    NYTimesPageCount: state.NYTimesPageCount,
    currentInterest: state.currentInterest,
    interests: state.interests,
    changeDefaultDiv: state.changeDefaultDiv,
  }
}

const mapDispatchToProps = dispatch => {
  const settingUser = (user, token, interest) => {
    dispatch(setUserToken(user, token, interest));
  }
  const settingNYTimesData = (articles, interest) => {
    dispatch(resetNYTimesContent(articles, interest))
  }
  return {
    setUserToken: settingUser,
    resetNYTimesContent: settingNYTimesData,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(App));
