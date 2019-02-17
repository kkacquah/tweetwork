import React, { Component } from 'react';
import { FaCompass } from 'react-icons/fa';
import { FaSearch } from 'react-icons/fa';
import { FaHome } from 'react-icons/fa';
import Ink from 'react-ink';

const styles = {
  navBar:{
  width:'65%',
  display:'flex',
  justifyContent:'space-between',
  flexDirection:'row',
  position:'static'
},
  buttonStyle:{
    padding:10,
    position:'relative',
    flex:1
  }
}

class NavBar extends Component {
  constructor(props) {
        super(props)   // Create a ref object
    }
  render() {
    return (
        <div style={styles.navBar}>
        <div style={styles.buttonStyle}
        onClick={this.props.onClickExplore}>
        <FaCompass
        color={this.props.navState== "explore" ? "#1DA1F2" : "#657786"}
        size="22px"/>
        <Ink/>
        </div>
        <div style={styles.buttonStyle}
        onClick={this.props.onClickSearch}>
        <FaSearch
        color={this.props.navState== "search" ? "#1DA1F2" : "#657786"}
        size="22px"/>
        <Ink/>
        </div>
        <div style={styles.buttonStyle}
        onClick={this.props.onClickHome}>
        <FaHome
        color={this.props.navState== "home" ? "#1DA1F2" : "#657786"}
        size="22px"/>
        <Ink/>
        </div>

        </div>
    );
  }
}

export default NavBar;
