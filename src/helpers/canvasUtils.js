function drawPercentage (node, ctx) {
	const label = `${node.percentage.toFixed(0)}%`;
	ctx.font = `bold 16pt helvetica`;
	const textWidth = ctx.measureText(label).width;
	const bckgDimensions = [textWidth, 16].map(n => n + 16 * 0.2); // some padding
	var textColor
	if(node.id == "lowSentiment"){
		textColor=makeStrokeGradient(ctx,0,21,42)
	}else if(node.id == "medSentiment") {
		textColor =makeStrokeGradient(ctx,42,50,58)
	}else if(node.id == "highSentiment"){
		textColor =makeStrokeGradient(ctx,58,79,100)
	}
	ctx.fillStyle = textColor
	ctx.textAlign = 'center';
	ctx.textBaseline = 'middle';
	ctx.fillText(label,node.x,node.y);
}
function makeStrokeGradient (ctx,color1,color2,color3)  {
	var gradient = ctx.createLinearGradient(-100, -100, 100, 100);
	gradient.addColorStop("0", sentimentToColor(color1,1));
	gradient.addColorStop("0.5" ,sentimentToColor(color2,1));
	gradient.addColorStop("1.0", sentimentToColor(color3,1));
	return gradient
}

function showLabel (id, x, y, radius, ctx, description, focusedId) {
	if (focusedId){
		if (focusedId===id){
			ctx.font = "3pt helvetica";
			try {}
			var lines = getLines(ctx, description, 8*radius)
			lines.forEach((line,i)=>{
				ctx.fillText(line, x-4*radius,y+(2+i*2)*radius)
			});
			ctx.rect(x-4*radius,y+2*radius,8*radius,radius)
		}
	}
}

function nodeColor (node,focusedNodeId) {
	if (focusedNodeId){
		if (focusedNodeId===node.id){
			return "#1DA1F2"
		} else {
			let percent = node.sentiment*100
			return sentimentToColor(percent,1)
		}
	} else {
		let percent = node.sentiment*100
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
	img.src = node.image
  ctx.drawImage(img, node.x-(size/2), node.y-(size/2),size,size);
}

export function drawNode (node,ctx,focusedId,centerTweetIdStr) {
	if (node.id == "lowSentiment" || node.id == "medSentiment" || node.id == "highSentiment"){
		drawPercentage(node, ctx)
	} else {
		if (node.id == centerTweetIdStr){
			ctx.strokeStyle=makeStrokeGradient(ctx,0,50,100)
		} else {
			ctx.strokeStyle=nodeColor(node,focusedId)
		}
		var size = node.favorite_count == 0 ? 3.16 : Math.sqrt(Math.sqrt(node.favorite_count*1000));
		var radius = size*(3/5)
		ctx.beginPath();
		ctx.arc(node.x, node.y, radius, 0, 2 * Math.PI, false)
		ctx.lineWidth = radius/2;

		loadImage(node,ctx,size)
		ctx.stroke()
		showLabel (node.id, node.x, node.y, radius, ctx, node.description,focusedId);
		}
	}
}

function getLines(ctx, text, maxWidth) {
    var words = text.split(" ");
    var lines = [];
    var currentLine = words[0];

    for (var i = 1; i < words.length; i++) {
        var word = words[i];
        var width = ctx.measureText(currentLine + " " + word).width;
        if (width < maxWidth) {
            currentLine += " " + word;
        } else {
            lines.push(currentLine);
            currentLine = word;
        }
    }
    lines.push(currentLine);
    return lines;
}
