import {
    AUTH_LOGIN,
    AUTH_LOGIN_SUCCESS,
    AUTH_LOGIN_FAILURE,
    AUTH_REGISTER,
    AUTH_REGISTER_SUCCESS,
    AUTH_REGISTER_FAILURE
}from 'actions/ActionTypes';
import update from 'react-addons-update'

const initialState = {
    login: {
        status: 'INIT'
    },
    register: {
        status: 'INIT',
        error: -1
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
        case AUTH_REGISTER:
        return update(state, {
            register: {
                status: {$set: 'PENDING'}
            }
        })

        case AUTH_REGISTER_SUCCESS:
        return update(state, {
            register: {
                status: {$set: 'SUCCESS'}
            }
        })

        case AUTH_REGISTER_FAILURE:
        return update(state, {
            register: {
                status: {$set: 'FAILURE'},
                error: {$set: action.error}
            }
        })

        default:
        return state;
    }
}

export default authentication;