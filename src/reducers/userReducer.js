import constants from '../constants'

var initialState = {
    currentUser: null
}

export default(state = initialState, action) => {

    let newState = Object.assign({}, state)
    switch(action.type){

        case constants.LOGIN_USER:
            //console.log('LOGIN_USER: ' + JSON.stringify(action.data))
            newState['currentUser'] = action.data
            return newState

        case constants.REGISTER_USER:
            //console.log('REGISTER_USER: ' + JSON.stringify(action.data))
            newState['currentUser'] = action.data
            return newState

        default:
                return state
    }
}
