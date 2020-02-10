import React from 'react';

const NewsDiv = (props) => {
	let handleClick = () => {
		if (props.news.url)
			window.open(props.news.url, "_blank")
		else
			console.log("No URL in this Article")
  	}
  return (
    <div className={`NewsDiv ${props.theme}`} onClick={handleClick}>
      <h1 className="Title"> {props.news.title} </h1>
      <p className="Author right"> {`${props.news.author}`} </p>
      <p className="Content"> {props.news.content}</p>
    </div>
  );
}


export default NewsDiv;
