function drawPercentage (node, ctx) {
	const label = `${node.percentage.toFixed(0)}%`;
	ctx.font = `8pt arial`;
	const textWidth = ctx.measureText(label).width;
	const bckgDimensions = [textWidth, 16].map(n => n + 16 * 0.2); // some padding
	var textColor
	ctx.textAlign = 'center';
	ctx.textBaseline = 'middle';
	if(node.id == "lowSentiment"){
		textColor=makeStrokeGradient(ctx,0,21,42)
		ctx.fillStyle = textColor
		ctx.fillText("Negative",node.x,node.y+8);
	}else if(node.id == "medSentiment") {
		textColor =makeStrokeGradient(ctx,42,50,58)
		ctx.fillStyle = textColor
		ctx.fillText("Neutral",node.x,node.y+8);
	}else if(node.id == "highSentiment"){
		textColor =makeStrokeGradient(ctx,58,79,100)
		ctx.fillStyle = textColor
		ctx.fillText("Positive",node.x,node.y+8);
	}
	ctx.font = `bold 16pt arial`;
	ctx.fillText(label,node.x,node.y-8);

}
function makeStrokeGradient (ctx,color1,color2,color3)  {
	var gradient = ctx.createLinearGradient(-100, -100, 100, 100);
	gradient.addColorStop("0", sentimentToColor(color1,1));
	gradient.addColorStop("0.5" ,sentimentToColor(color2,1));
	gradient.addColorStop("1.0", sentimentToColor(color3,1));
	return gradient
}

 function showLabel (node, size, ctx, focusedId) {
// 	if (focusedId){
// 		if (focusedId===node.id){
//
// 			ctx.font = "3pt arial";
// 			var lines = getLines(ctx, node.description, 40)
// 			let percent = node.sentiment*100
// 			ctx.fillStyle = sentimentToColor(percent,0.6)
// 			ctx.strokeStyle = sentimentToColor(percent,1)
// 			ctx.lineWidth = 1.5;
// 			ctx.fillRect(node.x-22,node.y+(2*size)-4,44,4*lines.length+6);
// 			ctx.strokeRect(node.x-22,node.y+(2*size)-4,44,4*lines.length+6);
// 			ctx.fillStyle= 'black'
// 			lines.forEach((line,i)=>{
// 				ctx.fillText(line, node.x-20,node.y+(2*size)+(4*i))
// 			});
//
// 		}
// }
}
function nodeColor (node,focusedNodeId) {
	if (focusedNodeId){
		if (focusedNodeId===node.id){
			return "#1DA1F2"
		} else {
			let percent = node.tweetObject.sentiment*100
			return sentimentToColor(percent,1)
		}
	} else {
		let percent = node.tweetObject.sentiment*100
		return sentimentToColor(percent,1)
	}
}

export function sentimentToColor (percent,opacity) {
	let r = percent<50 ? 255 : Math.floor(255-(percent*2-100)*255/100);
	let g = percent>50 ? 255 : Math.floor((percent*2)*255/100);
	return 'rgba('+r+','+g+',0,'+opacity+')';
}
var loadImage = function (node, ctx,size) {
  var img = new Image();
	img.src = node.tweetObject.profile_image_url;
	ctx.drawImage(img, node.x-(size/2), node.y-(size/2),size,size);

}
export function drawNode (node,ctx,centerTweetIdStr,focusedId) {
	if (node.id == "lowSentiment" || node.id == "medSentiment" || node.id == "highSentiment"){
		drawPercentage(node, ctx)
	} else {

		var size = node.tweetObject.favorite_count == 0 ? 3.16 : getRadiusFromFavoriteCount(node.tweetObject.favorite_count);
		var radius = size*(3/5)
		ctx.beginPath();
		ctx.arc(node.x, node.y, radius, 0, 2 * Math.PI, false)


		loadImage(node,ctx,size)
		if(node.id != centerTweetIdStr){
			showLabel (node, size, ctx, focusedId);
		}
		if (node.id == centerTweetIdStr){
			ctx.strokeStyle=makeStrokeGradient(ctx,0,50,100)
		} else {
			ctx.strokeStyle=nodeColor(node,focusedId)
		}
		ctx.lineWidth = radius/2;
		ctx.stroke()
	}
}
export function getRadiusFromFavoriteCount(favoriteCount){
	return Math.sqrt(Math.sqrt(favoriteCount*1000))
}
