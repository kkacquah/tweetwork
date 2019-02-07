import React, { Component } from 'react';
import Tweet from './Tweet';
import ReactLoading from 'react-loading';
import SearchBar from './SearchBar';
import NavBar from './navBar';

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
        this.state = {tab:null}//either "home","hashtag","users"
    }
  onClickExplore = () =>{
      this.setState({tab:"explore"})
    }
  onClickSearch = () =>{
    this.setState({tab:"search"})
  }
  onClickHome = () =>{
    this.setState({tab:"home"})
  }
  render() {
    return (
        <div style={styles.window} >
        <NavBar
        navState={this.state.tab}
        onClickExplore= {this.onClickExplore}
        onClickSearch= {this.onClickSearch}
        onClickHome = {this.onClickHome}/>

        <div ref={this.props.myRef} style={styles.twitterWindow} ref={this.myRef} onScroll= {this.props.handleScroll}>
          {this.props.tweetObjects.map((value,i) => <Tweet focusedTweet={this.props.focusedTweet} id={i} onClick={this.props.focus} tweetObject = {value}/>)}

          { this.props.isLoading ?
            <div style={{height:50}}>
          <ReactLoading style={styles.loadingStyle} type={"spin"} color={"#E1E8ED"} />
          </div>
           : null}
           </div>
           {this.state.tab != "home"?
            <SearchBar onSelect= {this.props.onSelectSearchBar} focusedTweet= {this.props.focusedTweet} onFocus={this.props.onFocusSearchBar}/>
            : null}
        </div>
    );
  }
}

export default TwitterWindow;
