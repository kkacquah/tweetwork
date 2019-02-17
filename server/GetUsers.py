def search_user(screenName,maxId,access_token):
	endpoint = baseUrl + "users/lookup"
	queryString = '?screen_name=%s' % (screenName)
	response = make_request(endpoint + queryString,access_token)
	return response
