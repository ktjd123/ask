import {
    GET_POST,
    GET_POST_SUCCESS,
    GET_POST_FAILURE
} from './ActionTypes'
import axios from 'axios'

export function getPostRequest(id){
    return dispatch => {
        dispatch(getPost())
        return axios.post('/api/post/id', {id}).then(res => {
            dispatch(getPostSuccess(res.data))
        }).catch(err => {
            dispatch(getPostFailure())
        })
    }
}

export function getPost(){
    return{
        type: GET_POST
    }
}

export function getPostSuccess(posts){
    return {
        type: GET_POST_SUCCESS,
        posts
    }
}

export function getPostFailure(){
    return {
        type: GET_POST_FAILURE
    }
}