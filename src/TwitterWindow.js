import React, { Component } from 'react';
import Tweet from './Tweet';
import ReactLoading from 'react-loading';
import SearchBar from './SearchBar';
const styles = {
  twitterWindow:{
    overflow:'scroll',
    justifyContent:'center',
    height:'100%',
    minHeight: '500px',
    width: '200px',
    borderRadius: 5,
  },
  window:{
    height: '90%',
    justifyContent:'center',
    backgroundColor:'white',
    marginLeft: '20px',
    borderRadius: 5,
    top:"2%",
    position: 'fixed',

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
  render() {
    return (
        <div style={styles.window} >
         <SearchBar onSelect= {this.props.onSelectSearchBar} focusedTweet= {this.props.focusedTweet} onFocus={this.props.onFocusSearchBar}/>
        <div style={styles.twitterWindow} onScroll= {this.handleScroll}>
          {this.props.tweetObjects.map((value,i) => <Tweet focusedTweet={this.props.focusedTweet} key={value.id_str} id={i} onMouseEnter={this.props.focus} tweetObject = {value}/>)}

          { this.props.isLoading ?
            <div style={{height:50}}>
          <ReactLoading style={styles.loadingStyle} type={"spin"} color={"#E1E8ED"} />
          </div>
           : null}
           </div>
        </div>
    );
  }
}

export default TwitterWindow;
