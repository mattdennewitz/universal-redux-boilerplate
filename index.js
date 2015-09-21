delete process.env.BROWSER;

require('babel/register');
require('es6-promise').polyfill();

require('./server');
