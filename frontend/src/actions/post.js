import {
    GET_POST,
    GET_POST_SUCCESS,
    GET_POST_FAILURE,
    GET_NPOST_SUCCESS,
    POST_QUESTION,
    POST_QUESTION_SUCCESS,
    POST_QUESTION_FAILURE,
    POST_ANSWER,
    POST_ANSWER_SUCCESS,
    POST_ANSWER_FAILURE,
    POST_REMOVE,
    POST_REMOVE_SUCCESS,
    POST_REMOVE_FAILURE,
} from './ActionTypes'
import axios from 'axios'

export function postRemoveRequest(id){
    return dispatch => {
        dispatch(postRemove())
        return axios.post('/api/post/remove', {id}).then(res => {
            dispatch(postRemoveSuccess())
        }).catch(err => {
            dispatch(postRemoveFailure(err.response.data.code))
        })
    }
}

export function postRemove(){
    return {
        type: POST_REMOVE
    }
}

export function postRemoveSuccess(){
    return {
        type: POST_REMOVE_SUCCESS
    }
}

export function postRemoveFailure(code){
    return {
        type: POST_REMOVE_FAILURE
        ,code
    }
}

export function postAnswerRequest(id, answer){
    return dispatch => {
        dispatch(postAnswer())

        return axios.post('/api/post/reply', {id,answer}).then(res => {
            dispatch(postAnswerSuccess())
        }).catch(err => {
            dispatch(postAnswerFailure(err.response.data.code))
        })
    }
}

export function postAnswer(){
    return {
        type: POST_ANSWER
    }
}

export function postAnswerSuccess(){
    return {
        type: POST_ANSWER_SUCCESS
    }
}

export function postAnswerFailure(code){
    return{
        type: POST_ANSWER_FAILURE,
        code
    }
}

export function postQuestionRequest(replier, question, loggedIn){
    return dispatch => {
        dispatch(postQuestion())

        return axios.post('/api/post/', {replier, question, loggedIn}).then(res => {
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