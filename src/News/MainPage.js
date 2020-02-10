import React from 'react';
import {connect} from 'react-redux';
import {nextNYTimesContent} from '../Redux/actions.js';
import SourceDiv from './SourceDiv.js'
import Footer from "../footer.js";

import {NYTimes_API_KEY} from "../api_key.js"

const MainPage = (props) => {
  let handleClickGetMoreNews = (source) => {
    switch(source) {
      case "NYTimes":
        const searchValue = props.currentInterest;;
        let pageNumber = props.NYTimesPageCount;
        fetch(`https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchValue}&page=${pageNumber}&api-key=${NYTimes_API_KEY}`)
        .then(r => r.json())
        .then(respond => {
          console.log(respond)
          let articleFormatted = respond.response.docs.map((article) => {
            const title = article.headline.main;
            const author = article.byline.original;
            const url = article.web_url;
            const content = article.abstract;
            const publishDate = article.pub_date;

            return {
              title: title,
              author: author,
              url: url,
              content: content,
              publishDate: publishDate,
            };
          })

          props.nextNYTimesContent(articleFormatted);
        })
        return null;
      default:
        console.log("No subject")
    }
  }

  return (
    <div className="MainPage">
      <div className="divTitle">
        <h1> New York Time </h1>
        <p className="" onClick={() => handleClickGetMoreNews("NYTimes")}> Get More </p>
      </div>
      <SourceDiv srcName="NYTimes" news={props.NYTimes} theme="dark"/>
      <h1 className="divTitle">  Twitter (Maybe)</h1>
      <SourceDiv srcName="Twitter" news={props.Twitter} theme="dark"/>
      <Footer />
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    NYTimes: state.NYTimesContent,
    NYTimesPageCount: state.NYTimesPageCount,
    currentInterest: state.currentInterest,
    Twitter: state.twitterContent,
  }
}

const mapDispatchToProps = dispatch => {
  const gettingMoreNYTimesData = (articles) => {
    dispatch(nextNYTimesContent(articles))
  }

  return {
    nextNYTimesContent: gettingMoreNYTimesData,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);
