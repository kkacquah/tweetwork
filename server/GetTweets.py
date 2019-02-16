from config import *
from Authenticate import *
import requests

def get_tweets_from_user(screenName,maxId=None):
	params = {
	'screen_name': screenName,
	'count': 45,
	'tweet_mode': 'extended',
	'exclude_replies':True,
	'include_rts':False,
	}
	if (maxId):
		params['max_id'] = maxId
	r = requests.get(baseUrl + 'statuses/user_timeline.json',
		params=params,
		headers= bearerAuthorizationHeader)

	response = r.json()
	if (maxId is not None):
		if(len(response)>1):
			if(response[1]['id_str'] == maxId):
				return []
			else:
				slicedResponse = response[1::]
				return slicedResponse
		else:
			return []
	else:
		return response
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
	try:
		r.raise_for_status()
	except requests.exceptions.HTTPError as err:
		print(err)
	response = r.json()['statuses']
	if(len(response)>1):
		if(response[1]['id_str'] == maxId):
			return []
		else:
			slicedResponse = response[1::]
			return slicedResponse
	else:
		return []
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
def isReplyOrQuote(tweetId,tweet):
	isReply = tweet['in_reply_to_status_id_str'] == tweetId
	isQuote = False
	if(tweet['is_quote_status']):
		isQuote = tweet['quoted_status_id_str'] == tweetId
	return isReply or isQuote
def get_home_timeline(screenName,maxId,access_token):
	endpoint = baseUrl + "statuses/home_timeline.json"
	queryString = '?screen_name=%s&count=%dtweet_mode=extended' % (screenName,10)
	if(maxId):
		queryString = queryString + 'max_id=%s' % (maxId)
	response = make_request(endpoint + queryString,access_token)
	if (maxId is not None):
		if(len(response)>1):
			if(response[1]['id_str'] == maxId):
				return []
			else:
				slicedResponse = response[1::]
				return slicedResponse
		else:
			return []
	else:
		return response
