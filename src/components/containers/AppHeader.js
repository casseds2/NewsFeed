import React, { Component } from 'react'
import { Login } from '../containers'
import { connect } from 'react-redux'

class AppHeader extends Component {

	loginRegister(event){
		console.log('loginRegister: ')
	}

	render(){
		let content = null
		if(this.props.user.currentUser == null){
			content = <Login />
		}
		else
			content = <h2>{this.props.user.currentUser.username}</h2>

		return (
			<div>
	            <header id="header">
	                <a href="index.html" className="logo"><strong>NewsFeed</strong></a>
	                <ul className="icons">
		                <li><a href="#" className="icon fa-facebook"><span className="label">Facebook</span></a></li>
		                <li><a href="#" className="icon fa-snapchat-ghost"><span className="label">Snapchat</span></a></li>
		                <li><a href="#" className="icon fa-instagram"><span className="label">Instagram</span></a></li>
		                <li><a href="#" className="icon fa-medium"><span className="label">Medium</span></a></li>
						<li>{content}</li>
	                </ul>
	            </header>
			</div>
	    )
	}
}

const stateToProps = (state) => {
    return{
        user: state.user
    }
}

const dispatchToProps = (dispatch) => {
    return{
    }
}

export default connect(stateToProps, dispatchToProps)(AppHeader)
