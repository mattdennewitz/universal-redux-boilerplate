import path from 'path';
import express from 'express';
import webpack from 'webpack';

import React from 'react';
import { Provider } from 'react-redux';
import { ReduxRouter } from 'redux-router';
import { match } from 'redux-router/server';
import Helmet from 'react-helmet';

import fillStore from './src/utils/fill-store';
import routes from './src/routes';
import configureStore from './src/store';


var app = express();

/* enable webpack middleware for online bundling and hot reloading
   if we're in dev mode */
if(process.env.HOT) {
    var config = require('./webpack.config');
    var compiler = webpack(config);

    app.use(require('webpack-dev-middleware')(compiler, {
      noInfo: true,
      publicPath: config.output.publicPath
    }));

    app.use(require('webpack-hot-middleware')(compiler));
} else {
    app.use('/static', express.static('dist'));
    app.use('/favicon.ico', express.static('dist'));
}

app.get('*', function(req, res) {
    /* create a store meant to work on the server.
       this store has our routes and the initial shape
       of our `posts` state, and nothing else. */
    var store = configureStore('server');

    /* responding to a request appears slightly complicated at first,
       but is in reality a farily straight-forward operation.
       here's a description of the workflow:

        1. serving a request starts with dispatching through our redux store
           a `match` action for the request's path with a callback to handle
           the matched path. under the hood, `redux-router` uses
           `react-router` to route the request to the appropriate `Route`
           and calls the callback we provide with details about the component
           hierarchy it found for the matching route.

        2. once the route has been matched, we'll use `utils/fillStore`
           to load any data required for rendering. this function collects
           promises returned by any and all components via each component's
           own `fillStore` function and awaits their resolution.
           components will receive their data as props (if connected via
           `react-redux/connect`), thus having it available at render-time.

           any component that needs to fetch data before being rendered
           should define a static function called `fillStore`. this funciton
           will be passed the redux store, and should in turn dispatch
           an action which returns a promise.

           see `components/PostList` for an example.

        3. once all promises have been resolved, we create a redux-wrapped
           `<ReduxRouter />` instance with the render properties given
           to us by `react-router`. These properties detail the location,
           history, and more around what we're routing.

        4. next, we extract `<head>`-ready data from `react-helmet`.
           this will be used momentarily to populate `<title>` and seo and
           social network data extraction tags.

        5. then, we serialize the state of our application.
           once the page loads on the client side, this state will be
           given to the client-side redux store as its initial state.
           this state is interpolate into the final html response.

        6. the final html response is built out as a simple string
           and sent back to the user. once the page has been rendered,
           our webpack-bundled `bundle.js` script will boot redux
           on the client-side, rehydrating it with our serialized state.

           see `client.js` for this process.

    */
    store.dispatch(
        match(req.url, (err, redirectLocation, renderProps) => {
            /* fill store with data from to-be-rendered components */
            fillStore(store, renderProps.components)
                .then(() => {
                    /* render entire container to string */
                    const html = React.renderToString(
                        <Provider store={store}>
                            {() => <ReduxRouter {...renderProps} />}
                        </Provider>
                    );

                    /* extract helmet-specific data from component tree */
                    const head = Helmet.rewind();

                    /* serialize state */
                    const serializedState = JSON.stringify(store.getState())

                    /* send rendered page */
                    let response = `
                        <!doctype html>
                        <html>
                            <head>
                                <title>${head.title}</title>
                            </head>
                            <body>
                                <div id="root">${html}</div>

                                <script>
                                    window.__initial_state__ = ${serializedState};
                                </script>
                                <script src="/static/bundle.js"></script>
                            </body>
                        </html>
                    `;

                    res.end(response);
                })
                .catch(e => {
                    console.trace(e);
                    res.end('failed');
                })
        })
    );
});

app.listen(3000, 'localhost', function(err) {
  if (err) {
    console.log(err);
    return;
  }

  console.log('Listening at http://localhost:3000');
});
