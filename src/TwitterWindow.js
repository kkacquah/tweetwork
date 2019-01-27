import React, { Component } from 'react';
import {GenericScrollBox} from 'react-scroll-box'; // ES6
import {createTweetDisplayObject} from './helpers/loadTweetObject';
import {getTweetsFromUser} from './apis/twitterApiCalls';
import Tweet from './Tweet';
import ReactLoading from 'react-loading';

const styles = {
  twitterWindow:{
    marginTop: '20px',
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
    justifyContent:'center'
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
    this.state = {
      focusedTweet: 0,
      tweetObjects: [],
      hasMore: true,
      isLoading: false,
      cursor: null
    }
  }
  focus = (id) => {
    this.setState({
      focusedTweet: id
    })
  }
  handleScroll = (e) => {
    const bottom = e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
    if (bottom && this.state.hasMore) {
      this.setState({
        isLoading: true
      })
      this.loadTweetObjects()
    }

  }

  loadTweetObjects(){
    getTweetsFromUser("realDonaldTrump",this.state.cursor)
    .then((tweetObjs)=> {
      var newTweetObjects = tweetObjs.map((tweetObject) => createTweetDisplayObject(tweetObject));
      var lastTweetId = newTweetObjects[newTweetObjects.length-1].id_str
      this.setState({
          tweetObjects: this.state.tweetObjects.concat(newTweetObjects),
          cursor:lastTweetId,
          isLoading: false,
          hasMore: false
        })
    })
  }
  componentDidMount () {
    this.loadTweetObjects()
  }
  focus = (id) => {
    this.setState({
      focusedTweet: id
    })
  }
  render() {
    return (
      <div style={styles.twitterWindow} onScroll= {this.handleScroll}>
          {this.state.tweetObjects.map((value,i) => <Tweet focusedTweet = {this.state.focusedTweet} id={i} onMouseEnter={this.focus} tweetObject = {value}/>)}

          { this.state.isLoading ?
            <div style={{height:50}}>
          <ReactLoading style={styles.loadingStyle} type={"spin"} color={"#E1E8ED"} />
          </div>
           : null}

        </div>
    );
  }
}

export default TwitterWindow;
