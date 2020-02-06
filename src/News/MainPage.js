import React from 'react';
import {connect} from 'react-redux';
import SourceDiv from './SourceDiv.js'
import Footer from "../footer.js";

const MainPage = (props) => {
  return (
    <div className="MainPage">
      <h1 className="divTitle"> New York Time</h1>
      <SourceDiv srcName="NYTimes" news={props.NYTimes} theme="dark"/>
      <h1 className="divTitle">  Twitter (Maybe)</h1>
      <SourceDiv srcName="Twitter" news={props.NYTimes} theme="dark"/>
      <Footer />
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    NYTimes: state.NYTimesContent
  }
}

export default connect(mapStateToProps)(MainPage);
