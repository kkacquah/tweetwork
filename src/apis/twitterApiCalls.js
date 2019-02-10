import {bearerToken} from "../config"
import {baseUrl} from "../config"
import {exampleTweets} from "./exampleTweets"
import {createTweetDisplayObject} from "../helpers/loadTweetObject"
import axios from 'axios'

export function getTweetsFromUser (screenName,maxId=null) {
  var params = {
    screen_name: screenName,
  }
  if (maxId){
    params["maxId"] = maxId
  }
  return axios({
    method: 'get',
    url: `http://localhost:5000/getTweetsByUser`,
    params: params
  })
  .then ((response) =>{
    return response.data
  })
  .catch((error) => {
    console.log(error);
  });
}
//expects fn() to throw if it failed
//if it runs out of retries, poll() will resolve to an rejected promise, containing the latest error
export function getTweetReplies (screenName,tweetId,numberOfRequests) {
  var params = {
    screen_name: screenName,
    tweetId: tweetId,
    tries: numberOfRequests,
  }
  console.log(params)
  return axios({
    method: 'get',
    url: `http://localhost:5000/getTweetReplySentiment`,
    params: params
  })
  .then ((response) =>{
    console.log("response: ", response)
    return response.data
  })
  .catch((error) => {
    console.log(error)
  });
}

export function requestToken () {
  return axios({
    method: 'get',
    url: `http://localhost:5000/auth/requestToken`,
  })
  .then ((response) =>{
    return response.data.request_token
  })
  .catch((error) => {
    console.log(error)
  });
}
