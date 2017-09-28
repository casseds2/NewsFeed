import constants from '../constants'
import { TurboClient, HTTP } from '../utils'

/*Taken from Turbo Client*/
const getRequest = (endpoint, params, actionType) => {
	return dispatch => HTTP.get(endpoint, params)
		.then(data => {
			if (actionType != null){
				dispatch({
					type: actionType,
					params: params, // can be null
					data: data
				})
			}
			return data
		})
		.catch(err => {
			throw err
		})
}

export default {

	fetchFeeds: (params) => {
		return dispatch => {
			return dispatch(TurboClient.getRequest('feed', params, constants.FEED_RECEIVED))
		}
	},

	createFeed: (params) => {
		return dispatch => {
			return dispatch(TurboClient.postRequest('feed', params, constants.FEED_CREATED))
		}
	},

	selectFeed: (feed) => {
		return{
			type: constants.SELECT_FEED,
			data: feed
		}
	},

	rssLinkSelected: (url) => {
		return{
			type: constants.RSS_LINK_SELECTED,
			data: url
		}
	},

	resetRssLink: (nullifier) => {
		return{
			type: constants.RSS_LINK_RESET,
			data: nullifier
		}
	},

	fetchRssLinkData: (url, params) => {
		return dispatch => {
			//return dispatch(getRequest(url, params, constants.FETCH_RSS_LINK_DATA))
		}
	},

	fetchRssFeed: (url, params) => {
		return dispatch => {
			return dispatch(getRequest(url, params, constants.RSS_FEED_RECEIVED))
		}
	},

	loginUser: (credentials) => {
		return dispatch => {
			return dispatch(TurboClient.login(credentials, constants.LOGIN_USER))
		}
	},

	registerUser: (credentials) => {
		return dispatch => {
			return dispatch(TurboClient.createUser(credentials, constants.REGISTER_USER))
		}
	}

}
