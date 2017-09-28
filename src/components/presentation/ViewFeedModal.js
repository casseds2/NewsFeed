import React, { Component } from 'react'
import { connect } from 'react-redux'
import actions from '../../actions'
import Modal from 'react-modal'

const styles = {
    overlay: {
        position          : 'fixed',
        top               : "50px",
        left              : "500px",
        right             : "100px",
        bottom            : "100px",
        backgroundColor   : 'rgba(2, 255, 255, 0.75)'
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

class ViewFeedModal extends Component{

    constructor(){
        super()
        this.state = {
            modalIsOpen: true,
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
        //this.subtitle.style.color = '#f00';
        // this.props.fetchRssLinkData(this.props.rss.selectedRssLink, null)
        // .then(data => {
        //     console.log('data' + JSON.stringify(data))
        // })
        // .catch(err => {
        //     alert('Error: ' + err.message)
        //     return
        // })
    }

    closeModal(){
        console.log('closeModal: ')
        this.setState({
            modalIsOpen: false
        });
        this.props.resetRssLink(null)
    }

    render(){

        return(

            <div>
                <Modal
                style={{ overlay: {top: 50, left: 525, right: 525,}, content: styles.content }}
                isOpen={this.state.modalIsOpen}
                onAfterOpen={this.afterOpenModal}
                onRequestClose={this.closeModal}
                shouldCloseOnOverlayClick={true}
                contentLabel="Rss Modal"
                >
                    <iframe width="450px" height="600px" src={this.props.rss.selectedRssLink}></iframe>
                </Modal>
            </div>
        )
    }
}

const stateToProps = (state) => {
    return{
        rss: state.rss
    }
}

const dispatchToProps = (dispatch) => {
    return{
        resetRssLink: (nullifier) => dispatch(actions.resetRssLink(nullifier)),
        fetchRssLinkData: (url) => dispatch(actions.fetchRssLinkData(url))
    }
}

export default connect(stateToProps, dispatchToProps) (ViewFeedModal)
