import React, { Component } from 'react';
import Tweet from './Tweet';

const styles = {
  window:{
    height: '500px',
    width: '250px',
    right: '5%',
    marginTop: '-250px',
    borderRadius:10,
    //to see how it looks with logos on top
    backgroundColor:' #F5F8FA',
    top:"50%",
    border:'1px solid #AAB8C2',
    position: 'fixed',
  }
}
//var tweetObjects = getTweetsFromUser("realDonaldTrump").map((tweetObject) => createTweetDisplayObject(tweetObject));

class DisplayTweet extends Component {
  constructor(props) {
        super(props)   // Create a ref object=
    }
  render() {
    console.log(this.props.displayedTweet)
    return (
        <div style={styles.window} >
        {this.props.displayedTweet ?
        <Tweet
        tweetObject = {this.props.displayedTweet}
        color='#F5F8FA'/> : null}
        </div>
    );
  }
}

export default DisplayTweet;
