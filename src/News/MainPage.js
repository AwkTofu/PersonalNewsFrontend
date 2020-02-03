import React from 'react';
import {connect} from 'react-redux';
import SourceDiv from './SourceDiv.js'

const MainPage = (props) => {
  return (
    <div className="MainPage">
      <p> New York Time</p>
      <SourceDiv srcName="NYTimes" news={props.fakeData}/>
      <p> Twitter (Maybe)</p>
      <SourceDiv srcName="Twitter"/>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    fakeData: state.fakeTwitterInfo
  }
}

export default connect(mapStateToProps)(MainPage);
