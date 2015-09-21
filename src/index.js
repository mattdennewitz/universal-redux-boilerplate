var React = require('react');
window.React = React;

var Provider = require('react-redux').Provider;
var ReduxRouter = require('redux-router').ReduxRouter;
import createBrowserHistory from 'history/lib/createBrowserHistory';

var routes = require('./routes');

/* create store */
var configureStore = require('./store');
var store = configureStore('client', window.__initial_state__);
window.store = store;

var Root = (
    <Provider store={store}>
        {() => <ReduxRouter routes={routes} />}
    </Provider>
);

React.render(Root, document.getElementById('root'));
