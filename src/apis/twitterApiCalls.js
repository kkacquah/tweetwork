import {bearerToken} from "../config"
import {baseUrl} from "../config"
import {exampleTweets} from "./exampleTweets"
import {createTweetDisplayObject} from "../helpers/loadTweetObject"
import axios from 'axios'

export function getTweetsFromUser (screenName,maxId=null) {
  var params = {
    screen_name: screenName,
    count: 11,
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
    if(response.data[1].id_str == maxId){
      return null
    } else {
      return response.data.slice(1,11)
    }
  })
  .catch((error) => {
    console.log(error);
  });
}
//expects fn() to throw if it failed
//if it runs out of retries, poll() will resolve to an rejected promise, containing the latest error
export function getTweetReplies (screenName,tweetId,maxId) {
  var params = {
    q: "to:"+screenName,
    since_id: tweetId,
    count: 100,
    result_type:'recent'
  }
  if (maxId){
    params.max_id = maxId
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
  .then ((response) =>{
    console.log("response: ", response)
    if(response.data.statuses[1].id_str == maxId){
      return []
    } else {
      return response.data.statuses.slice(1)
    }
  })
  .then((response) => {
    return response.filter(tweet=>(tweet.in_reply_to_status_id_str === tweetId))
  })
  .catch((error) => {
    console.log(error)
  });
}
