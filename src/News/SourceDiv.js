import React from 'react';
import {connect} from 'react-redux';
import NewsDiv from './NewsDiv.js';

const SourceDiv = (props) => {
  return (
    <div className={`${props.srcName} SourceDiv`}>
      <p> Testing Source Div for {props.srcName}</p>

      <NewsDiv />
      <NewsDiv />
    </div>
  );
}


export default SourceDiv;
