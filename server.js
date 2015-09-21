var path = require('path');
var express = require('express');
var webpack = require('webpack');

var React = require('react');
var Provider = require('react-redux').Provider;
var ReduxRouter = require('redux-router').ReduxRouter;
import createLocation from 'history/lib/createLocation';
import { match } from 'redux-router/server';
var Helmet = require('react-helmet');

var routes = require('./src/routes');
var configureStore = require('./src/store');
var fetchPosts = require('./src/actions').fetchPosts;

/* - */

var app = express();

var env = process.env.NODE_ENV || 'dev';

/* webpack middlware setup */
if(env === 'dev') {
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

const fetchData = function(store, components) {
    return Promise.all(
        components.map(component => {
            component = component && component.WrappedComponent || component;

            if(!component || !component.fetchData) {
                return;
            }

            // return the promise returned by the dispatch
            // happening in `component.fetchData`
            return component.fetchData(store);
        })
    );
}

app.get('*', function(req, res) {
    /* figure out request location */
    let location = createLocation(req.url);

    /* create new store */
    var store = configureStore('server');

    store.dispatch(
        match(req.url, (err, redirectLocation, renderProps) => {
            /* fill store with data from to-be-rendered components */
            fetchData(store, renderProps.components)
                .then(() => {
                    /* render entire container to string */
                    const html = React.renderToString(
                        <Provider store={store}>
                            {() => <ReduxRouter {...renderProps} />}
                        </Provider>
                    );

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
                    res.end(e);
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
