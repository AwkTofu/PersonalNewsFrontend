import React from 'react';
import NewsDiv from './NewsDiv.js';

const CreateNewsDivs = (allNews, tempTitle = "N/A", theme) => {
	if (allNews)
	{
		//console.log(`${tempTitle}: `, allNews)
		return allNews.map((news) => {
			return <NewsDiv key={news.publishDate} news={news} theme={`${theme}Div`}/>
		})
	}
	else
	{ //Nothing to render
		//console.log("Nothing to render", tempTitle);
		return (<div className="Error" style={{height: "20vh"}}>{`Nothing to render for ${tempTitle}`}</div>)
	}

}

const SourceDiv = (props) => {
  return (
    <div className={`${props.srcName} SourceDiv ${props.theme}`}>
    	<div className="SourceDivInner">
      		{CreateNewsDivs(props.news, props.srcName, props.theme)}
      	</div>
    </div>
  );
}


export default SourceDiv;
