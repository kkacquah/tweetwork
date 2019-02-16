import React, { Component } from 'react';
import TwitterWindow from './TwitterWindow.js'
import TweetGraph from './TweetGraph.js'
import {authorizationBaseUrl} from './config.js'
import GradientLoadingWheel from './GradientLoadingWheel.js'
import {createTweetDisplayObject} from './helpers/loadTweetObject';
import {getNodesAndLinks} from './helpers/graphUtils';
import {getTweetsFromUser,getTweetReplies,requestToken,login} from './apis/twitterApiCalls';
import { FaChevronCircleLeft } from 'react-icons/fa';
import { FaChevronCircleRight } from 'react-icons/fa';
import Slider from 'react-slide-out';
import DisplayTweet from './DisplayTweet';
import SignInWithTwitter from './SignInWithTwitter';
import Modal from 'react-modal';

const styles = {
  GraphBackground:{
    backgroundColor: '#F5F5F5',
    width:'100%',
    height:'100%',
    position: 'absolute'
  },
  loadingBackground:{
    backgroundColor: '#F5F5F5',
    width:'100%',
    height:'100%',
    position:'fixed',
    display:'flex',
    justifyContent:'center',
    alignItems:'center'
  },
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
//TODO: Add cookies
class GraphComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      screenName:"CNN",
      focusedTweet: null,
      isLoadingGraph:false,
      nodes:[],
      links:[],
      modalOpen:false,
      requestToken:null,
      signedInUser:null,
      sentimentPercentages: {
    negative_percentage: 0,
    neutral_percentage: 0,
    positive_percentage: 0
  },
      graphData:{nodes:[],links:[]},
      sidebarOpen:true,
      displayedTweet:null
    }
  }
  //In the future, the focused tweet can be abstracted entirely into twitter window
  loadTweetReplies(tweet) {
    var numberOfRequests=20
    var screenName;
    var idStr;
    if(tweet.retweeted_status){
      screenName = tweet.retweeted_status.screen_name
      idStr = tweet.retweeted_status.id_str
    } else {
      screenName = tweet.screen_name
      idStr = tweet.id_str
    }
     this.setState({
        isLoadingGraph:true
      })
    getTweetReplies(screenName,idStr,numberOfRequests)
    .then((response)=> {
      this.makeMyDataNodes(tweet,response.replies,response.percentages)
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
  focus = (tweet) => {
    this.setState({
      focusedTweet: tweet
    })
    this.loadTweetReplies(tweet)//necessary to load graph
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
  onFocusUser = (value) => {
    this.setState({
      focusedTweet: null,
      screenName:value
    })
  }

  signIn = () => {
    requestToken().then((response) =>{
      var authorizationUrl = authorizationBaseUrl + response
      var popup_window=window.open(authorizationUrl,'popup')
      try {
        popup_window.focus();
      } catch (e) {
        alert("Pop-up Blocker is enabled! Please allow access to be verified.");
      }
    this.setState({
        modalOpen:true,
        requestToken: response
      })
    }
    )
  }
  inputEntered = (value) => {
    login(value,this.state.requestToken).then((username) =>{
      if(username){
        this.setState({
          modalOpen:false,
          signedInUser: username
        })
      }
      })
      .catch((error) =>{
        //todo better error reporting
        console.log(error)
      })
    }

  render() {
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
      {this.state.focusedTweet != null?
      <TweetGraph
      display ={!this.state.isLoadingGraph}
			graphData={this.state.graphData}
      tweetObject={this.state.focusedTweet}
      onHover={this.hoverTweet}
      hoveredTweet={this.state.displayedTweet}/>
      : null}
      {this.state.sidebarOpen ?
        <div>
      <TwitterWindow
      focusedTweet={this.state.focusedTweet}
      screenName = {this.state.screenName}
      requestToken = {this.state.requestToken}
      focus = {this.focus}
      onSelectSearchBar= {this.onFocusUser}/>
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
      <SignInWithTwitter
      signIn={this.signIn}
      signedInUser={this.state.signedInUser}
      requestToken={this.state.requestToken}
      inputEntered={this.inputEntered}
      modalOpen={this.state.modalOpen}
      />
      </div>
    );
  }
}

export default GraphComponent;
