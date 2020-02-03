import React from 'react';
import {connect} from 'react-redux';
import SourceDiv from './SourceDiv.js'

const MainPage = (props) => {
  console.log(props.fakeData)
  return (
    <div className="MainPage">
      <p> New York Time</p>
      <SourceDiv srcName="NYTimes"/>
      <p> Twitter (Maybe)</p>
      <SourceDiv srcName="NYTimes"/>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    fakeData: state.fakeTwitterInfo
  }
}

export default connect(mapStateToProps)(MainPage);
