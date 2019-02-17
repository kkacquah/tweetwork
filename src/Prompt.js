import React, { Component } from 'react';

const styles = {
  containerStyle:{
    backgroundColor: 'transparent',
    width: '100%',
    height:'100%',
    display:'flex',
    flexDirection:'column',
    justifyContent:'center',
    borderTop: '1px solid #E1E8ED'
  },
  fontStyle:{
    fontSize: 16,
    fontFamily: "Arial, Helvetica, sans-serif",
    textAlign: "center",
    color:"#657786",
    fontWeight: 'bold',
    margin:10
  }
}
//include loading animation when no prompt is loading.
class Prompt extends Component {
  constructor(props) {
        super(props)
      }
  render() {
    return (
      <div style={styles.containerStyle}>
        <p style={styles.fontStyle}>{this.props.text}</p>
      </div>

    );
  }
}


export default Prompt;
