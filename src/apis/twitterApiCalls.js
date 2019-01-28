import {bearerToken} from "../config"
import {baseUrl} from "../config"
import {exampleTweets} from "./exampleTweets"
import {createTweetDisplayObject} from "../helpers/loadTweetObject"
import axios from 'axios'

export function getTweetsFromUser (screenName,maxId=null) {
  var params = {
    screen_name: screenName,
    count: 10,
    tweet_mode: 'extended'
  }
  if (maxId){
    params.max_id = maxId
  }
  return axios({
    method: 'get',
    baseURL: baseUrl,
    url: baseUrl + 'statuses/user_timeline.json',
    params: params,
    headers: {
      Authorization: bearerToken
    }
  })
  .then((response) => {
    console.log(response);
    return response.data
  })
  .catch((error) => {
    console.log(error);
    return createTweetDisplayObject(exampleTweets)
  });
}
export function getTweetReplies (screenName,tweetId) {
  var params = {
    q: "to:"+ screenName,
    since_id:tweetId
  }
  return axios({
    method: 'get',
    baseURL: baseUrl,
    url: baseUrl + 'search/tweets.json',
    params: params,
    headers: {
      Authorization: bearerToken
    }
  })
  .then((response) => {
    console.log(tweetId)
    console.log(response.data.statuses.map((tweet) => tweet.in_reply_to_status_id_str))

    return response.data.statuses.filter(tweet=>(tweet.in_reply_to_status_id_str ===tweetId))
  })
  .catch((error) => {
    console.log(error);
    return createTweetDisplayObject(exampleTweets)
  });
}
