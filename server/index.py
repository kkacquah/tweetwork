from GetTweets import *
from utils import *
from flask import Flask
from flask import request
from flask import jsonify


app = Flask(__name__)
@app.route("/getTweetsByUser")
def getTweetsByUser():
	user = request.args.get('screen_name')
	count = request.args.get('count')
	return str(getTweetsFromUser(user))
@app.route("/getTweetReplySentiment")
def getTweetReplySentiment():
	user = request.args.get('screen_name')
	tweetId = request.args.get('tweetId')
	tries = int(request.args.get('tries'))
	tweetReplies = collect_tweet_replies(user,tweetId,tries)
	tweetRepliesCompact = [compact_tweet_object(tweet) for tweet in tweetReplies]
	sentimentPercentages = get_tweet_sentiment_percentages(tweetRepliesCompact)
	response = {'replies':tweetRepliesCompact,'percentages':sentimentPercentages}
	return jsonify(response)
# @app.route("/auth/request_token")
# def requestOAuthToken():
# 	return ""
# @app.route("/auth/login")
# def login():
# 	return ""
if __name__ == "__main__":
	app.run(debug=True)
