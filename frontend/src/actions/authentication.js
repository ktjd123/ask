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

export function registerRequest(id, pw, name, email){
    return dispatch => {
        dispatch(register())

        return axios.post('/api/auth/register', {id, pw, name, email})
        .then(res => {
            dispatch(registerSuccess())
        }).catch(err => {
            dispatch(registerFailure(err.response.data.code))
        })
    }
}

export function register(){
    return {
        type: AUTH_REGISTER
    }
}

export function registerSuccess(){
    return {
        type: AUTH_REGISTER_SUCCESS
    }
}

export function registerFailure(error){
    return {
        type: AUTH_REGISTER_FAILURE,
        error
    }
}

export function getStatusRequest(){
    return dispatch => {
        dispatch(getStatus())

        return axios.get('/api/auth/getInfo')
        .then((res) => {
            dispatch(getStatusSuccess(res.data.info.id, res.data.info.name))
        })
    }
}

export function getStatus() {
    return {
        type: AUTH_GET_STATUS
    }
}

export function getStatusSuccess(id, name){
    return {
        type: AUTH_GET_STATUS_SUCCESS,
        id,
        name
    }
}

export function getStatusFailure(){
    return {
        type: AUTH_GET_STATUS_FAILURE
    }
}