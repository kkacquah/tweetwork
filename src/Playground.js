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
			console.log("tweetReplies changed")
			this.makeMyDataNodes(this.props.tweetObject,this.props.tweetReplies)
		}
	}
click = (node) => {
	if (node){

	}}
	nodeCanvasObject = ({ id, x, y }, ctx) => {
  		if (id == "lowSentiment" || id == "medSentiment" || id == "highSentiment"){
						ctx.fillStyle="#000000"
						ctx.beginPath();
						ctx.arc(x, y, 10, 0, 2 * Math.PI, false)
						ctx.fill()
					} else {
            if (id == this.props.tweetObject.id_str){
              console.log("Here")
              console.log(id)
              var gradient = ctx.createLinearGradient(-100, -100, 100, 100);
              gradient.addColorStop("0", this.sentimentToColor(0,1));
              gradient.addColorStop("0.5" ,this.sentimentToColor(50,1));
              gradient.addColorStop("1.0", this.sentimentToColor(100,1));
              ctx.strokeStyle=gradient
            } else {
              ctx.strokeStyle=this.nodeColor(id)
            }
            var likes = this.props.renderInfo[id].num_retweets
            var size = likes == 0 ? 3.16 : Math.sqrt(Math.sqrt(likes*1000));
            var radius = size*(3/5)
            ctx.beginPath();
            ctx.arc(x, y, radius, 0, 2 * Math.PI, false)
            var img = new Image();
            img.src = this.props.renderInfo[id].image
            ctx.lineWidth = radius/2;
            ctx.drawImage(img, x-(size/2), y-(size/2),size,size); // rectangle;
            ctx.stroke();
					}

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
				let percent = this.props.renderInfo[id].sentiment*100
				return this.sentimentToColor(percent,1)
			}
		} else {
			let percent = this.props.renderInfo[id].sentiment*100
			return this.sentimentToColor(percent,1)
		}
	}
	sentimentToColor = (percent,opacity)=> {
		let r = percent<50 ? 255 : Math.floor(255-(percent*2-100)*255/100);
		let g = percent>50 ? 255 : Math.floor((percent*2)*255/100);
		return 'rgba('+r+','+g+',0,'+opacity+')';
	}
	linkColor = (link) => {
		if(this.props.renderInfo[link.source.id]){
			let percent = this.props.renderInfo[link.source.id].sentiment*100
			return this.sentimentToColor(percent,0.5)
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
handleLinkHover = (node,prevNode) => {

}



render() {
	return (
		<div>
		<ForceGraph2D
		nodeCanvasObject={this.nodeCanvasObject}
		graphData={this.props.graphData}
		onNodeHover={this.handleHover}
		onNodeClick={this.click}
		nodeLabel={this.label}
		linkDirectionalArrowLength={5}
		linkOpacity	={0.2}
		linkColor	={this.linkColor}
		linkWidth	={5}
		onLinkHover={this.handleLinkHover}
		dagMode={'radialin'}
		dagLevelDistance={50}
		/>
		</div>
	);
}
}



export default Playground;
