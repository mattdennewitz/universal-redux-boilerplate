import { compose, createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import createHistory from 'history/lib/createBrowserHistory';
import { reduxReactRouter as clientReduxRouter } from 'redux-router';
import { reduxReactRouter as serverReduxRouter } from 'redux-router/server';

import rootReducer from './reducers';
import routes from './routes';

const storeBuilder = function(target) {
    /* redux-thunk allows our actions to return functions like promises.
       in practice, this means we can return a promise from a rest api
       and dispatch corresponding actions upon resolution */
    let middlewares = [thunkMiddleware];

    if(target === 'client') {
        /* enable redux state logging only on the client */
        middlewares.push( createLogger() );
    }

    let routerMiddleware;

    /* `reduxReactRouter` is repsonsible for adding router state
       to our store. because this also sets up a history model,
       we need to be careful to target rendering to either client
       or server. */
    if(target === 'server') {
        routerMiddleware = serverReduxRouter({ routes });
    } else {
        routerMiddleware = clientReduxRouter({
            routes,
            createHistory
        })
    }

    /* glue together all store middleware, and apply the collective
       middleware to the store we'll create. */
    return compose(
        applyMiddleware(...middlewares),
        routerMiddleware,
    )(createStore);
}

export default function configureStore(target, initialState) {
    /* a factory pattern by any other name... */
    const createWrappedStore = storeBuilder(target);

    /* create a middleware-wrapped redux store with `initialState` */
    return createWrappedStore(rootReducer, initialState);
}
