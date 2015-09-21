var path = require('path');
var webpack = require('webpack');

var config = {
    debug: true,

    devtool: 'source-map',

    entry: [
        './src/client'
    ],

    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: '/static/'
    },

    plugins: [
        new webpack.NoErrorsPlugin()
    ],

    module: {
        loaders: [{
            test: /\.js$/,
            loader: 'babel',
            include: path.join(__dirname, 'src'),
            exclude: /node_modules/,
            query: {
                stage: 0,
                plugins: []
            }
        }]
    }
};

/* conditionally enable hot reloading */
if(process.env.HOT) {
    console.log('Enabling HMR');

    config.devtool = 'eval';
    config.entry.unshift('webpack-hot-middleware/client');
    config.plugins.unshift(new webpack.HotModuleReplacementPlugin());
    config.module.loaders[0].query.plugins.push('react-transform');
    config.module.loaders[0].query.extra = {
        'react-transform': [{
            target: 'react-transform-hmr',
            imports: ['react'],
            locals: ['module']
        },
        {
          target: 'react-transform-catch-errors',
          imports: ['react', 'redbox-react']
        }]
    };
}

module.exports = config;
