import React, { Component } from 'react';
import ReactLoading from 'react-loading';

const styles = {
  Outer:{
    height: '30px',
    width: '100%',
    backgroundColor: "#1DA1F2",
    borderRadius: '5 5 0 0',
    justifyContent:'center',
    alignItems:'center'
  }
}
//var tweetObjects = getTweetsFromUser("realDonaldTrump").map((tweetObject) => createTweetDisplayObject(tweetObject));

class SearchBar extends Component {
  render() {
    return (
      <div style={styles.Outer}>
        </div>
    );
  }
}

export default SearchBar;
