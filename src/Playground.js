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
	drawPercentage = (id, x, y, ctx,percentage) => {
			const label = percentage.toFixed(0);
            ctx.font = `12px Sans-Serif`;
            const textWidth = ctx.measureText(label).width;
            const bckgDimensions = [textWidth, fontSize].map(n => n + fontSize * 0.2); // some padding
            ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
            ctx.fillRect(node.x - bckgDimensions[0] / 2, node.y - bckgDimensions[1] / 2, ...bckgDimensions);
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            //ctx.fillStyle = node.color;
            ctx.fillText(label,x,y);
	}
	nodeCanvasObject = ({ id, x, y }, ctx) => {
					if (id == "lowSentiment" || id == "medSentiment" || id == "highSentiment"){
						this.drawPercentage(id, x, y, ctx,30)
					} else {
						var likes = this.state.renderInfo[id].num_retweets
						var size = likes == 0 ? 3.16 : Math.sqrt(Math.sqrt(likes*1000));
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
				let percent = this.state.renderInfo[id].sentiment*100
				return this.sentimentToColor(percent,1)
			}
		} else {
			let percent = this.state.renderInfo[id].sentiment*100
			return this.sentimentToColor(percent,1)
		}
	}
	sentimentToColor = (percent,opacity)=> {
		let r = percent<50 ? 255 : Math.floor(255-(percent*2-100)*255/100);
		let g = percent>50 ? 255 : Math.floor((percent*2)*255/100);
		return 'rgba('+r+','+g+',0,'+opacity+')';
	}
	linkColor = (link) => {
		if(this.state.renderInfo[link.source.id]){
			let percent = this.state.renderInfo[link.source.id].sentiment*100
			return this.sentimentToColor(percent,0.5)
		} else {
			return "#000000"
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

makeMyDataNodes (tweetObject,tweetReplies) {
	console.log("tweetObject: ",tweetObject)
	console.log("tweetReplies: ",tweetReplies)
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
						sentiment:reply.sentiment
					}
					return map;
			}
		const convertReplyToLink = (reply) => {
			return {
				source: reply.id_str,
				target: tweetObject.id_str
			}
		}
		const convertReplyToSeperationLink = (reply) => {
			var sentimentString
			if(reply.sentiment < 0.42){
					sentimentString = "lowSentiment"
			} else if (reply.sentiment >= 0.42 && reply.sentiment < 0.58){
					sentimentString = "medSentiment"
			} else {
					sentimentString = "highSentiment"
			}
			return {
				source: sentimentString,
				target: reply.id_str
			}
		}
		let replyNodes = tweetReplies.map(convertReplyToNode)
		replyNodes = replyNodes.concat([{
			id: tweetObject.id_str,
			name: tweetObject.name,
			val: 13, //Math.sqrt(tweetObject.favorite_count),
			description: tweetObject.full_text,
		},
		{
				id:"highSentiment"
		},
		{
				id:"medSentiment"
		},
		{
				id:"lowSentiment"
		}])
		let replyLinks = tweetReplies.map(convertReplyToLink)
		let seperationLinks = tweetReplies.map(convertReplyToSeperationLink)
		let totalLinks = replyLinks.concat(seperationLinks,[
			{
				source: "lowSentiment",
				target: tweetObject.id_str
			},
			{
				source: "medSentiment",
				target: tweetObject.id_str
			},
			{
				source: "highSentiment",
				target: tweetObject.id_str
			}
			])
		let replyRenderInfo = tweetReplies.reduce(convertReplyToRenderInfo,{})
		replyRenderInfo[tweetObject.id_str] = {
			image:tweetObject.profile_image_url,
			num_retweets:tweetObject.favorite_count,
			sentiment:0.5
		}
		this.setState({
			nodes:replyNodes,
			links:totalLinks,
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
