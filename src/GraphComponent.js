import React, { Component } from 'react';
import TwitterWindow from './TwitterWindow.js'
import TweetGraph from './TweetGraph.js'
import GradientLoadingWheel from './GradientLoadingWheel.js'
import {createTweetDisplayObject} from './helpers/loadTweetObject';
import {getNodesAndLinks} from './helpers/graphUtils';
import {getTweetsFromUser,getTweetReplies} from './apis/twitterApiCalls';

const styles = {
  GraphBackground:{
    backgroundColor: '#F5F8FA',
    width:'100%',
    height:'100%',
    position: 'relative'
  },
  loadingBackground:{
    backgroundColor: '#F5F8FA',
    width:'100%',
    height:'100%',
    position:'fixed',
    display:'flex',
    justifyContent:'center',
    alignItems:'center'
  }
}
class GraphComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      screenName:"CNN",
      focusedTweet: 0,
      tweetObjects: [],
      hasMore: true,
      isLoading: false,
      cursor: null,
      isLoadingGraph:false,
      nodes:[],
      links:[],
      renderInfo:[],
      sentimentPercentages: {
    negative_percentage: 0,
    neutral_percentage: 0,
    positive_percentage: 0
  },
      graphData:{nodes:[],links:[]}
    }
  }
  loadTweetReplies(name,idString,numberOfRequests=10,focusedId){
     this.setState({
        isLoadingGraph:true
      })
    getTweetReplies(name,idString,numberOfRequests)
    .then((response)=> {
      var focusedTweetId = this.state.focusedTweet
      this.makeMyDataNodes(this.state.tweetObjects[focusedTweetId],response.replies,response.percentages)
    })
    .catch((error)=> {
      console.log(error)
    })
  }
  makeMyDataNodes (tweetObject,tweetReplies,sentimentPercentages) {
  	if(tweetObject && tweetReplies) {
  		let graphData = getNodesAndLinks(tweetObject,tweetReplies,sentimentPercentages)
  		this.setState({
        graphData: graphData,
        isLoadingGraph:false
  		})
  	} else {
  		return
  	}

  }
  focus = (id) => {
    this.setState({
      focusedTweet: id
    })
    this.loadTweetReplies(this.state.screenName,this.state.tweetObjects[id].id_str,40,id)//necessary to load graph
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
      { this.state.isLoadingGraph?
       <div style={styles.loadingBackground} >
       <GradientLoadingWheel
       width={200}
       height={200}
       />
       </div>  :
        null }

      <TweetGraph
      display ={!this.state.isLoadingGraph}
			graphData={this.state.graphData}
      tweetObject={this.state.tweetObjects[this.state.focusedTweet]}/>
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
