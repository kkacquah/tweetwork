import {bearerToken} from "../config"
import {baseUrl} from "../config"
import {exampleTweets} from "./exampleTweets"
import {createTweetDisplayObject} from "../helpers/loadTweetObject"
import axios from 'axios'

export function getTweetsFromUser (screenName) {
  return axios({
    method: 'get',
    baseURL: baseUrl,
    url: baseUrl + 'statuses/user_timeline.json',
    params: {
      screen_name: screenName,
      count: 10,
      tweet_mode: 'extended'
    },
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
