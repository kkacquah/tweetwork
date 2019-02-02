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
      renderInfo: {},//mapping of nodeIds to image urls
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
          var size = Math.sqrt(Math.sqrt(this.state.renderInfo[id].num_retweets));
          var radius = size*(3/5)
          ctx.strokeStyle=this.nodeColor(id)
          ctx.beginPath();
          ctx.arc(x, y, radius, 0, 2 * Math.PI, false)
          var img = new Image();
          img.src = this.state.renderInfo[id].image
          ctx.lineWidth = radius/2;
          ctx.drawImage(img, x-(size/2), y-(size/2),size,size); // rectangle;
          ctx.stroke();
  }
  label = (node) => {
    if (this.state.focusedNode){
      if (this.state.focusedNode===node.id){
        return node.description
      }
    }
  }

  nodeColor = (id) => {
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
  linkColor = (link) => {
    if(link.source.id){
      let percent = this.state.renderInfo[link.source.id].sentiment*100
      let r = percent<50 ? 255 : Math.floor(255-(percent*2-100)*255/100);
      let g = percent>50 ? 255 : Math.floor((percent*2)*255/100);
      return 'rgba('+r+','+g+',0,0.5)';
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
  if(tweetObject && tweetReplies) {
    const convertReplyToNode = (reply) => {
      return {
        id: reply.id_str,
        name: reply.name,
        val: 5,
        description: reply.text,
      }
    }
    const convertReplyToRenderInfo = (map, reply) => {
          map[reply.id_str] =
          {
            image:reply.profile_image_url,
            num_retweets:reply.favorite_count,
            sentiment:Math.random()
          }
          return map;
      }
    const convertReplyToLink = (reply) => {
      return {
        source: reply.id_str,
        target: tweetObject.id_str
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
    let replyRenderInfo = tweetReplies.reduce(convertReplyToRenderInfo,{})
    replyRenderInfo[tweetObject.id_str] = {
      image:tweetObject.profile_image_url,
      num_retweets:tweetObject.favorite_count,
      sentiment:Math.random()
    }
    this.setState({
      nodes:replyNodes,
      links:replyLinks,
      renderInfo:replyRenderInfo
    })
  } else {
    return
  }

}

render() {
  console.log({nodes:this.state.nodes,links:this.state.links});
  return (
    <div>
    <ForceGraph2D
    nodeCanvasObject={this.nodeCanvasObject}
    graphData={{nodes:this.state.nodes,links:this.state.links}}
    nodeColor={this.nodeColor}
    onNodeHover={this.handleHover}
    onNodeClick={this.click}
    nodeLabel={this.label}
    linkDirectionalArrowLength={5}
    linkOpacity	={0.2}
    linkColor	={this.linkColor}
    linkWidth	={5}
    d3Force = {'charge'}
    dagMode={'radialin'}
    height={2000}
    width={2000}
    dagLevelDistance={150}
    />
    </div>
  );
}
}



export default Playground;
