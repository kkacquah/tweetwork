from GetSentiment import *

def compact_tweet_object(tweetObject):
  cachedTweetDisplayObject = {
    'created_at': "",
    'id_str':tweetObject['id_str'],
    'name':tweetObject['user']['name'],
    'screen_name': tweetObject['user']['screen_name'],
    'text': tweetObject['full_text'],
    'profile_image_url': tweetObject['user']['profile_image_url'],
    'verified': tweetObject['user']['verified'],
    'retweet_count': tweetObject['retweet_count'],
    'favorite_count': tweetObject['favorite_count'],
    'sentiment': get_sentiment_of_tweet(get_tweet_text(tweetObject))
  }
  return cachedTweetDisplayObject