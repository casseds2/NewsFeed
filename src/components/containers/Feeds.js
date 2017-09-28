import React, { Component } from 'react'
import { connect } from 'react-redux'
import actions from '../../actions'

class Feeds extends Component{

    componentDidMount(){
        //console.log('componentDidMount: ')
        this.props.fetchFeeds(null)
        .then(data => {
            //console.log('Feeds Fetched: ' + JSON.stringify(data))
        })
        .catch(err => {
            alert('Error: ' + err.message)
        })
    }

    selectFeed(feed, event){
        //console.log('selectFeed: ' + JSON.stringify(feed))
        this.props.selectFeed(feed)
        const items = this.props.rss[feed.url]
        if(items != null){
            console.log('Already Have This Data!')
            //console.log(JSON.stringify(items))
            return
        }
        const rssToJSON = 'https://api.rss2json.com/v1/api.json'
        const params = {
            rss_url: feed.url
        }
        this.props.fetchRssFeed(rssToJSON, params)
        .then(data => {
            //console.log('RSS as JSON: ' + JSON.stringify(data))
        })
        .catch(err => {
            alert('Error: ' + err.message)
        })
    }

    render(){

        const feeds = this.props.feed.all || []

        return(
            <div>
                <ul>
                    {
                        feeds.map((feed, i) => {

                            const color = (feed == this.props.feed.selected) ? 'red' : '#333'

                            return(
                                <li key={feed.id}>
                                    <a style={{color: color}} onClick={this.selectFeed.bind(this, feed)} href="/#">{feed.name}</a>
                                    <hr />
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
        )
    }
}

const stateToProps = (state) => {
    return{
        feed: state.feed,
        rss: state.rss,
        user: state.user
    }
}

const dispatchToProps = (dispatch) => {
    return{
        fetchFeeds: (params) => dispatch(actions.fetchFeeds(params)),
        selectFeed: (feed) => dispatch(actions.selectFeed(feed)),
        fetchRssFeed: (url, params) => dispatch(actions.fetchRssFeed(url, params))
    }
}

export default connect(stateToProps, dispatchToProps)(Feeds)
