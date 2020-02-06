import React from 'react';
import {connect} from 'react-redux';
import SourceDiv from './SourceDiv.js'

const MainPage = (props) => {
  let sourceCSSdark = "SourceDivDark"
  let sourceCSSlight = "SourceDivLight"

  return (
    <div className="MainPage">
      <p> New York Time</p>
      <SourceDiv srcName="NYTimes" news={props.NYTimes}/>
      <p> Twitter (Maybe)</p>
      <SourceDiv srcName="Twitter"/>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    NYTimes: state.NYTimesContent
  }
}

export default connect(mapStateToProps)(MainPage);
