import React, { Component } from 'react';
import { ForceGraph2D} from 'react-force-graph';
import { drawNode,sentimentToColor,getRadiusFromFavoriteCount} from './helpers/canvasUtils';
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


class TweetGraph extends Component
		{
	constructor(props) {
		super(props);
		this.state = {
			focusedNodeId: null
		}
	}
	nodeCanvasObject = (node, ctx) => {
		if(this.props.tweetObject.id_str){
			drawNode(node,ctx,this.state.focusedNodeId,this.props.tweetObject.id_str)
		}
  }
	getStyle (display){
		if (display){
			return {}
		} else {
			return {display:'none'}
		}
	}
	linkColor = (link) => {
		if(link.source.sentiment){
			let percent = link.source.sentiment*100
			return sentimentToColor(percent,0.5)
		} else {
			return "transparent"
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
handleClick = node => {
          // Aim at node from outside it
          const distance = 40;
          const distRatio = 1 + distance/Math.hypot(node.x, node.y, node.z);
          this.fg.cameraPosition(
            { x: node.x * distRatio, y: node.y * distRatio, z: node.z * distRatio }, // new position
            node, // lookAt ({ x, y, z })
            3000  // ms transition duration
          );
        };

componentDidMount(){
	this.fg.zoom(0.99, 10)
}
render() {
	var radius = 0
	if(this.props.tweetObject){
		radius = getRadiusFromFavoriteCount(this.props.tweetObject.favorite_count)*(3/5)
	}
  return (
		<div style={this.getStyle(this.props.display)}>
		<ForceGraph2D
		ref={el => { this.fg = el; }}
		nodeCanvasObject= {this.nodeCanvasObject}
		graphData={this.props.graphData}
		onNodeHover={this.handleHover}
		nodeLabel={this.label}
		linkDirectionalArrowLength={5}
		linkOpacity	={0.2}
		linkColor	={this.linkColor}
		linkWidth	={5}
		dagMode={'radialin'}
		dagLevelDistance={radius+50}
		/>
		</div>
	);
}
}



export default TweetGraph;
