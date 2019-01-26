import React, { Component } from 'react';
import {GenericScrollBox} from 'react-scroll-box'; // ES6
import {createTweetDisplayObject} from './helpers/loadTweetObject';
import {exampleTweets} from './apis/exampleTweets';
import Tweet from './Tweet';
const styles = {
  twitterWindow:{
    marginTop: '20px',
    marginLeft: '20px',
    minHeight: '500px',
    height: '90%',
    width: '200px',
    position:'absolute',
    backgroundColor: 'White',
    flexDirection: 'row'
  },
  twitterCard:{
    backgroundColor: 'white',
    borderBottom: '1px solid #E1E8ED',
    flexDirection: 'column'
  }
}
var tweetObjects = exampleTweets.map((tweetObject) => createTweetDisplayObject(tweetObject));

class TwitterWindow extends Component {
  render() {
    return (
      <GenericScrollBox style={styles.twitterWindow} disableScrollX>
        <div className="scroll-box__viewport">
          {tweetObjects.map((tweetObj) => <Tweet tweetObject = {tweetObj}/>)}
        </div>
      </GenericScrollBox>
    );
  }
}

export default TwitterWindow;
