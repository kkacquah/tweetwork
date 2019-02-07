import React, { Component } from 'react';
import User from './User.js';
import './SearchBar.css';

const styles = {
  Outer:{
    height: '30px',
    width: '250px',
    backgroundColor: "white",
    justifyContent:'center',
    alignItems:'center',
    display: 'inline-block',
    order:1
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
  }
}
//var tweetObjects = getTweetsFromUser("realDonaldTrump").map((tweetObject) => createTweetDisplayObject(tweetObject));

class SearchBar extends Component {
  constructor(props){
    super(props)
    this.state = {
      value: "",
      style:styles.InputStyle,
      focused:false,
      focusedUser:null,
      users: [{name:'Donald J. Trump', screen_name:'realDonaldTrump'}, {name:'CNN', screen_name:'CNN'},{name:'Kenneth Acquah', screen_name:'aquariusacquah'},{name: 'Kim Kardashian West', screen_name:'KimKardashian'}]
    }
  }
  onFocus  = () => {
    this.props.onFocus()
    this.setState({focused: true});
  }
  onBlur  = () => {
    this.setState({focused: false});
  }
  onFocusUser  = (id) => {
    this.setState({focusedUser: id});
  }
  onClickUser  = (id) => {
    this.props.onSelect(this.state.users[id].screen_name);
    this.setState({focused: false});
  }
  handleChange = (event) => {
      this.setState({value: event.target.value});
    }
  searchUsers
  render() {
    return (
      <div>
      <div style={styles.Outer}>
      <input className="search-bar"
        type="text"
        value={this.state.value}
        onFocus={ this.onFocus }
        onBlur={ this.onBlur }
        onChange={this.handleChange} />
        </div>
        {this.state.focused ?
        <div class="speech-bubble">
        <div class="arrow-top"></div>
        {this.state.users.map(
        (user,i) => <User
        text={user.name}
        subtext={user.screen_name}
        id={i}
        onMouseEnter={this.onFocusUser}
        onClick={this.onClickUser}
        focused={this.state.focusedUser}
        />)}
        </div>
        : null
      }
      </div>

    );
  }
}

export default SearchBar;
