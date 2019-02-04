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
      tweetObjects: [],
      hasMore: true,
      isLoading: false,
      cursor: null,
      isLoadingGraph:true,
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
  }
  makeMyDataNodes (tweetObject,tweetReplies,sentimentPercentages) {
  	console.log("tweetObject: ",tweetObject)
  	console.log("tweetReplies: ",tweetReplies)
  	if(tweetObject && tweetReplies) {
  		const convertReplyToNode = (reply) => {
  			return {
  				id: reply.id_str,
  				name: reply.name,
  				val: 5,
  				description: reply.text,
  			}
  		}
  		const convertReplyToRenderInfo = (map, reply) => {
  					map[reply.id_str] =
  					{
  						image:reply.profile_image_url,
  						num_retweets:reply.favorite_count,
  						sentiment:reply.sentiment
  					}
  					return map;
  			}
  		const convertReplyToLink = (reply) => {
  			return {
  				source: reply.id_str,
  				target: tweetObject.id_str
  			}
  		}
  		const convertReplyToSeperationLink = (reply) => {
  			var sentimentString
  			if(reply.sentiment < 0.42){
  					sentimentString = "lowSentiment"
  			} else if (reply.sentiment >= 0.42 && reply.sentiment < 0.58){
  					sentimentString = "medSentiment"
  			} else {
  					sentimentString = "highSentiment"
  			}
  			return {
  				source: sentimentString,
  				target: reply.id_str
  			}
  		}
  		let replyNodes = tweetReplies.map(convertReplyToNode)
  		replyNodes = replyNodes.concat([{
  			id: tweetObject.id_str,
  			name: tweetObject.name,
  			val: 13, //Math.sqrt(tweetObject.favorite_count),
  			description: tweetObject.full_text,
  		},
  		{
  				id:"highSentiment"
  		},
  		{
  				id:"medSentiment"
  		},
  		{
  				id:"lowSentiment"
  		}])
  		let replyLinks = tweetReplies.map(convertReplyToLink)
  		let seperationLinks = tweetReplies.map(convertReplyToSeperationLink)
  		let replyRenderInfo = tweetReplies.reduce(convertReplyToRenderInfo,{})
  		replyRenderInfo[tweetObject.id_str] = {
  			image:tweetObject.profile_image_url,
  			num_retweets:tweetObject.favorite_count,
  			sentiment:0.5
  		}
  		this.setState({
        graphData:{
  			     nodes:replyNodes,
  			     links:replyLinks.concat(seperationLinks)
        },
  			renderInfo:replyRenderInfo,
        isLoadingGraph:false,
        sentimentPercentages:sentimentPercentages
  		})
  	} else {
  		return
  	}

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
      renderInfo={this.state.renderInfo}//mapping of nodeIds to image urls
			graphData={this.state.graphData}
      sentimentPercentages={this.state.sentimentPercentages}
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
