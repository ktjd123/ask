import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';

//Redux 관련 불러오기
import { createStore,applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import reducers from 'reducers';

//React-redux Provider
import { Provider } from 'react-redux';

//React router v4
import { BrowserRouter, Route, Switch } from 'react-router-dom';
//<Route path="/" component={AppContainer} /> - 이걸 페이지의 헤더파일로 해놓으면 굉장히 편리하겠다.

//base css
import './index.css'

//Example import
import {Main, Login, Register} from 'containers'
//Example import end

import {ToastContainer} from 'react-toastify'

const store = createStore(reducers, applyMiddleware(thunk));

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <div>
                <ToastContainer
                    autoClose={3000}
                    position="bottom-center"
                />
                <Switch>
                    <Route path='/login' component={Login}/>
                    <Route path='/register' component={Register}/>
                    <Route path='/:name' component={Main}/>
                </Switch>
            </div>
        </BrowserRouter>
    </Provider>
    , document.getElementById('root'));
registerServiceWorker();
