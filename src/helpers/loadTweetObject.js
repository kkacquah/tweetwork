import * as moment from 'moment';

export function createCachedTweetObject(tweetObject){
  var tweetDisplayObject = {
    createdAt: moment(tweetObject.createdAt, 'en'),
    name:tweetObject.user.name,
    screenName: tweetObject.user.screenName,
    text: tweetObject.text,
    profileImageUrl: tweetObject.user.profileImageUrl
  };
  return tweetDisplayObject;
}
function createTweetObjectForDisplay(tweetObject){
  return null;
}


function timeSince(date) {

  var seconds = Math.floor((new Date() - date) / 1000);

  var interval = Math.floor(seconds / 31536000);

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
