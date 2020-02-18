import React, {useState} from 'react';
import { connect } from 'react-redux';
import {SearchInterest} from '../Redux/actions.js';

const SearchBar = (props) => {
    let[searchBarState, setSearchBarState] = useState({
        searchbar: "",
    })

    return (
        <div className="SearchBar">
            <p>For future,  Search bar Here </p>
        </div>
    )
}
  
const mapDispatchToProps = dispatch => {
    const searchInterest = (interest) => {
        dispatch(SearchInterest(interest))
    }
  
    return {
      searchInterest: searchInterest,
    }
}

export default connect(null, mapDispatchToProps)(SearchBar);