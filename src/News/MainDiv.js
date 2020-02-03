import React from 'react';
import {connect} from 'react-redux';

const MainDiv = (props) => {
  return (
    <div className={`${props.srcName} MainDiv`}>
      <p> Testing Main Div for {props.srcName}</p>
    </div>
  );
}


export default MainDiv;
