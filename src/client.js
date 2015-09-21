import React from 'react';
window.React = React;

import { Provider } from 'react-redux';
import { ReduxRouter } from 'redux-router';
import createBrowserHistory from 'history/lib/createBrowserHistory';

import configureStore from './store';
import routes from './routes';

/* create store */
const store = configureStore('client', window.__initial_state__);

const Root = (
    <Provider store={store}>
        {() => <ReduxRouter routes={routes} />}
    </Provider>
);

/* boot react/redux/etc on the client */
React.render(Root, document.getElementById('root'));
