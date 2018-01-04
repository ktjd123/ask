import authentication from 'reducers/authentication'
import post from 'reducers/post'
import admin from './admin'

import {combineReducers} from 'redux';

const reducers = combineReducers({
    authentication,
    post,
    admin
})

export default reducers