import {bearerToken} from "../config"
import {baseUrl} from "../config"
import {exampleTweets} from "./exampleTweets"
import {createTweetDisplayObject} from "../helpers/loadTweetObject"
import axios from 'axios'

export function getTweetsFromUser(screenName,maxId=null,tab,requestToken) {
  var params = {
    screen_name: screenName,
  }
  if (maxId){
    params["maxId"] = maxId
  }
  if (requestToken){
    params["request_token"] = requestToken
  }
  if(tab == "home"){
    return axios({
      method: 'get',
      url: `http://localhost:5000/getHomeTimeline`,
      params: params
    })
    .then ((response) =>{
      console.log(response)
      return response.data
    })
    .catch((error) => {
      console.log(error);
    });
  } else {
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
}
//expects fn() to throw if it failed
//if it runs out of retries, poll() will resolve to an rejected promise, containing the latest error
export function getTweetReplies (screenName,tweetId,numberOfRequests) {
  var params = {
    screen_name: screenName,
    tweetId: tweetId,
    tries: numberOfRequests,
  }
  return axios({
    method: 'get',
    url: `http://localhost:5000/getTweetReplySentiment`,
    params: params
  })
  .then ((response) =>{
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

export function login (pin,token) {
  var params = {
    pin: pin,
    request_token: token,
  }
  return axios({
    method: 'get',
    url: `http://localhost:5000/auth/login`,
    params: params
  })
  .then ((response) =>{
    return response.data.screen_name
  })
}
