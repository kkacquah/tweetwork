import React, { Component } from 'react';
import { ForceGraph2D} from 'react-force-graph';
import './Playground.css';

const nodes = {
    "nodes": [
        {
          "id": "id1",
          "name": "name1",
          "val": 1
        },
        {
          "id": "id2",
          "name": "name2",
          "val": 10
        }
    ],
    "links": [
        {
            "source": "id1",
            "target": "id2"
        }
    ]
}
class Playground extends Component
{
  constructor(props) {
    super(props);
    this.state = {
      focusedNodeId: null,
      images: {
        "id1":"https://pbs.twimg.com/profile_images/874276197357596672/kUuht00m_400x400.jpg",
        "id2":"https://pbs.twimg.com/profile_images/508960761826131968/LnvhR8ED_400x400.png"
      },//mapping of nodeIds to image urls
      nodes: [],
      links: []
    }
  }
  componentDidUpdate (prevProps) {
    if (prevProps.tweetReplies !== this.props.tweetReplies){
      this.makeMyDataNodes(this.props.tweetObject,this.props.tweetReplies)
    }
  }
click = (node) => {
  if (node){

  }}
  nodeCanvasObject = ({ id, x, y }, ctx) => {
          var img = new Image();
          img.src = this.state.images[id]
          ctx.strokeStyle=this.myColor(id)
          ctx.beginPath();
          ctx.arc(x, y, 6, 0, 2 * Math.PI, false)
          var img = new Image();
          img.src = this.state.images[id]
          ctx.lineWidth = 3;
          ctx.drawImage(img, x-5, y-5,10,10); // rectangle;
          ctx.stroke();
  }
  label = (node) => {
    if (this.state.focusedNode){
      if (this.state.focusedNode===node.id){
        return node.description
      }
    }
  }

  myColor = (id) => {
    if (this.state.focusedNodeId){
      if (this.state.focusedNodeId===id){
        return "#1DA1F2"
      } else {
        return "#FFFFFF"
      }
    } else {
      return "#FFFFFF"
    }
  }

  handleHover = (node,prevNode) => {
    if (node){
      this.setState({
        focusedNodeId: node.id
      })
    }
    if (prevNode){
      if (prevNode.id === this.state.focusedNodeId){
        this.setState({
          focusedNodeId: null
        })
    }
  }
}

makeMyDataNodes (tweetObject,tweetReplies) {
  const convertReplyToNode = (reply) => {
    return {
      id: reply.id_str,
      name: reply.name,
      val: 5,
      description: reply.text,
    }

  }

  const convertReplyToLink = (reply) => {
    return {
      source: tweetObject.id_str,
      target: reply.id_str
    }
  }
  let replyNodes = tweetReplies.map(convertReplyToNode)
  replyNodes.push({
    id: tweetObject.id_str,
    name: tweetObject.name,
    val: 13, //Math.sqrt(tweetObject.favorite_count),
    description: tweetObject.full_text,
  })
  let replyLinks = tweetReplies.map(convertReplyToLink)
  this.setState({
    nodes:replyNodes,
    links:replyLinks
  })
}

render() {
  return (
    <div>
    <ForceGraph2D
    nodeCanvasObject={this.nodeCanvasObject}
    graphData={nodes}
    nodeColor={this.myColor}
    onNodeHover={this.handleHover}
    onNodeClick={this.click}
    nodeLabel={this.label}
    />
    </div>
  );
}
}



export default Playground;
