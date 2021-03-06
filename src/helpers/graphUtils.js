export function getNodesAndLinks (tweetObject,tweetReplies,sentimentPercentages) {
    const convertReplyToNode = (reply) => {
  			return {
  				id: reply.id_str,
          tweetObject:reply
  			}
  		}
     const convertReplyToLink = (reply) => {
  			return {
  				source: reply.id_str,
  				target: tweetObject.id_str
  			}
  		}
  		const convertReplyToSeperationLink = (reply) => {
  			var sentimentString
  			if(reply.sentiment < 0.50){
  					sentimentString = "lowSentiment"
  			} else if (reply.sentiment ==0.50){
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
  		replyNodes.push({
  			id: tweetObject.id_str,
        tweetObject:tweetObject
  		})
      if (sentimentPercentages.lowSentiment || sentimentPercentages.medSentiment || sentimentPercentages.highSentiment){
        replyNodes = replyNodes.concat([
    		{
    				id:"lowSentiment",
            percentage:sentimentPercentages.lowSentiment
    		},
    		{
            id:"medSentiment",
            percentage:sentimentPercentages.medSentiment
    		},
    		{
            id:"highSentiment",
            percentage:sentimentPercentages.highSentiment
    		}])
      }
  		let replyLinks = tweetReplies.map(convertReplyToLink)
  		let seperationLinks = tweetReplies.map(convertReplyToSeperationLink)
      return {nodes: replyNodes, links:replyLinks.concat(seperationLinks)}
}
