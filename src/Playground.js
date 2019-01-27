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
        }
    ],
    links: [
        {
            source: "id1",
            target: "id2"
        }
    ]
}


class Playground extends Component
{
  constructor(props) {
    super(props);
    this.state = {}
  }
  myColor(node) {
    if (node.id == 'id1'){
      return "#FF0000"
    } else {
      return "#00ff00"
    }
  }

  handleHover = (node,prevNode) => {
    console.log(node)
  }

  render() {
    return (
      <div>
      <ForceGraph3D
    graphData={myData}
    nodeColor={this.myColor}
    onNodeHover={this.handleHover}
  />
  </div>
);
  }
}


export default Playground;
