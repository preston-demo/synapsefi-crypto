import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware} from'redux'
import {Provider} from 'react-redux';
import ReduxThunk from 'redux-thunk';
import reducers from './reducers';
import { routerMiddleware } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';
import { HashRouter, Route, Switch } from 'react-router-dom';
import App from './containers/App';
import {AUTH_USER} from './actions/types';
import './assets/styles/app.css';

const history = createHistory();
const middleware = [ReduxThunk, routerMiddleware(history)];
const store = createStore(reducers, {}, applyMiddleware(...middleware));

ReactDOM.render((
  <Provider store={store}>
    <HashRouter>
        <Switch>
            <Route path="/" name="Home" component={App}/>
        </Switch>
    </HashRouter>
  </Provider>

),document.getElementById('root'));
