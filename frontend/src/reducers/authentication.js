import {
    AUTH_LOGIN,
    AUTH_LOGIN_SUCCESS,
    AUTH_LOGIN_FAILURE,
    AUTH_REGISTER,
    AUTH_REGISTER_SUCCESS,
    AUTH_REGISTER_FAILURE,
    AUTH_GET_STATUS,
    AUTH_GET_STATUS_SUCCESS,
    AUTH_GET_STATUS_FAILURE
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
        valid: false,
        isLoggedIn: false,
        currentUser: '',
        currentName: ''
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
                valid: {$set: true},
                isLoggedIn: {$set: true},
                currentUser: {$set: action.id}
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
        
        case AUTH_GET_STATUS:
        return update(state, {
            status: {
                isLoggedIn: {$set: true}
            }
        })

        case AUTH_GET_STATUS_SUCCESS:
        return update(state, {
            status: {
                valid: {$set: true},
                currentUser: {$set: action.id},
                currentName: {$set: action.name}
            }
        })
        case AUTH_GET_STATUS_FAILURE:
        console.log('fail')
        return update(state, {
            status: {
                valid: {$set: false},
                isLoggedIn: {$set: false}
            }
        })

        default:
        return state;
    }
}

export default authentication;