import React, { Component } from 'react';
import TwitterWindow from './TwitterWindow.js'
import Playground from './Playground.js'
import {createTweetDisplayObject} from './helpers/loadTweetObject';
import {getTweetsFromUser} from './apis/twitterApiCalls';
import {getTweetReplies} from './apis/twitterApiCalls';

const styles = {
  GraphBackground:{
    backgroundColor: '#F5F8FA',
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
      cursor: null,
      isLoadingGraph:true
    }
  }
  loadTweetReplies(name,idString,numberOfRequests=10,focusedId){
     this.setState({
        isLoadingGraph:true
      })
    getTweetReplies(name,idString,numberOfRequests)
    .then((newTweetReplies)=> {
      this.setState({
        focusedTweet: focusedId,
        focusedTweetReplies:newTweetReplies,
        isLoadingGraph:false
      })
    })
  }
  focus = (id) => {
    this.loadTweetReplies(this.state.screenName,this.state.tweetObjects[id].id_str,30,id)//necessary to load grapg
  }
  onFocusSearchBar = (id) => {
    this.setState({
      focusedTweet: null
    })
  }
  onSelectSearchBar = (value) => {
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
    console.log("this.state.isLoadingGraph: ",this.state.isLoadingGraph)
    return (
      <div style={styles.GraphBackground}>
      {this.state.isLoadingGraph ?
       `Loading` :
        null }
      
          <Playground
      tweetObject={this.state.tweetObjects[this.state.focusedTweet]}
      tweetReplies={this.state.focusedTweetReplies}/>
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
