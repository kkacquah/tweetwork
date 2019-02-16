from GetSentiment import *
from datetime import datetime
#TODO: handle quotes and retweets on backend and UI
def compact_tweet_object(tweetObject):
  cachedTweetDisplayObject = {
  #name, name of tweeter/retweeter
  #origin name, name of tweeter/retweeter
    'time_since': get_time_since(tweetObject["created_at"]),
    'id_str':tweetObject['id_str'],
    'name':tweetObject['user']['name'],
    'screen_name': tweetObject['user']['screen_name'],
    'profile_image_url': tweetObject['user']['profile_image_url'],
    'verified': tweetObject['user']['verified'],
    'retweet_count': tweetObject['retweet_count'],
    'favorite_count': tweetObject['favorite_count'],
    'sentiment': get_sentiment_of_tweet(get_tweet_text(tweetObject))
  }
  #Idea: make screen name of the actual tweet passted into the tweet object for easy look up
  #Then change search functionality on front end to call based on the screen_name of the tweet
  if ('retweeted_status' in cachedTweetDisplayObject):
      cachedTweetDisplayObject['retweeted_status'] = cachedTweetDisplayObject['retweeted_status']
  else:
      #generalizes functionality for tweet window and tweet graph
      if ('full_text' in tweetObject):
        cachedTweetDisplayObject['text'] = tweetObject['full_text']
      else:
        cachedTweetDisplayObject['text'] = tweetObject['text']
  if (tweetObject['place'] is not None):
    cachedTweetDisplayObject['place'] = tweetObject['place']['full_name']
  return cachedTweetDisplayObject

def get_time_since(created_at):
    d1 = datetime.strptime(created_at,'%a %b %d %H:%M:%S +0000 %Y')
    d2 = datetime.now()
    return 'Posted %d minutes ago' % ((d2-d1).seconds/60 - (1140)) #get minutes
