import React, { Component } from 'react';
import { FaTwitter } from 'react-icons/fa';
import { FaTwitter } from 'react-icons/fa';
import {AwesomeButton} from 'react-awesome-button';
import Rodal from 'rodal';
import Ink from 'react-ink';

const styles = {
  SignInWithTwitterButton:{
    backgroundColor: '#F5F8FA',
    right:'20px',
    top:'20px',
    border:'1px solid #E1E8ED',
    padding:10,
    borderRadius:20,
    position:'absolute',
    display: 'flex',
    flexDirection:'row',
    alignItems:'center'
  },
  fontStyle:{
    fontSize: 16,
    fontFamily: "Arial, Helvetica, sans-serif",
    fontWeight: 'bold',
    textAlign: "center",
    margin:3,
    color:"#657786"
  }
}

class SignInWithTwitter extends Component {
  constructor(props) {
    super(props);
    this.state={
      modalOpen:false,
      requestToken:""
    }
  }
  signIn = () => {
    console.log("request sent")
    requestToken().then((response) =>{
      this.setState({
        modalOpen:true,
        requestToken: response
      })
    }
    )

  }
  closeModal = () => {
    this.setState({
      modalOpen:false
    })
  }
  render() {
    console.log(this.props.username)
    return (
      <div>
      {this.props.username ?
      <div style={styles.SignInWithTwitterButton}>
        @{this.props.username}
      </div>
      :
      <div style={styles.SignInWithTwitterButton} onClick={this.signIn}>
      <FaTwitter
      color={"#1DA1F2"}
      size="16px"/>
      <p style={styles.fontStyle}> Sign In</p>
    </div>}
    <Rodal visible={this.state.modalOpen} onClose={this.closeModal}>
        <div>Content</div>
    </Rodal>
      </div>
    );
  }
}

export default SignInWithTwitter;
