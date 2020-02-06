import React from 'react';
import NewsDiv from './NewsDiv.js';

const CreateNewsDivs = (allNews, tempTitle = "N/A") => {
	if (allNews)
	{
		//console.log(`${tempTitle}: `, allNews)
		return allNews.map((news) => {
			return <NewsDiv key={news.title} news={news}/>
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
    <div className={`${props.srcName} SourceDivDark`}>
    	<div className="SourceDivDarkInner">
      		{CreateNewsDivs(props.news, props.srcName)}
      	</div>
    </div>
  );
}


export default SourceDiv;
