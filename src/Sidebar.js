import React, { Component } from 'react';
import TwitterWindow from './TwitterWindow.js'
import TweetGraph from './TweetGraph.js'
import GradientLoadingWheel from './GradientLoadingWheel.js'
import {createTweetDisplayObject} from './helpers/loadTweetObject';
import {getNodesAndLinks} from './helpers/graphUtils';
import {getTweetsFromUser,getTweetReplies} from './apis/twitterApiCalls';
import { FaChevronCircleLeft } from 'react-icons/fa';
import { FaChevronCircleRight } from 'react-icons/fa';
import Slider from 'react-slide-out';
import DisplayTweet from './DisplayTweet';

const styles = {
  SlideOut:{
    backgroundColor: '#F5F8FA',
    top:'50%',
    marginTop:'-24px',
    display:'flex',
    flexDirection:'column',
    justifyContent:'center',
    paddingLeft:'2px',
    left:'250px',
    width:'24px',
    height:'48px',
    borderRight:'1px solid #E1E8ED',
    borderLeft:'1px solid #E1E8ED',
    borderTop:'1px solid #E1E8ED',
    borderBottom:' 1px solid #E1E8ED',
    borderWidth:0.5,
    borderBottomRightRadius:'50%',
    borderTopRightRadius:'50%',
    position:'fixed'
  },
  SlideIn:{
    backgroundColor: '#F5F8FA',
    top:'50%',
    marginTop:'-24px',
    display:'flex',
    paddingLeft:'2px',
    flexDirection:'column',
    justifyContent:'center',
    left:'0px',
    width:'24px',
    height:'48px',
    borderWidth:0.5,
    borderRight:'1px solid #E1E8ED',
    borderTop:'1px solid #E1E8ED',
    borderBottom:' 1px solid #E1E8ED',
    borderBottomRightRadius:'50%',
    borderTopRightRadius:'50%',
    position:'fixed'
  }
}
class Sidebar extends Component {
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
    positive_percentage: 0,
    signedInWithTwitter:False
  },
      graphData:{nodes:[],links:[]},
      sidebarOpen:true,
      displayedTweet:null
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
    console.log(sentimentPercentages)
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
    this.loadTweetReplies(this.state.screenName,this.state.tweetObjects[id].id_str,30,id)//necessary to load graph
  }
  onFocusSearchBar = (id) => {
    this.setState({
      focusedTweet: null
    })
  }
  closeSidebar= () => {
    this.setState({
      sidebarOpen:false
    })
  }
  openSidebar= () => {
    this.setState({
      sidebarOpen:true
    })
  }
  onSelectSearchBar = (value) => {
    this.getTweetObjects(value)
    this.setState({
      focusedTweet: null
    })
  }
  hoverTweet = (value) => {
    this.setState({
      displayedTweet: value
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
  getTweetObjects(screenName){
    getTweetsFromUser(screenName,null)
    .then((newTweetObjects)=> {
      console.log(newTweetObjects)
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
    .then((newTweetObjects)=> {
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
      <div>
      {this.state.sidebarOpen ?
        <div>
      <TwitterWindow
      scrollRef = {this.myRef}
      tweetObjects={this.state.tweetObjects}
      handleScroll={this.handleScroll}
      isLoading={this.state.isLoading}
      focus = {this.focus}
      onFocusSearchBar = {this.onFocusSearchBar}
      onSelectSearchBar= {this.onSelectSearchBar}
      focusedTweet={this.state.focusedTweet}/>
      <div>
      <div style={styles.rightBorderTop}>
      </div>
      <div style={styles.SlideOut} onClick={this.closeSidebar}>
      <FaChevronCircleLeft
      color="#657786"
      size={18}/>
      </div>
      <div style={styles.rightBorderBottom}>
      </div>
      </div>
      </div>
      :
      <div style={styles.SlideIn} onClick={this.openSidebar}>
      <FaChevronCircleRight
      color="#657786"
      size={18}/>
      </div>}
      </div>
    );
  }
}

export default Sidebar;
