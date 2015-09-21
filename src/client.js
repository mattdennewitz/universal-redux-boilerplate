import React from 'react';
window.React = React;

import { Provider } from 'react-redux';
import { ReduxRouter } from 'redux-router';
import createBrowserHistory from 'history/lib/createBrowserHistory';

import routes from './routes';

/* create store */
var configureStore = require('./store');
var store = configureStore('client', window.__initial_state__);

var Root = (
    <Provider store={store}>
        {() => <ReduxRouter routes={routes} />}
    </Provider>
);

React.render(Root, document.getElementById('root'));
