import React, { Component } from 'react';
import TwitterWindow from './TwitterWindow.js'
import Playground from './Playground.js'
import {createTweetDisplayObject} from './helpers/loadTweetObject';
import {getTweetsFromUser} from './apis/twitterApiCalls';
import {getTweetReplies} from './apis/twitterApiCalls';

const styles = {
  GraphBackground:{
    backgroundColor: '#657786',
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
  myRef = React.createRef()
  async collectTweetReplies (screenName,idString,numberOfRequests,cursor = null) {
  try {
    if ((numberOfRequests) === 0){
      return []
    } else{
      let requestReplies =  await getTweetReplies(screenName,idString,cursor)
      let recursiveReplies = await this.collectTweetReplies(screenName,idString,numberOfRequests-1,requestReplies[requestReplies.length - 1].id_str)
      let totalReplies = requestReplies.concat(requestReplies,recursiveReplies)
      return totalReplies

    }

  } catch (error) {
    console.error(error)
  }
}
  loadTweetReplies(name,idString,numberOfRequests=10,focusedId){
    this.collectTweetReplies(name,idString,numberOfRequests)
    .then((newTweetReplies)=> {
      this.setState({
        focusedTweet: focusedId,
        focusedTweetReplies:newTweetReplies
      })
    })
  }
  focus = (id) => {
    this.loadTweetReplies(this.state.screenName,this.state.tweetObjects[id].id_str,1,id)//necessary to load grapg
  }
  onFocusSearchBar = (id) => {
    this.setState({
      focusedTweet: null
    })
  }
  onSelectSearchBar = (value) => {
    window.scrollTo(0, this.myRef.offsetTop)
    this.getTweetObjects(value)
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
  getTweetObjects(screenName){
    getTweetsFromUser(screenName,null)
    .then((tweetObjs)=> {
      var newTweetObjects = tweetObjs.map((tweetObject) => createTweetDisplayObject(tweetObject));
      var lastTweetId = newTweetObjects[newTweetObjects.length-1].id_str
      this.setState({
        screenName: screenName,
        tweetObjects: newTweetObjects,
        cursor:lastTweetId,
        isLoading: false,
        focusedTweetReplies: []
      })
    })
    .catch((error) => {
      console.log(error)
    })
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
          hasMore: true
        })

    })
    .catch((error) => {
      console.log(error)
    })
  }

  componentDidMount () {
    this.getTweetObjects(this.state.screenName)
  }

  render() {
    return (
      <div style={styles.GraphBackground}>
      <Playground/>
      <TwitterWindow
      scrollRef = {this.myRef}
      tweetObjects={this.state.tweetObjects}
      handleScroll={this.handleScroll}
      isLoading={this.state.isLoading}
      focus = {this.focus}
      onFocusSearchBar = {this.onFocusSearchBar}
      onSelectSearchBar= {this.onSelectSearchBar}
      focusedTweet={this.state.focusedTweet}/>
      </div>
    );
  }
}

export default GraphComponent;
