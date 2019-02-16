from urllib.parse import parse_qsl
import oauth2 as oauth
from config import *
import json

# TODO: Add OAuth Callback
request_token_url = 'https://api.twitter.com/oauth/request_token'
access_token_url = 'https://api.twitter.com/oauth/access_token'
authorize_url = 'https://api.twitter.com/oauth/authorize'

consumer = oauth.Consumer(ckey, csecret)
client = oauth.Client(consumer)

def request_OAuth_token():
    # Step 1: Get a request token. This is a temporary token that is used for
    # having the user authorize an access token and to sign the request to obtain
    # said access token.

    resp, content = client.request(request_token_url, "GET")
    if resp['status'] != '200':
        raise Exception("Invalid response %s." % resp['status'])

    request_token_encoded = dict(parse_qsl(content))
    request_token = dict()
    for (key,value) in request_token_encoded.items():
        request_token[key.decode()] = value.decode()
    return  request_token['oauth_token'],request_token['oauth_token_secret']
# After the user has granted access to you, the consumer, the provider will
# redirect you to whatever URL you have told them to redirect to. You can
# usually define this in the oauth_callback argument as well.

# Step 3: Once the consumer has redirected the user back to the oauth_callback
# URL you can request the access token the user has approved. You use the
# request token to sign this request. After this is done you throw away the
# request token and use the access token returned. You should store this
# access token somewhere safe, like a database, for future use.
def loginWithPin(oauth_verifier,request_token,request_token_secret):
    token = oauth.Token(request_token,
        request_token_secret)
    token.set_verifier(oauth_verifier)
    client = oauth.Client(consumer, token)

    resp, content = client.request(access_token_url, "POST")
    print("loginWithPin response")
    access_token_encoded = dict(parse_qsl(content))

    access_token = dict()
    for (key,value) in access_token_encoded.items():
        access_token[key.decode()] = value.decode()
    return oauth.Token(access_token['oauth_token'],access_token['oauth_token_secret']),access_token['screen_name']
def make_request(endpoint,access_token):
    client = oauth.Client(consumer, token=access_token)
    resp, content = client.request(endpoint)
    print(json.loads(content.decode()))
    return json.loads(content.decode())
