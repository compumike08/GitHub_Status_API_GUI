// This file configures a web server for testing the production build
// on your local machine.
let proxy = require('http-proxy-middleware');

import browserSync from 'browser-sync';
import historyApiFallback from 'connect-history-api-fallback';
import {chalkProcessing} from './chalkConfig';

const { PUBLIC_HOST_NAME } = process.env;

// TODO: Replace hardcoded values with values from external configurations
let proxyConfig = {
  target: `http://${PUBLIC_HOST_NAME}`,
  changeOrigin: true,
  router: {
    "/getConfigs": `http://${PUBLIC_HOST_NAME}:5000`
  },
  logLevel: 'debug'
};

/* eslint-disable no-console */

console.log(chalkProcessing('Opening production build...'));

// Run Browsersync
browserSync({
  port: 80,
  ui: {
    port: 81
  },
  https: true,
  cors: true,
  server: {
    baseDir: 'dist'
  },

  files: [
    'src/*.html'
  ],

  middleware: [
    historyApiFallback(),
    proxy("/getConfigs", proxyConfig)
  ]
});
