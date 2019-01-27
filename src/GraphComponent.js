import React, { Component } from 'react';
import TwitterWindow from './TwitterWindow.js'
import Playground from './Playground.js'
import {createTweetDisplayObject} from './helpers/loadTweetObject';
import {getTweetsFromUser} from './apis/twitterApiCalls';

const styles = {
  GraphBackground:{
    backgroundColor: '#E1E8ED',
    width:'100%',
    height:'100%',
    position:'absolute'
  }
}
class GraphComponent extends Component {
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

  render() {
    return (
      <div style={styles.GraphBackground}>

        <Playground
        tweetObject={this.state.tweetObjects[this.state.focusedTweet]}
        />
        <TwitterWindow
          tweetObjects={this.state.tweetObjects}
          handleScroll={this.handleScroll}
          isLoading={this.state.isLoading}
          focus = {this.focus}/>
      </div>
    );
  }
}

export default GraphComponent;
