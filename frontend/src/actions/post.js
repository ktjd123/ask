import {
    GET_POST,
    GET_POST_SUCCESS,
    GET_POST_FAILURE,
    GET_NPOST_SUCCESS
} from './ActionTypes'
import axios from 'axios'

export function getPostRequest(id, aw) {
    return dispatch => {
        dispatch(getPost())
        return axios.post('/api/post/id', { id, aw }).then(res => {
            if(aw){
                dispatch(getPostSuccess(res.data))
            }else{
                dispatch(getNPostSuccess(res.data))
            }
        }).catch(err => {
            dispatch(getPostFailure())
        })

    }
}

export function getPost() {
    return {
        type: GET_POST
    }
}

export function getPostSuccess(posts) {
    return {
        type: GET_POST_SUCCESS,
        posts
    }
}

export function getPostFailure() {
    return {
        type: GET_POST_FAILURE
    }
}
export function getNPostSuccess(posts) {
    return {
        type: GET_NPOST_SUCCESS,
        posts
    }
}