import {
    AUTH_LOGIN,
    AUTH_LOGIN_SUCCESS,
    AUTH_LOGIN_FAILURE
} from './ActionTypes'
import axios from 'axios'

export function loginRequest(id, pw){
    return dispatch => {
        dispatch(login())

        return axios.post('/api/auth/login', {id, pw})
        .then(res => {
            dispatch(loginSuccess(id))
        })
        .catch(err => {
            dispatch(loginFailure())
        })
    }
}

export function login(){
    return {
        type: AUTH_LOGIN
    }
}

export function loginSuccess(id){
    return {
        type: AUTH_LOGIN_SUCCESS
    }
}

export function loginFailure(){
    return {
        type: AUTH_LOGIN_FAILURE
    }
}