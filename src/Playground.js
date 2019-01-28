import React, { Component } from 'react';
import { ForceGraph2D, ForceGraph3D, ForceGraphVR } from 'react-force-graph';



class Playground extends Component
{
  constructor(props) {
    super(props);
    this.state = {
      focusedNode: null,
      myData: {
        nodes: [
          {
            id: "id1",
            name: "name1",
            val: 3,
            description:
            `ere`,
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
    }
  }
  componentDidUpdate (prevProps) {
    if (prevProps.tweetObject !== this.props.tweetObject){
      var text = this.props.tweetObject.retweet_count
      console.log(this.props.tweetObject.text)
      this.setState({myData: {
        nodes: [
          {
            id: "id1",
            name: "name1",
            val: 20,
            description: text
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
            val: 1,
            description: "I love clovers",
          },
          {
            id: "id5",
            name: "name5",
            val: 3,
            description: "I love clovers",
          }
        ],
        links: [
          {
            source: "id1",
            target: "id2"
          },
          {
            source: "id1",
            target: "id3"
          },
          {
            source: "id1",
            target: "id4"
          },
          {
            source: "id1",
            target: "id5"
          },
        ]

      }
    })
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
        }
      )
    }
  }
}

render() {

  return (
    <div>
    <ForceGraph2D
    graphData={this.state.myData}
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
