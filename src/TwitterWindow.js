import React, { Component } from 'react';
import Tweet from './Tweet';
import ReactLoading from 'react-loading';
import SearchBar from './SearchBar';
import NavBar from './navBar';
import Prompt from './Prompt';
import {getTweetsFromUser} from './apis/twitterApiCalls';
const styles = {
  twitterWindow:{
    overflow:'scroll',
    justifyContent:'center',
    height:'100%',
    width: '250px',
    position: 'relative',
    order:2
  },
  window:{
    height: '100%',
    display:'flex',
    flex:1,
    flexDirection:'column',
    //to see how it looks with logos on top
    alignItems:'center',
    backgroundColor:' #F5F8FA',
    top:0,
    width: '250px',
    borderRight:'1px solid #E1E8ED',
    position: 'fixed',
  },
  navBar:{
    width:'65%',
    display:'flex',
    justifyContent:'space-between',
    flexDirection:'row',
    padding:7
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
        super(props)   // Create a ref object
        this.state =
          {tab:null,
          tweetObjects: [],
          hasMore: true,
          isLoading: false,
          cursor: null,
          isLoadingScroll: false,
        prompt:null}//either "home","hashtag","users"
    }
  onClickExplore = () =>{
      this.setState({tab:"explore"})
    }
  onClickSearch = () =>{
    this.setState({
    tab: "search",
    prompt:`Click on the search bar above to search for tweets, preface your search with "@" to search for users, preface your search with "#" to search for hashtags.`
    })
  }
  onClickHome = () =>{
    this.setState({
    tab: "home",
    isLoading:true,
    prompt:null,
    }, () => {
      this.getTweets();
    });
  }
  handleScroll = (e) => {
    const bottom = e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
    if (bottom && this.state.hasMore) {
      this.setState({
        isLoadingScroll: true
      },this.loadTweetPage)
    }
  }
  getTweets(){
    getTweetsFromUser(this.props.screenName,null,this.state.tab,this.props.requestToken)
    .then((newTweetObjects)=> {
      var lastTweetId = newTweetObjects[newTweetObjects.length-1].id_str
      this.setState({
        tweetObjects: newTweetObjects,
        cursor:lastTweetId,
        isLoading: false,
        focusedTweetReplies: []
      })
    })
    .catch((error) => {
      this.setState({
        tweetObjects: [],
        cursor:null,
        isLoading: false,
        focusedTweetReplies: [],
        prompt:`Sign in through Twitter to access this feature`
      })
    })
  }
  //currently, no loading animation or loading happens when one scrolls to the bottom of a page
  loadTweetPage = () => {
    getTweetsFromUser(this.props.screenName,this.state.cursor,this.state.tab,this.props.requestToken)
    .then((newTweetObjects)=> {
        var lastTweetId = newTweetObjects[newTweetObjects.length-1].id_str
        this.setState({
          tweetObjects: this.state.tweetObjects.concat(newTweetObjects),
          cursor:lastTweetId,
          isLoadingScroll: false,
          hasMore: true
        })
    })
    .catch((error) => {
      console.log(error)
    })
  }
  componentDidMount () {
    this.getTweets()
  }
  componentDidUpdate(prevProps,prevState) {
    if(prevProps.screenName != this.props.screenName){
      this.getTweets()
    }
  }
  render() {
    return (
        <div style={styles.window} >
        <NavBar
        navState={this.state.tab}
        onClickExplore= {this.onClickExplore}
        onClickSearch= {this.onClickSearch}
        onClickHome = {this.onClickHome}/>
        {this.state.prompt || this.state.isLoading ?
         <Prompt text= {this.state.prompt}/>:
        <div ref={this.myRef} style={styles.twitterWindow} ref={this.myRef} onScroll= {this.handleScroll}>
          {this.state.tweetObjects.map((value,i) => <Tweet focusedTweet={this.props.focusedTweet} id={i} onClick={this.props.focus} tweetObject = {value}/>)}

          { this.state.isLoading &&
            <div style={{height:50}}>
          <ReactLoading style={styles.loadingStyle} type={"spin"} color={"#E1E8ED"} />
          </div>}
           </div>}
           {this.state.tab != "home" &&
            <SearchBar
            onSelect= {this.props.onSelectSearchBar}
            focusedTweet= {this.props.focusedTweet}
            onFocus={this.props.onFocusSearchBar}/>}

        </div>
    );
  }
}

export default TwitterWindow;
