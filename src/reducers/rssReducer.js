import constants from '../constants'

var initial = {
    selectedRssLink: null,
    rssLinkData: null
}

export default (state = initial, action) => {

    let updatedState = Object.assign({}, state)

    switch(action.type){

        case constants.RSS_FEED_RECEIVED:
            //console.log('RSS_FEED_RECEIVED: ' + JSON.stringify(action.data.feed.url))
            updatedState[action.data.feed.url] = action.data.items //RSS Feed URL = RSS Feed Items in map
            return updatedState

        case constants.RSS_LINK_SELECTED:
            //console.log('RSS_LINK_SELECTED: ' + JSON.stringify(action.data))
            let link = action.data
            //link = link.replace(/^http:\/\//i, 'https://') //Will Need to be changed for secure websites
            updatedState['selectedRssLink'] = link
            return updatedState

        case constants.RSS_LINK_RESET:
            //console.log('RSS_LINK_RESET: ' + JSON.stringify(action.data))
            updatedState['selectedRssLink'] = action.data
            updatedState['rssLinkData'] = action.data
            return updatedState

        case constants.FETCH_RSS_LINK_DATA:
            console.log('FETCH_RSS_LINK_DATA: ' + JSON.stringify(action.data))
            updatedState['rssLinkData'] = action.data
            return updatedState

        default:
            return state

    }

}
