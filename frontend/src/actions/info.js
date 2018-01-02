import {
    GET_INFO,
    GET_INFO_SUCCESS,
    GET_INFO_FAILURE
} from './ActionTypes'
import axios from 'axios'

export function getInfoRequest(id){
    return dispatch => {
        dispatch(getInfo)
        return axios.post('/api/info/', {id}).then((res) => {
            dispatch(getInfoSuccess(res.data.user))
        }).catch(err => {
            dispatch(getInfoFailure())
        })
    }
}

export function getInfo(){
    return {
        type: GET_INFO
    }
}

export function getInfoSuccess(user){
    return {
        type: GET_INFO_SUCCESS,
        user
    }
}

export function getInfoFailure(){
    return {
        type: GET_INFO_FAILURE
    }
}