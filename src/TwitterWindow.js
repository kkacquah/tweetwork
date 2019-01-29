import React, { Component } from 'react';
import Tweet from './Tweet';
import ReactLoading from 'react-loading';
import SearchBar from './SearchBar';
const styles = {
  twitterWindow:{
    marginLeft: '20px',
    minHeight: '500px',
    height: '90%',
    width: '200px',
    backgroundColor: 'White',
    flexDirection: 'row',
    overflow:'scroll',
    position: 'fixed',
    borderRadius:5,
    justifyContent:'center',
    top:"5%"
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
      <div style={styles.twitterWindow} onScroll= {this.handleScroll}>
        <SearchBar/>
          {this.props.tweetObjects.map((value,i) => <Tweet focusedTweet={this.props.focusedTweet} key={value.id_str} id={i} onMouseEnter={this.props.focus} tweetObject = {value}/>)}

          { this.props.isLoading ?
            <div style={{height:50}}>
          <ReactLoading style={styles.loadingStyle} type={"spin"} color={"#E1E8ED"} />
          </div>
           : null}

        </div>
    );
  }
}

export default TwitterWindow;
