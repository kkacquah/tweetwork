from config import *
import requests

def get_tweets_from_user(screenName,maxId=None):
	params = {
	'screen_name': screenName,
	'count': 11,
	'tweet_mode': 'extended'
	}
	if (maxId):
		params['max_id'] = maxId
	r = requests.get(baseUrl + 'statuses/user_timeline.json',
		params=params,
		headers= bearerAuthorizationHeader)
	return r.json()
def get_tweet_replies(screenName,tweetId,maxId=None):
	params = {
	'q': 'to:'+screenName,
	'since_id': tweetId,
	'count': 100,
	'tweet_mode': 'extended',
	'result_type':'recent'
	}
	if (maxId):
		params['max_id'] = maxId
	r = requests.get(baseUrl + 'search/tweets.json',
		params=params,
		headers= bearerAuthorizationHeader)

	response = r.json()['statuses']
	print(response)
	if(response[1]['id_str'] == maxId):
		return []
	else:
		slicedResponse = response[1::]
		return list(filter(lambda tweet: tweet['in_reply_to_status_id_str'] == tweetId, slicedResponse))
def collect_tweet_replies(screenName,tweetId,tries=10,maxId=None):
	if tries == 0:
		return []
	else:
		requestReplies = get_tweet_replies(screenName,tweetId,maxId)
		if(len(requestReplies) == 0):
			return collect_tweet_replies(screenName,tweetId,tries-1,maxId)
		else:
			maxId = requestReplies[len(requestReplies) - 1]['id_str']
			recursiveReplies = collect_tweet_replies(screenName,tweetId,tries-1,maxId)
			totalReplies = requestReplies + recursiveReplies
			return totalReplies
