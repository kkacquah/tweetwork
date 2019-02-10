import React, { Component } from 'react';
import Tweet from './Tweet';
import { FaGrin } from 'react-icons/fa';
import { FaMapMarkedAlt } from 'react-icons/fa';
import {FaRetweet} from 'react-icons/fa';
import {FaReply} from 'react-icons/fa';
import {FaHeart} from 'react-icons/fa';
import { sentimentToColor} from './helpers/canvasUtils';
import Draggable from 'react-draggable';

const styles = {
  window:{
    width: '250px',
    bottom: '10%',
    right: '5%',
    borderRadius:10,
    //to see how it looks with logos on top
    backgroundColor:'white',
    border:'1px solid #E1E8ED',
    position: 'fixed',

  },
  row:{
    //to see how it looks with logos on top
    backgroundColor:'white',
    display: "flex",
    flexDirection:"row",
    borderRadius:10,
    justifyContent: "space-between",
    marginLeft:"20%",
    marginRight:"20%",
  },
  icon:{
    //to see how it looks with logos on top

  },
  fontStyle:{
    fontSize: 12,
    fontFamily: "Arial, Helvetica, sans-serif",
    fontWeight: 'bold',
    textAlign: "center",
    margin:3,
    color:"#657786"
  }
}
//var tweetObjects = getTweetsFromUser("realDonaldTrump").map((tweetObject) => createTweetDisplayObject(tweetObject));

class DisplayTweet extends Component {
  constructor(props) {
        super(props)   // Create a ref object=
    }
  sentimentFontStyle() {
    return {
      fontSize: 12,
      fontFamily: "Arial, Helvetica, sans-serif",
      fontWeight: 'bold',
      textAlign: "center",
      margin:3,
      color:sentimentToColor(this.props.displayedTweet.sentiment * 100,1)
    }
  }
  render() {
    return (
        <div style={styles.window}  >
        <Tweet
        borderTopRightRadius={10}
        borderTopLeftRadius={10}
        tweetObject = {this.props.displayedTweet}
        color='white'/>

        <div style={styles.row}>
        <div style={styles.icon}>
        <FaGrin
        color={"#657786"}
        size="12px"/> <p style={this.sentimentFontStyle()}>{(this.props.displayedTweet.sentiment*100).toFixed(0)}%</p>
        </div>
        <div style={styles.icon}>
        <FaHeart
        color={"#657786"}
        size="12px"/> <p style={styles.fontStyle}>{this.props.displayedTweet.favorite_count}</p>
        </div>
        <div>
        <FaReply
        color={"#657786"}
        size="12px"/><p style={styles.fontStyle}>{this.props.displayedTweet.favorite_count}</p>
        </div>
        <div style={styles.icon}>
        <FaRetweet
        color={"#657786"}
        size="12px"/><p style={styles.fontStyle}>{this.props.displayedTweet.retweet_count}</p>
        </div>
        </div>
        </div>
    );
  }
}

export default DisplayTweet;
