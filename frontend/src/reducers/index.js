import authentication from 'reducers/authentication'
import post from 'reducers/post'

import {combineReducers} from 'redux';

const reducers = combineReducers({
    authentication,
    post
})

export default reducers