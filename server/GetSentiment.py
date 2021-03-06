from config import *
import csv
import re
import requests
from textblob import TextBlob

def clean_tweet_text(tweetText):
	return ' '.join(re.sub("(@[A-Za-z0-9]+)|([^0-9A-Za-z \t]) \
									|(\w+:\/\/\S+)", " ", tweetText).split())
def get_sentiment_of_tweet(tweet):
	# data = open(file, 'rb').read()
	# params = {
	# 'appid': sentimentAppId,
	# }
	# r = requests.post('http://www.sentiment140.com/api/bulkClassify',
	# 	data=data,
	# 	headers= bearerAuthorizationHeader)
	# decoded_content = r.content.decode("utf-8", "ignore")
	# print(decoded_content)
	# cr = csv.reader(decoded_content.splitlines(), delimiter=',')
	# return list(cr)
	analysis = TextBlob(clean_tweet_text(tweet))
	return (analysis.sentiment.polarity+1)/2
def get_tweet_text(tweet):
	if('retweeted_status' in tweet.keys()):
		retweeted_status = tweet['retweeted_status']
		#todo: make DRYer
		if('full_text' in retweeted_status):
			return retweeted_status['full_text']
		else:
			return retweeted_status['text']
	else:
		if('full_text' in tweet):
			return tweet['full_text']
		else:
			return tweet['text']
def get_tweet_sentiment_percentages(tweetReplies):
	if (len(tweetReplies) == 0):
		return {}
	total = len(tweetReplies)
	negCount = sum([1 for tweet in tweetReplies if tweet['sentiment']<0.50])
	posCount = sum([1 for tweet in tweetReplies if tweet['sentiment']>0.50])
	neutralCount = total - posCount - negCount
	return {'highSentiment':(float(posCount)/total)*100,
			'medSentiment':(float(neutralCount)/total)*100,
			'lowSentiment':(float(negCount)/total)*100}
