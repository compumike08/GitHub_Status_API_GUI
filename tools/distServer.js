// This file configures a web server for testing the production build
// on your local machine.
let proxy = require('http-proxy-middleware');

import browserSync from 'browser-sync';
import historyApiFallback from 'connect-history-api-fallback';
import {chalkProcessing} from './chalkConfig';

// TODO: Replace hardcoded values with values from external configurations
let proxyConfig = {
  target: 'http://localhost',
  changeOrigin: true,
  router: {
    "/getConfigs": "http://localhost:5000"
  },
  logLevel: 'debug'
};

/* eslint-disable no-console */

console.log(chalkProcessing('Opening production build...'));

// Run Browsersync
browserSync({
  port: 3000,
  ui: {
    port: 3001
  },
  https: true,
  cors: true,
  server: {
    baseDir: 'dist',

    middleware: [
      proxy("/getConfigs", proxyConfig)
    ]
  },

  files: [
    'src/*.html'
  ],

  middleware: [historyApiFallback()]
});
