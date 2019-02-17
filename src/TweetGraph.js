import React, { Component } from 'react';
import { ForceGraph2D} from 'react-force-graph';
import { drawNode,sentimentToColor,getRadiusFromFavoriteCount} from './helpers/canvasUtils';
import DisplayTweet from "./DisplayTweet"
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
			focusedNodeId: null,
			displayedTweet: null
		}
	}
	nodeCanvasObject = (node, ctx) => {
		if(this.props.tweetObject.id_str){
			if(this.state.displayedTweet){
				drawNode(node,ctx,this.props.tweetObject.id_str,this.state.displayedTweet.id_str)
			} else {
				drawNode(node,ctx,this.props.tweetObject.id_str)
			}

		}
  }
	getStyle (display){
		if (display){
			return {backgroundColor:'transparent'}
		} else {
			return {display:'none',backgroundColor:'transparent'}
		}
	}
	linkColor = (link) => {
		if(link.source.tweetObject){
			let percent = link.source.tweetObject.sentiment*100
			return sentimentToColor(percent,0.5)
		} else {
			return "transparent"
		}
	}

	handleHover = (node,prevNode) => {
		if (node){
			this.hoverTweet(node.tweetObject)
		}
		if (prevNode){
			if (prevNode.id === this.state.focusedNodeId){
				this.hoverTweet(null)
		}
	}
}
hoverTweet = (value) => {
	this.setState({
		displayedTweet: value
	})
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
		<div>
		{this.state.displayedTweet ?
		<DisplayTweet displayedTweet={this.state.displayedTweet}/>
		: null }
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
		</div>
	);
}
}



export default TweetGraph;
