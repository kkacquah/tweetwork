import React, { Component } from 'react';
import TwitterWindow from './TwitterWindow.js'
import Playground from './Playground.js'
import {createTweetDisplayObject} from './helpers/loadTweetObject';
import {getTweetsFromUser} from './apis/twitterApiCalls';
import {getTweetReplies} from './apis/twitterApiCalls';

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
      screenName:"CNN",
      focusedTweet: 0,
      focusedTweetReplies: [],
      tweetObjects: [],
      hasMore: true,
      isLoading: false,
      cursor: null
    }
  }
  async collectTweetReplies (screenName,idString,numberOfRequests,cursor = null) {
  try {
    if ((numberOfRequests) == 0){
      return []
    } else{
      let requestReplies =  await getTweetReplies(screenName,idString,cursor)
      let recursiveReplies = await this.collectTweetReplies(screenName,idString,numberOfRequests-1,requestReplies[requestReplies.length - 1].id_str)
      let totalReplies = requestReplies.concat(recursiveReplies)
      return totalReplies

    }

  } catch (error) {
    console.error(error)
  }
}
  loadTweetReplies(name,idString,numberOfRequests=10){
    var newTweetReplies = [];
    this.collectTweetReplies(name,idString,numberOfRequests)
    .then((newTweetReplies)=> {
      let newTweetObjects = newTweetReplies.map((newTweetReply) => createTweetDisplayObject(newTweetReply))
      this.setState({
        focusedTweetReplies: newTweetObjects
      })
    })
  }
  focus = (id) => {
    this.setState({
      focusedTweet: id
    })
    this.loadTweetReplies(this.state.screenName,this.state.tweetObjects[id].id_str,10)//necessary to load grapg
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
    getTweetsFromUser(this.state.screenName,this.state.cursor)
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
      tweetReplies={this.state.focusedTweetReplies}
      />
      <TwitterWindow
      tweetObjects={this.state.tweetObjects}
      handleScroll={this.handleScroll}
      isLoading={this.state.isLoading}
      focus = {this.focus}
      focusedTweet={this.state.focusedTweet}/>
      </div>
    );
  }
}

export default GraphComponent;
