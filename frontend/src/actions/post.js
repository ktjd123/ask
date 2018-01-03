import {
    GET_POST,
    GET_POST_SUCCESS,
    GET_POST_FAILURE,
    GET_NPOST_SUCCESS,
    POST_QUESTION,
    POST_QUESTION_SUCCESS,
    POST_QUESTION_FAILURE
} from './ActionTypes'
import axios from 'axios'

export function postQuestionRequest(replier, question){
    return dispatch => {
        dispatch(postQuestion())

        return axios.post('/api/post/', {replier, question}).then(res => {
            dispatch(postQuestionSuccess())
        }).catch( err => {
            dispatch(postQuestionFailure(err.response.data.code))
        })
    }
}

export function postQuestion(){
    return {
        type: POST_QUESTION
    }
}

export function postQuestionSuccess(){
    return {
        type: POST_QUESTION_SUCCESS
    }
}

export function postQuestionFailure(code){
    return {
        type: POST_QUESTION_FAILURE,
        code
    }
}

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