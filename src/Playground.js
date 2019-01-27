import React, { Component } from 'react';
import { ForceGraph2D, ForceGraph3D, ForceGraphVR } from 'react-force-graph';

var myData = {
    nodes: [
        {
          id: "id1",
          name: "name1",
          val: 3,
          description:
          `Comments: 120 <br\>
          Retweets: 160 <br\>
          Likes: 1,200 <br\>`,
        },
        {
          id: "id2",
          name: "name2",
          val: 10,
          description: "I love clovers",
        },
        {
          id: "id3",
          name: "name3",
          val: 5,
          description: "I love clovers",
        },
        {
          id: "id4",
          name: "name4",
          val: 15,
          description: "I love clovers",
        }
    ],
    links: [
        {
            source: "id1",
            target: "id2"
        },
        {
            source: "id2",
            target: "id3"
        },
        {
            source: "id1",
            target: "id4"
        },
        {
            source: "id1",
            target: "id3"
        },
    ]
}


class Playground extends Component
{
  constructor(props) {
    super(props);
    this.state = {
      focusedNode: null,
    }
  }

click = (node) => {
  if (node){
    console.log("clicked")
    this.setState({
      focusedNode: node.id
})
}}

label = (node) => {
  if (this.state.focusedNode){
    if (this.state.focusedNode==node.id){
      return node.description
    }
  }
  }

  myColor = (node) => {
    if (this.state.focusedNode){
      if (this.state.focusedNode==node.id){
        return "#1DA1F2"
      } else {
        return "#657786"
      }
    } else {
      return "#657786"
    }
  }

  handleHover = (node,prevNode) => {
    if (node){
      console.log("i love michelle")
      this.setState({
        focusedNode: node.id
      })
    }
    if (prevNode){
      if (prevNode.id == this.state.focusedNode){
        this.setState({
          focusedNode: null
        })
      }
    }
  }

  render() {

    return (
      <div>
      <ForceGraph2D
    graphData={myData}
    nodeColor={this.myColor}
    onNodeHover={this.handleHover}
    onNodeClick={this.click}
    nodeLabel={this.label}
    enableZoomPanInteraction= {false}
  />
  </div>
);
  }
}



export default Playground;
