import React, { Component } from 'react';
import { FaCompass } from 'react-icons/fa';
import { FaSearch } from 'react-icons/fa';
import { FaHome } from 'react-icons/fa';


const styles = {
  navBar:{
  width:'65%',
  display:'flex',
  justifyContent:'space-between',
  flexDirection:'row',
  padding:10
}
}

class NavBar extends Component {
  constructor(props) {
        super(props)   // Create a ref object
    }
  render() {
    return (
        <div style={styles.navBar}>
        <div
        onClick={this.props.onClickExplore}>
        <FaCompass
        color={this.props.navState== "explore" ? "#1DA1F2" : "#657786"}
        size="22px"/>
        </div>
        <div
        onClick={this.props.onClickSearch}>
        <FaSearch
        color={this.props.navState== "search" ? "#1DA1F2" : "#657786"}
        size="22px"/>
        </div>
        <div
        onClick={this.props.onClickHome}>
        <FaHome
        color={this.props.navState== "home" ? "#1DA1F2" : "#657786"}
        size="22px"/>
        </div>
        </div>
    );
  }
}

export default NavBar;
