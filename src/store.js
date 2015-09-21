import { compose, createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import createHistory from 'history/lib/createBrowserHistory';
import { reduxReactRouter as clientReduxRouter } from 'redux-router';
import { reduxReactRouter as serverReduxRouter } from 'redux-router/server';

import rootReducer from './reducers';
import routes from './routes';

const storeBuilder = function(target) {
    let middlewares = [thunkMiddleware];

    if(target === 'client') {
        middlewares.push( createLogger() );
    }

    let routerMiddleware;

    if(target === 'server') {
        routerMiddleware = serverReduxRouter({ routes });
    } else {
        routerMiddleware = clientReduxRouter({
            routes,
            createHistory
        })
    }

    return compose(
        applyMiddleware(...middlewares),
        routerMiddleware,
    )(createStore);
}

export default function configureStore(target, initialState) {
    const createWrappedStore = storeBuilder(target);
    return createWrappedStore(rootReducer, initialState);
}
