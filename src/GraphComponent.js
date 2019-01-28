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
      name:"realDonaldTrump",
      focusedTweet: 0,
      focusedTweetReplies: [],
      tweetObjects: [],
      hasMore: true,
      isLoading: false,
      cursor: null
    }
  }
  loadTweetReplies(id){
    getTweetReplies(this.state.name,this.state.tweetObjects[id].id_str)
    .then((tweetObjs)=> {
      var newTweetReplies = tweetObjs.map((tweetObject) => createTweetDisplayObject(tweetObject));
      this.setState({
          focusedTweetReplies: newTweetReplies
        })
  })
}
  focus = (id) => {
    this.setState({
      focusedTweet: id
    })
    this.loadTweetReplies(id)
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
    getTweetsFromUser(this.state.name,this.state.cursor)
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
    console.log(this.state.focusedTweet)
    console.log(this.state.focusedTweetReplies)
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
