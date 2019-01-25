import React, { Component } from 'react';
import {GenericScrollBox} from 'react-scroll-box'; // ES6
import {createCachedTweetObject} from './helpers/loadTweetObject';
import {exampleTweets} from './apis/exampleTweets';

const styles = {
  twitterWindow:{
    marginTop: '20px',
    marginLeft: '20px',
    minHeight: '500px',
    height: '90%',
    width: '200px',
    position:'absolute',
    backgroundColor: 'White'
  }
}
const tweetObjects = ["I love the Titanic","I hate the Titanic"];
const listItems = exampleTweets.map((tweetObject) =>
  <li>{createCachedTweetObject(tweetObject).text}</li>
);
class TwitterWindow extends Component {
  render() {
    return (
      <GenericScrollBox style={styles.twitterWindow} disableScrollX>
        <div className="scroll-box__viewport">
          {listItems}
        </div>
      </GenericScrollBox>
    );
  }
}

export default TwitterWindow;
