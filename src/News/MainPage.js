import React from 'react';
import {connect} from 'react-redux';
import MainDiv from './MainDiv.js'

const MainPage = (props) => {
  console.log(props.fakeData)
  return (
    <div className="MainPage">
      <p> Testing Main Page</p>
      <MainDiv srcName="NYTimes"/>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    fakeData: state.fakeTwitterInfo
  }
}

export default connect(mapStateToProps)(MainPage);
