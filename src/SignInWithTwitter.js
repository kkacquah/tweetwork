import React, { Component } from 'react';
import { requestToken,login } from './apis/twitterApiCalls';
import {FaTwitter} from 'react-icons/fa';
import Modal from 'react-modal';
import Ink from 'react-ink';
import PinInput from 'react-pin-input';
import "./ModalStyle.css";

const authorizationBaseUrl = "https://api.twitter.com/oauth/authorize?oauth_token="
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
    alignItems:'center',
    outline:'none'
  },
  fontStyle:{
    fontSize: 16,
    fontFamily: "Arial, Helvetica, sans-serif",
    fontWeight: 'bold',
    textAlign: "center",
    margin:3,
    color:"#657786"
  },
  fontStyleHeader:{
    fontSize: 24,
    fontFamily: "Arial, Helvetica, sans-serif",
    fontWeight: 'bold',
    textAlign: "center",
    margin:3,
    color:"#657786",
    margin:15
  },
  inputStyle:{borderColor: '#E1E8ED', fontSize: 24, fontFamily: "Arial, Helvetica, sans-serif",color:"#657786",fontWeight: 'bold'}

}
const modalStyle = {
  overlay: {
               backgroundColor: 'papayawhip',
               top: '300px',
             },
  content: {
      position: 'absolute',

      left: '100px',
      right: '100px',
      bottom: '100px',
      // top: '50%',
      // left: '50%',
      // marginLeft: '-40px',
      // marginTop: '-40px',
      height:80,
      width:80,
      border: '1px solid #ccc',
      background: '#fff',
      overflow: 'auto',
      WebkitOverflowScrolling: 'touch',
      borderRadius: '4px',
      outline: 'none',
      padding: '20px'
    }
}

class SignInWithTwitter extends Component {
  constructor(props) {
    super(props);
  }


  render() {
    console.log(this.props.username)
    return (
      <div>
      <Modal
        closeTimeoutMS={200}
        className="Modal"
        overlayClassName="Overlay"
         style={{modalStyle}}
         isOpen={this.props.modalOpen}
       >
       <FaTwitter
       color={"#1DA1F2"}
       size="50px"/>
       <p style={styles.fontStyleHeader}> Enter your given PIN below:</p>
       <PinInput
        length={7}
        onChange={(value, index) => {}}
        type="numeric"
        style={{margin: 'auto'}}
        inputStyle={styles.inputStyle}
        inputFocusStyle={{borderColor: '#1DA1F2'}}
        onComplete={this.props.inputEntered}
      />

      </Modal>
      {this.props.signedInUser ?
      <button style={styles.SignInWithTwitterButton}>
        <p style={styles.fontStyle}> @{this.props.signedInUser}</p>
      </button>
      :
      <button style={styles.SignInWithTwitterButton} onClick={this.props.signIn}>
      <FaTwitter
      color={"#1DA1F2"}
      size="16px"/>
      <p style={styles.fontStyle}> Sign In</p>
      <Ink/>
    </button>}

      </div>
    );
  }
}

export default SignInWithTwitter;
