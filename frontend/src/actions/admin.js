import {
    ADMIN_GET,
    ADMIN_GET_SUCCESS,
    ADMIN_GET_FAILURE
} from './ActionTypes'
import axios from 'axios'

export function adminGetRequest(){
    return dispatch => {
        dispatch(adminGet())

        return axios.post('/api/admin/').then((res) => {
            dispatch(adminGetSuccess(res.data))
        }).catch(err => {
            dispatch(adminGetFailure())
        })
    }
}

export function adminGet(){
    return {
        type: ADMIN_GET
    }
}

export function adminGetSuccess(data){
    return {
        type: ADMIN_GET_SUCCESS,
        data
    }
}

export function adminGetFailure() {
    return {
        type: ADMIN_GET_FAILURE
    }
}