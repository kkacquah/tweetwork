import React, { Component } from 'react';
import { ForceGraph2D, ForceGraph3D, ForceGraphVR } from 'react-force-graph';

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
        },
        {
          id: "id3",
          name: "name3",
          val: 5
        },
        {
          id: "id4",
          name: "name4",
          val: 20
        }
    ],
    links: [
        {
            source: "id1",
            target: "id2",
        },
        {
            source: "id2",
            target: "id3",
        },
        {
            source: "id2",
            target: "id4",
        },
    ]
}


class Playground extends Component {
  myColor(node) {
    if (node.id == 'id1'){
      return "#FF0000"
    } else {
      return "#00ff00"
    }
  }
  constructor(props) {
    super(props);
    // Don't call this.setState() here!
  }
  render() {
    return (
      <div>
      <ForceGraph2D
    graphData={myData}
    nodeColor={this.myColor}
  />
  </div>
);
  }
}


export default Playground;
