import React from 'react';
import {connect} from 'react-redux';

const NavBar = (props) => {
  console.log(props.fakeData)
  return (
    <div className="NavBar">
      <p> Testing Nav Bar </p>
    </div>
  );
}

const mapStateToProps = (state) => {
  console.log("mapStateToProps", state)
  return {
    fakeData: state.fakeTwitterInfo
  }
}

export default connect(mapStateToProps)(NavBar);
