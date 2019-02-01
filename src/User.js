import React, { Component } from 'react';

const styles = {
  Outer:{
    backgroundColor: "white",
    display: 'flex',
    width:175,
    borderRadius:5
  },
  OuterFocused:{
    backgroundColor: "#E1E8ED",
    display: 'flex',
    width:175,
    borderRadius:7
  },
  userFont:{
    fontSize: 12,
    fontFamily: "Arial, Helvetica, sans-serif",
    fontWeight: 'bold',
    textAlign: "left",
    marginLeft: 3,
    marginBottom: 0,
    marginTop:2,
    float:"left"
  },
  userFontFocused:{
    fontSize: 12,
    fontFamily: "Arial, Helvetica, sans-serif",
    fontWeight: 'bold',
    textDecoration: "underline",
    color:"#1DA1F2",
    textAlign: "left",
    marginLeft: 3,
    marginBottom: 0,
    marginTop:2,
    float:"left"
  },
  subtextFont:{
    fontSize: 12,
    fontFamily: "Arial, Helvetica, sans-serif",
    textAlign: "left",
    color:"#AAB8C2",
    marginBottom: 0,
    marginTop:2,
    float:"left"
  },
}
//var tweetObjects = getTweetsFromUser("realDonaldTrump").map((tweetObject) => createTweetDisplayObject(tweetObject));

class User extends Component {
  userStyle () {
    if(this.props.focused == this.props.id){
      return styles.OuterFocused
    } else {
      return styles.Outer
    }
  }
  fontStyle () {
    if(this.props.focused == this.props.id){
      return styles.userFontFocused
    } else {
      return styles.userFont
    }
  }
  handleOnMouseEnter = () => {
    this.props.onMouseEnter(this.props.id);
  }
  handleOnClick = () => {
    this.props.onClick(this.props.id);
  }
  render() {
    return (
        <div
        style={this.userStyle()}
        key={this.props.id}
        onMouseEnter={this.handleOnMouseEnter}
        onClick={this.handleOnClick}>
        <p style={this.fontStyle()}>{this.props.text}</p>
        <p style={styles.subtextFont}>&nbsp;@{this.props.subtext}</p>
        </div>
    );
  }
}

export default User;
