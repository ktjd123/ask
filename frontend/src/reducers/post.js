import{
    GET_POST,
    GET_POST_SUCCESS,
    GET_POST_FAILURE
} from '../actions/ActionTypes'
import update from 'react-addons-update'

const initialState = {
    list: {
        status: 'INIT',
        data: [],
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

        case GET_POST_FAILURE:
        return update(state, {
            list: {
                status: {$set: 'FAILURE'}
            }
        })
        default:
        return state;
    }
}