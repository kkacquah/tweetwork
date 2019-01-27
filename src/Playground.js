import React, { Component } from 'react';
import { ForceGraph2D, ForceGraph3D, ForceGraphVR } from 'react-force-graph';
import TwitterWindow from './TwitterWindow.js';

var myData = {
    nodes: [
        {
          id: "id1",
          name: "name1",
          val: 1
        },
        {
          id: "id2",
          name: "name2",
          val: 10
        }
    ],
    links: [
        {
            source: "id1",
            target: "id2"
        }
    ]
}


class Playground extends Component {
  constructor(props) {
    super(props);
    // Don't call this.setState() here!
  }
  render() {
    return (
      <div>
      <ForceGraph2D
    graphData={myData}
  />
  </div>
);
  }
}


export default Playground;
