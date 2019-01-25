import React, { Component } from 'react';
import TwitterWindow from './TwitterWindow.js'
const styles = {
  GraphBackground:{
    backgroundColor: '#202C39',
    width:'100%',
    height:'100%',
    position:'absolute'
  }
}
class GraphComponent extends Component {
  render() {
    return (
      <div style={styles.GraphBackground}>
        <TwitterWindow/>
      </div>
    );
  }
}

export default GraphComponent;
