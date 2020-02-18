import React, {useState} from 'react';
import {connect} from 'react-redux';
import {nextNYTimesContent, resetNYTimesContent} from '../Redux/actions.js';
import SourceDiv from './SourceDiv.js';
import Footer from "../footer.js";
import {NYTimes_API_KEY} from "../api_key.js";

const MainPage = (props) => {
  let [mainPageState, setMainPageState] = useState({
    allowNYTimesFetch: true,
  })

  //********** Helper Functions **********


  //********** Event Handlers **********
  let handleClickGetMoreNews = (source) => {
    switch(source) {
      case "NYTimes":
        const searchValue = props.currentInterest;
        let pageNumber = props.NYTimesPageCount;

        // Not allowed to fetch if in middle of loading
        if (mainPageState.allowNYTimesFetch && props.afterDefaultFetch) {
          //Disallow you to Click to get more data 
          setMainPageState({
            ...mainPageState,
            allowNYTimesFetch: false,
          })

          fetch(`https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchValue}&page=${pageNumber}&api-key=${NYTimes_API_KEY}`)
          .then(r => r.json())
          .then(respond => {
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

            //Got the data, putting it in dispatcher
            props.nextNYTimesContent(articleFormatted);
            //Allowing you to Click to get more data
            setMainPageState({
              ...mainPageState,
              allowNYTimesFetch: true,
            })
          })
        }else {
          console.log("Not allow to fetch")
        }
        return null;
      default:
        console.log("No subject")
    }
  }

  //********** JSX Return **********
  return (
    <div className="MainPage">
      <div className="divTitle">
        <h1 className="divTitleText"> New York Times </h1>
        <p className={`getMoreButton ${props.afterDefaultFetch ? mainPageState.allowNYTimesFetch ? null : "loadingButton" : "loadingButton"}`}
          onClick={() => handleClickGetMoreNews("NYTimes")}> 
          {props.afterDefaultFetch ? mainPageState.allowNYTimesFetch ? "Get More" : "Loading" : "Loading"}
        </p>
      </div>
      <SourceDiv srcName="NYTimes" news={props.NYTimes} theme="dark"/>
      <h1 className="divTitle">  Twitter (Future DLC)</h1>
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
    afterDefaultFetch: state.afterDefaultFetch,
  }
}

const mapDispatchToProps = dispatch => {
  const gettingMoreNYTimesData = (articles) => {
    dispatch(nextNYTimesContent(articles))
  }
  const settingNYTimesData = (articles, interest) => {
    dispatch(resetNYTimesContent(articles, interest))
  }

  return {
    nextNYTimesContent: gettingMoreNYTimesData,
    resetNYTimesContent: settingNYTimesData,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);
