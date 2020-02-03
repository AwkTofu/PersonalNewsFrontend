import React from 'react';
import {connect} from 'react-redux';
import NewsDiv from './NewsDiv.js';

const SourceDiv = (props) => {
	let amtOfNews = 7;
  return (
    <div className={`${props.srcName} SourceDiv`}>
      <NewsDiv />
      <NewsDiv />
      <NewsDiv />
      <NewsDiv />
      <NewsDiv />
      <NewsDiv />
      <NewsDiv />
    </div>
  );
}


export default SourceDiv;
