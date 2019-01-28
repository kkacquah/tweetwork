import React, { Component } from 'react';
import {GenericScrollBox} from 'react-scroll-box'; // ES6
import Tweet from './Tweet';
import ReactLoading from 'react-loading';

const styles = {
  twitterWindow:{
    marginLeft: '20px',
    minHeight: '500px',
    height: '90%',
    width: '200px',
    position:'absolute',
    backgroundColor: 'White',
    flexDirection: 'row',
    overflow:'scroll',
    position: 'fixed',
    borderRadius:5,
    justifyContent:'center',
    top:"5%"
  },
  loadingStyle:{
    margin:5,
    width:'20%',
    position: 'absolute',
    left:'40%',
    fill:"#E1E8ED"
  }
}
//var tweetObjects = getTweetsFromUser("realDonaldTrump").map((tweetObject) => createTweetDisplayObject(tweetObject));

class TwitterWindow extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div style={styles.twitterWindow} onScroll= {this.handleScroll}>
          {this.props.tweetObjects.map((value,i) => <Tweet focusedTweet={this.props.focusedTweet} id={i} onMouseEnter={this.props.focus} tweetObject = {value}/>)}

          { this.props.isLoading ?
            <div style={{height:50}}>
          <ReactLoading style={styles.loadingStyle} type={"spin"} color={"#E1E8ED"} />
          </div>
           : null}

        </div>
    );
  }
}

export default TwitterWindow;
