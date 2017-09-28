import React, { Component }  from 'react'
import actions from '../../actions'
import { connect } from 'react-redux'
import Modal from 'react-modal'

const styles = {
    overlay: {
        position          : 'fixed',
        top               : 50,
        left              : 525,
        right             : 525,
        bottom            : 100,
        backgroundColor   : 'rgba(255, 255, 255, 0.75)'
    },
    content: {
        position                   : 'absolute',
        top                        : '40px',
        left                       : '40px',
        right                      : '40px',
        bottom                     : '200px',
        border                     : '5px solid #DCE6EE',
        background                 : '#fff',
        overflow                   : 'auto',
        WebkitOverflowScrolling    : 'touch',
        borderRadius               : '10px',
        outline                    : 'none',
        padding                    : '20px'
    }
}

class Login extends Component{

    constructor(){
        super()
        this.state = {
            credentials: {
                username: '',
                password: ''
            },
            modalIsOpen: false
        }
        this.openModal = this.openModal.bind(this);
        this.afterOpenModal = this.afterOpenModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    openModal(){
        console.log('openModal: ')
        this.setState({
            modalIsOpen: true
        });
    }

    afterOpenModal(){
        console.log('afterOpenModal')
        this.subtitle.style.color = '#f00';
    }

    closeModal(){
        console.log('closeModal: ')
        this.setState({
            modalIsOpen: false
        });
    }

    updateCredentials(field, event){
        console.log('updateCredentials: ' + field + " == " + event.target.value)
        let credentials = Object.assign({}, this.state.credentials)
        credentials[field] = event.target.value
        this.setState({
            credentials: credentials
        })
    }

    login(event){
        event.preventDefault()
        console.log('login: ' + JSON.stringify(this.state.credentials))
        if(this.state.credentials.username.length == 0){
            alert('Enter A Username')
            return
        }
        if(this.state.credentials.password.length == 0){
            alert('Enter Your Password')
            return
        }
        const credentials = Object.assign({}, this.state.credentials)
        this.props.loginUser(credentials)
        .then(data => {
            //console.log('loginUser: ' + JSON.stringify(data.username))
        })
        .catch(err => {
            alert('Error: ' + err.message)
            return
        })
    }

    register(event){
        event.preventDefault()
        console.log('register: ' + JSON.stringify(this.state.credentials))
        if(this.state.credentials.username.length == 0){
            alert('Enter A Username')
            return
        }
        if(this.state.credentials.password.length == 0){
            alert('Enter Your Password')
            return
        }
        const credentials = Object.assign({}, this.state.credentials)
        console.log('stateAtRegister: ' + JSON.stringify(credentials))
        this.props.registerUser(credentials)
        .then(data => {
            //console.log('register: ' + JSON.stringify(data.username))
        })
        .catch(err => {
            alert('Error: ' + err.message)
            return
        })
    }

    render(){
        return(
            <div>
                <button style={styles.loginButton} onClick={this.openModal}>Login/Register</button>
                <Modal
                style={{ overlay: {top: 50, left: 525, right: 525,}, content: styles.content }}
                isOpen={this.state.modalIsOpen}
                onAfterOpen={this.afterOpenModal}
                onRequestClose={this.closeModal}
                shouldCloseOnOverlayClick={true}
                contentLabel="Account Modal"
                >
                    <h2 ref={subtitle => this.subtitle = subtitle}>Login/Register</h2>
                    <form>
                        <input onChange={this.updateCredentials.bind(this, 'username')} value={this.state.credentials.username} type="text" name="query" id="query" placeholder="Username" /><br />
                        <input onChange={this.updateCredentials.bind(this, 'password')} value={this.state.credentials.password} type="password" name="query" id="query" placeholder="Password" /><br />
                        <button onClick={this.login.bind(this)} type="submit">Login</button>
                        <button onClick={this.register.bind(this)} type="submit">Register</button>
                    </form>
                </Modal>
            </div>
        )
    }

}

const stateToProps = (state) => {
	return {
		user: state.user
	}
}

const dispatchToProps = (dispatch) => {
	return {
		loginUser: (credentials) => dispatch(actions.loginUser(credentials)),
        registerUser: (credentials) => dispatch(actions.registerUser(credentials))
	}
}

export default connect(stateToProps, dispatchToProps) (Login)
