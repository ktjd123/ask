import{
    GET_POST,
    GET_POST_SUCCESS,
    GET_POST_FAILURE,
    GET_NPOST_SUCCESS,
    POST_QUESTION,
    POST_QUESTION_SUCCESS,
    POST_QUESTION_FAILURE
} from '../actions/ActionTypes'
import update from 'react-addons-update'

const initialState = {
    list: {
        status: 'INIT',
        data: [],
        nData: []
    },
    postQuestion: {
        status: 'INIT',
        error: -1
    }
}

export default function post(state = initialState, action){
    switch(action.type){
        case GET_POST:
        return update(state, {
            list: {
                status: {$set: 'PENDING'},
            }
        })

        case GET_POST_SUCCESS:
        return update(state, {
            list: {
                status: {$set: 'SUCCESS'},
                data: {$set: action.posts},
            }
        })

        case GET_NPOST_SUCCESS:
        return update(state, {
            list: {
                status: {$set: 'SUCCESS'},
                nData: {$set: action.posts}
            }
        })

        case GET_POST_FAILURE:
        return update(state, {
            list: {
                status: {$set: 'FAILURE'}
            }
        })

        case POST_QUESTION:
        return update(state, {
            postQuestion: {
                status: {$set: 'PENDING'}
            }
        })

        case POST_QUESTION_SUCCESS:
        return update(state, {
            postQuestion: {
                status: {$set: 'SUCCESS'}
            }
        })

        case POST_QUESTION_FAILURE:
        return update(state, {
            postQuestion: {
                status: {$set: 'FAILURE'},
                error: {$set: action.code}
            }
        })

        default:
        return state;
    }
}