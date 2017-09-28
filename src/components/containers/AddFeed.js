import React, { Component } from 'react'
import { connect } from 'react-redux'
import actions from '../../actions'

class AddFeed extends Component{

    constructor(){
        super()
        this.state = {
            feed: {
                name: '',
                url: ''
            }
        }
    }

    updateFeed(field, event){
        //console.log('updateFeed: ' + field + " == " + event.target.value)
        let feed = Object.assign({}, this.state.feed)
        feed[field] = event.target.value
        this.setState({
            feed: feed
        })
    }

    addFeed(event){
        //event.preventDefault()
        //console.log('addFeed: ' + JSON.stringify(this.state.feed))
        if(!this.state.feed.name == '' && !this.state.feed.url == ''){
            this.props.createFeed(this.state.feed)
            .then(data => {
                //console.log('Feed Created: ' + JSON.stringify(data))
                this.setState({
                    feed: {
                        name: '',
                        url: ''
                    }
                })
            })
            .catch(err => {
                alert('Error: ' + err.message)
            })
        }
        else {
            alert('Details Not Entered!')
        }
    }

    render(){

        return(
            <div>
                <input onChange={this.updateFeed.bind(this, 'name')} value={this.state.feed.name} type="text" name="query" id="query" placeholder="Feed Name" /><br />
                <input onChange={this.updateFeed.bind(this, 'url')} value={this.state.feed.url} type="text" name="query" id="query" placeholder="RSS Feed URL" /><br />
                <button onClick={this.addFeed.bind(this)} type="submit">Add Feed</button>
            </div>
        )
    }

}

const stateToProps = (state) => {
    return{
        feed: state.feed,
    }
}

const dispatchToProps = (dispatch) => {
    return{
        createFeed: (params) => dispatch(actions.createFeed(params))
    }
}

export default connect(stateToProps, dispatchToProps) (AddFeed)
