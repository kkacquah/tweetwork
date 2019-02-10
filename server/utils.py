from GetSentiment import *

def compact_tweet_object(tweetObject):
  cachedTweetDisplayObject = {
    'created_at': "",
    'id_str':tweetObject['id_str'],
    'name':tweetObject['user']['name'],
    'screen_name': tweetObject['user']['screen_name'],
    'profile_image_url': tweetObject['user']['profile_image_url'],
    'verified': tweetObject['user']['verified'],
    'retweet_count': tweetObject['retweet_count'],
    'favorite_count': tweetObject['favorite_count'],
    'sentiment': get_sentiment_of_tweet(get_tweet_text(tweetObject))
  }
  if (tweetObject['place'] is not None):
    cachedTweetDisplayObject['place'] = tweetObject['place']['full_name']
  if ('full_text' in tweetObject):
    cachedTweetDisplayObject['text'] = tweetObject['full_text']
  else:
    cachedTweetDisplayObject['text'] = tweetObject['text']
  return cachedTweetDisplayObject
