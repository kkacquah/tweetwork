import React, { Component } from 'react';
import { ForceGraph2D} from 'react-force-graph';



class Playground extends Component
{
  constructor(props) {
    super(props);
    this.state = {
      focusedNode: null,
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
    this.setState({
      focusedNode: node.id
    })
  }}

  label = (node) => {
    if (this.state.focusedNode){
      if (this.state.focusedNode===node.id){
        return node.description
      }
    }
  }

  myColor = (node) => {
    if (this.state.focusedNode){
      if (this.state.focusedNode===node.id){
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
      this.setState({
        focusedNode: node.id
      })
    }
    if (prevNode){
      if (prevNode.id === this.state.focusedNode){
        this.setState({
          focusedNode: null
        }
      )
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
    graphData={{nodes:this.state.nodes,links:this.state.links}}
    nodeColor={this.myColor}
    onNodeHover={this.handleHover}
    onNodeClick={this.click}
    nodeLabel={this.label}
    dagMode={"radialout"}
    />
    </div>
  );
}
}



export default Playground;
