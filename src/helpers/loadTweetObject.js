import * as moment from 'moment';

export function createCachedTweetObject(tweetObject){
  var cachedTweetDisplayObject = {
    created_at: moment(tweetObject.created_at, 'ddd MMM DD HH:mm:ss ZZ YYYY'),
    id_str:(tweetObject.id-1).toString(),
    name:tweetObject.user.name,
    screen_name: tweetObject.user.screen_name,
    text: tweetObject.full_text,
    profile_image_url: tweetObject.user.profile_image_url,
    verified: tweetObject.user.verified
  };
  return cachedTweetDisplayObject;
}
export function createTweetDisplayObject(tweetObject){
  var cachedTweetDisplayObject = createCachedTweetObject(tweetObject);
  var tweetDisplayObject = {
    time_since: timeSince(cachedTweetDisplayObject.created_at),
    id_str:cachedTweetDisplayObject.id_str,
    name:cachedTweetDisplayObject.name,
    screen_name: cachedTweetDisplayObject.screen_name,
    text: cachedTweetDisplayObject.text,
    profile_image_url: cachedTweetDisplayObject.profile_image_url,
    verified: cachedTweetDisplayObject.verified
  };
  return tweetDisplayObject;
}


function timeSince(dateMoment) {
  var seconds = Math.floor((moment() - dateMoment)/1000);

  var interval = Math.floor(seconds / 15768000);

  if (interval > 1) {
    return interval + " years";
  }
  interval = Math.floor(seconds / 2592000);
  if (interval > 1) {
    return interval + " months";
  }
  interval = Math.floor(seconds / 86400);
  if (interval > 1) {
    return interval + " days";
  }
  interval = Math.floor(seconds / 3600);
  if (interval > 1) {
    return interval + " hours";
  }
  interval = Math.floor(seconds / 60);
  if (interval > 1) {
    return interval + " minutes";
  }
  return Math.floor(seconds) + " seconds";
};
