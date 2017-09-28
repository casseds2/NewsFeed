import React, { Component } from 'react'
import { connect } from 'react-redux'
import actions from '../../actions'
import { ViewFeedModal } from '../presentation'

class Feed extends Component{

    rssLinkSelected(rssFeedURL, event){
        event.preventDefault()
        console.log('rssLinkSelected: ' + rssFeedURL)
        this.props.rssLinkSelected(rssFeedURL)
    }

    render(){

        const selectedFeed = this.props.feed.selected
        let name = 'Welcome To NewsFeed'
        let headFooter = 'Bringing You What You Want'
        let items = []
        if(selectedFeed){
            name = selectedFeed.name
            items = (this.props.rss[selectedFeed.url]) ? this.props.rss[selectedFeed.url] : []
            headFooter = 'Best of ' + name
        }

        let content = null
        if(this.props.rss.selectedRssLink == null){
            content =
            <div>
                <header>
                    <h1>{name}</h1>
                    <p>{headFooter}</p>
                    <hr />
                </header>

                <ol>

                    {
                        items.map((item, i) => {
                            return(
                                <li style={style.listItem} key={i}>
                                    <a onClick={this.rssLinkSelected.bind(this, item.link)} style={style.link} target='_blank' href={item.link}>{item.title}</a>
                                </li>
                            )
                        })
                    }

                </ol>
            </div>
        }

        else {
            content = <ViewFeedModal />
        }

        return(
            <div>

                {content}

            </div>
        )
    }
}

const style = {
    link: {
        border: 'none',
        color: 'blue',
    },

    listItem: {
        fontWeight:'bold',
        marginBottom: 10
    }
}

const stateToProps = (state) => {
    return{
        feed: state.feed,
        rss: state.rss
    }
}

const dispatchToProps = (dispatch) => {
    return{
        rssLinkSelected: (url) => dispatch(actions.rssLinkSelected(url))
    }
}

export default connect(stateToProps, dispatchToProps)(Feed)
