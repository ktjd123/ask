import {
    AUTH_LOGIN,
    AUTH_LOGIN_SUCCESS,
    AUTH_LOGIN_FAILURE
}from 'actions/ActionTypes';
import update from 'react-addons-update'

const initialState = {
    login: {
        status: 'INIT'
    },
    status: {
        isLoggedIn: false,
        currentUser: ''
    }
}  

function authentication(state = initialState, action){
    switch(action.type){

        case AUTH_LOGIN:
        return update(state, {
            login: {
                status: {$set: 'PENDING'}
            }
        })
        case AUTH_LOGIN_SUCCESS:
        return update(state, {
            login: {
                status: {$set: 'SUCCESS'}
            },
            status: {
                isLoggedIn: {$set: true},
                currentUser: {$set: action.username}
            }
        })
        case AUTH_LOGIN_FAILURE:
        return update(state, {
            login: {
                status: {$set: 'FAILURE'}
            }
        })

        default:
        return state;
    }
}

export default authentication;