import {
    ADMIN_GET,
    ADMIN_GET_SUCCESS,
    ADMIN_GET_FAILURE
} from '../actions/ActionTypes'
import update from 'react-addons-update'

const initialState = {
    adminStatus: {
        status: 'INIT',
        accounts: 0,
        posts: 0
    }
}

export default function admin(state = initialState, action) {
    switch(action.type){
        case ADMIN_GET:
        return update(state, {
            adminStatus: {
                status: {$set: 'PENDING'}
            }
        })
        case ADMIN_GET_SUCCESS:
        return update(state, {
            adminStatus: {
                status: {$set: 'SUCCESS'},
                accounts: {$set: action.data.account},
                posts: {$set: action.data.post}
            }
        })

        case ADMIN_GET_FAILURE:
        return update(state, {
            adminStatus: {
                adminStatus: {$set: 'FAILURE'}
            }
        })

        default:
        return state
    }
}