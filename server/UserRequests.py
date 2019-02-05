from config import *

def oauth_req(url, key, secret, http_method="GET", post_body=””, http_headers=None):
    consumer = oauth2.Consumer(key=ckey, secret=csecret)
    token = oauth2.Token(key=key, secret=secret)
    client = oauth2.Client(consumer, token)
    resp, content = client.request( url, method=http_method, body=post_body, headers=http_headers )
    return content
