import React from 'react';

const NewsDiv = (props) => {
  return (
    <div className="NewsDiv ">
      <h1 className="Title"> {props.news.title} </h1>
      <p className="Author right"> {`${props.news.author}`} </p>
      <p className="Content"> {props.news.content}</p>
    </div>
  );
}


export default NewsDiv;
