from GetTweets import *
from GetUsers import *
from utils import *
from Authenticate import *
from flask import Flask
from flask import jsonify
from flask import request, Response
import sqlite3

conn = sqlite3.connect('Session.db')

#cors added to allow for access on chrome
app = Flask(__name__)
Session = dict() #mapping of requestTokens to requestTokenSecrets and AccessTokenPair
@app.route("/getTweetsByUser")
def getTweetsByUser():
	user = request.args.get('screen_name')
	tweets = get_tweets_from_user(user)
	tweetsCompact = [compact_tweet_object(tweet) for tweet in tweets]
	response = jsonify(tweetsCompact)
	response.headers.add('Access-Control-Allow-Origin', '*')
	return response
@app.route("/getHomeTimeline")
def getHomeTimeline():
	OAuthToken = request.args.get('request_token')
	screen_name = request.args.get('screen_name')
	max_id = request.args.get('max_id')
	if OAuthToken in Session:
		SessionObject = Session[OAuthToken]
		tweets = get_home_timeline(screen_name,max_id,SessionObject['access_token'])
		tweetsCompact = [compact_tweet_object(tweet) for tweet in tweets]
		response = jsonify(tweetsCompact)
		response.headers.add('Access-Control-Allow-Origin', '*')
		return response
	else:
		response = Response(
	    'Could not verify your access level for that URL.\n'
	    'You have to login with proper credentials', 401)
		response.headers.add('Access-Control-Allow-Origin', '*')
		return response
@app.route("/getTweetReplySentiment")
def getTweetReplySentiment():
	user = request.args.get('screen_name')
	tweetId = request.args.get('tweetId')
	tries = int(request.args.get('tries'))
	tweetReplies = collect_tweet_replies(user,tweetId,tries)
	tweetRepliesCompact = [compact_tweet_object(tweet) for tweet in tweetReplies]
	sentimentPercentages = get_tweet_sentiment_percentages(tweetRepliesCompact)
	response = {'replies':tweetRepliesCompact,'percentages':sentimentPercentages}
	response = jsonify(response)
	response.headers.add('Access-Control-Allow-Origin', '*')
	return response
@app.route("/searchUser")
def get_users():
	screen_name = request.args.get('screen_name')
	OAuthToken = request.args.get('requestToken')
	response = search_user(screen_name,requestToken)
	if OAuthToken in Session:
		SessionObject = Session[OAuthToken]
		response = search_users(screen_name,SessionObject['access_token'])
		response = jsonify(response)
		response.headers.add('Access-Control-Allow-Origin', '*')
		return response
	else:
		response = Response(
	    'Could not verify your access level for that URL.\n'
	    'You have to login with proper credentials', 401)
		response.headers.add('Access-Control-Allow-Origin', '*')
		return response
@app.route("/auth/requestToken")
def requestToken():
	request_token, request_token_secret = request_OAuth_token()
	Session[request_token] = {'request_token_secret':request_token_secret}
	response = {"request_token":request_token}
	response = jsonify(response)
	response.headers.add('Access-Control-Allow-Origin', '*')
	return response
@app.route("/auth/login")
def login():
	oauth_verifier = request.args.get('pin')
	request_token = request.args.get('request_token')
	if request_token in Session:
		sessionObject = Session[request_token]

		access_token,screen_name = loginWithPin(oauth_verifier,request_token,sessionObject['request_token_secret'])
		if(access_token is not None):
			sessionObject['access_token'] = access_token
			response = {"screen_name":screen_name}
			response =  jsonify(response)
		else:
			response =  Response(
			'Incorrect Pin', 400)
	else:
		response =  Response(
		'No such user exists with these creditials', 401)
	response.headers.add('Access-Control-Allow-Origin', '*')
	return response
if __name__ == "__main__":
	app.run(debug=True)
