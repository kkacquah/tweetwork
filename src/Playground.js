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
			const label = `${this.props.sentimentPercentages[id].toFixed(0)}%`;
            ctx.font = `bold 16pt helvetica`;
            const textWidth = ctx.measureText(label).width;
            const bckgDimensions = [textWidth, 16].map(n => n + 16 * 0.2); // some padding
            var textColor
            if(id == "lowSentiment"){
            		textColor=this.makeStrokeGradient(ctx,0,25,50)
            }else if(id == "medSentiment") {
            		textColor =this.makeStrokeGradient(ctx,25,50,75)
            }else if(id == "highSentiment"){
            		textColor =this.makeStrokeGradient(ctx,50,75,100)
            }
            ctx.fillStyle = textColor
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(label,x,y);
	}
  makeStrokeGradient = (ctx,color1,color2,color3) => {
    var gradient = ctx.createLinearGradient(-100, -100, 100, 100);
    gradient.addColorStop("0", this.sentimentToColor(color1,1));
    gradient.addColorStop("0.5" ,this.sentimentToColor(color2,1));
    gradient.addColorStop("1.0", this.sentimentToColor(color3,1));
    return gradient
  }
	nodeCanvasObject = (node, ctx) => {
					if (node.id == "lowSentiment" || node.id == "medSentiment" || node.id == "highSentiment"){
						this.drawPercentage(node.id, node.x, node.y, ctx,30)
					} else {
            if (node.id == this.props.tweetObject.id_str){
              ctx.strokeStyle=this.makeStrokeGradient(ctx,0,50,100)
            } else {
              ctx.strokeStyle=this.nodeColor(node.id)
            }
            var likes = this.props.renderInfo[node.id].num_retweets
            var size = likes == 0 ? 3.16 : Math.sqrt(Math.sqrt(likes*1000));
            var radius = size*(3/5)
            ctx.beginPath();
            ctx.arc(node.x, node.y, radius, 0, 2 * Math.PI, false)
            var img = new Image();
            img.src = this.props.renderInfo[node.id].image
            ctx.lineWidth = radius/2;
            ctx.drawImage(img, node.x-(size/2), node.y-(size/2),size,size); // rectangle;
            ctx.stroke()
            this.showLabel (node.id, node.x, node.y, radius, ctx, node.description);
					}
}
//makes text boxes (empty), and adds the unformatted tweets)
showLabel (id, x, y, radius, ctx, description){
  if (this.state.focusedNodeId){
    if (this.state.focusedNodeId===id){
      ctx.font = "3pt helvetica";
      ctx.fillText(description, x-4*radius,y+2*radius)
      ctx.rect(x-4*radius,y+2*radius,8*radius,+radius)
    }
  }
}

//wrapping text information needs to be done here!


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
console.log(this.props.graphData)
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
