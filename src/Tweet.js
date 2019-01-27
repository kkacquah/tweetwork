import React, { Component } from 'react';
import {GenericScrollBox} from 'react-scroll-box'; // ES6
import {createTweetDisplayObject} from './helpers/loadTweetObject';
import {exampleTweets} from './apis/exampleTweets';
import twitterVerifiedSymbol from './assets/images/twitterVerifiedSymbol.png'

const styles = {
  twitterCard:{
    backgroundColor: 'white',
    borderBottom: '1px solid #E1E8ED',
    flexDirection: 'row',
    display: 'flex',
    justifyContent: 'space-between',
    padding:5
  },
  twitterCardFocused:{
    backgroundColor: ' #F5F8FA',
    borderBottom: '1px solid #E1E8ED',
    flexDirection: 'row',
    display: 'flex',
    justifyContent: 'space-between',
    padding:5
  },
  nameStyle:{
    flexDirection: 'row',
    marginBottom:0,
    display:'flex',
    flex:1
  },
  nameFont:{
    fontSize: 12,
    fontFamily: "Arial, Helvetica, sans-serif",
    fontWeight: 'bold',
    textAlign: "left",
    marginLeft: 3,
    marginBottom: 0,
    marginTop:2,
    float:"left"
  },
  screenNameFont:{
    fontSize: 10,
    fontFamily: "Arial, Helvetica, sans-serif",
    textAlign: "left",
    marginLeft: 3,
    color: "#AAB8C2",
    marginTop: 0,
    marginBottom: 0
  },
  textFont:{
    fontSize: 12,
    fontFamily: "Arial, Helvetica, sans-serif",
    textAlign: "left",
    marginLeft: 3,
    marginTop: 0
  },
  dateFont:{
    fontSize: 8,
    fontFamily: "Arial, Helvetica, sans-serif",
    textAlign: "right",
    marginRight: 3,
    marginTop: 0,
    marginBottom: 0,
    color: "#AAB8C2"
  }
}
class Tweet extends Component {
  constructor(props) {
    super(props);
  }
  cardStyle(){
    if (this.props.focusedTweet == this.props.id){
      return styles.twitterCardFocused
    } else {
      return styles.twitterCard
    }
  }
  handleOnMouseEnter = () => {
    this.props.onMouseEnter(this.props.id);
  }
  render() {
    return (
      <div style={this.cardStyle()} onMouseEnter={this.handleOnMouseEnter}>
        <div style={{marginTop:0}}>
          <img style={{borderRadius:'50%'}} width="20" height="20" src={this.props.tweetObject.profile_image_url} alt="profile-image" />
          </div>
        <div >
        <div>
        <div style={styles.nameStyle}>
        <p style={styles.nameFont}> {this.props.tweetObject.name} </p>
        {this.props.tweetObject.verified ? <div style={{marginTop:5, marginLeft: 2}}>
        <img width="13" height="13" src={twitterVerifiedSymbol} alt="verified-logo" />
        </div> : null}
        </div>
        <div>
        <p style={styles.screenNameFont}> @{this.props.tweetObject.screen_name} </p>
        </div>
        <p style={styles.textFont}>
        {this.props.tweetObject.text}
        </p>
        <div style={{marginTop:0}}>
        <p style={styles.dateFont}> {this.props.tweetObject.time_since} </p>
        </div>
        </div>
        </div>
        </div>
    );
  }
}


export default Tweet;
