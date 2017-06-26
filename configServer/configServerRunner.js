const config = require('config');
const express = require('express');

const CONFIG_SERVER_URI = "/getConfigs";

const CONFIG_PROPS_PROP_NAME = "configProps";
const CONFIG_SERVER_PORT_PROP_NAME = "configServerPort";

let app = express();

let configServerPort = config.get(CONFIG_SERVER_PORT_PROP_NAME);
let configParams = config.get(CONFIG_PROPS_PROP_NAME);
let isAllRequiredPropsDefined = checkRequiredProps(configParams);

if (!isAllRequiredPropsDefined) {
  console.log("FATAL ERROR: One or more required configuration properties were not defined.")
  throw new Error("FATAL CONFIGURATION ERROR");
}

app.get(CONFIG_SERVER_URI, function (req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify(configParams));
});

app.listen(configServerPort, function () {
  console.log('Configuration server app listening on port ' + configServerPort + '!');
});

function checkRequiredProps(configParams) {
  const CLIENT_ID_PROP_NAME = 'CLIENT_ID';
  const GATEKEEPER_AUTH_URL_PROP_NAME = 'GATEKEEPER_AUTH_URL';
  const GITHUB_ACCOUNT_NAME_PROP_NAME = 'GITHUB_ACCOUNT_NAME';
  const HOME_PAGE_URI_PROP_NAME = 'HOME_PAGE_URI';
  const OAUTH_AUTHORIZE_URL_PROP_NAME = 'OAUTH_AUTHORIZE_URL';
  const OAUTH_PROVIDER_NAME_PROP_NAME = 'OAUTH_PROVIDER_NAME';
  const OAUTH_GH_SCOPES_PROP_NAME = 'OAUTH_GH_SCOPES';

  let isAllPropsDefined = true;

  if (!configParams.hasOwnProperty(CLIENT_ID_PROP_NAME)) {
    isAllPropsDefined = false;
    outputConfigErrorMessage(CLIENT_ID_PROP_NAME);
  }

  if (!configParams.hasOwnProperty(GATEKEEPER_AUTH_URL_PROP_NAME)) {
    isAllPropsDefined = false;
    outputConfigErrorMessage(GATEKEEPER_AUTH_URL_PROP_NAME);
  }

  if (!configParams.hasOwnProperty(GITHUB_ACCOUNT_NAME_PROP_NAME)) {
    isAllPropsDefined = false;
    outputConfigErrorMessage(GITHUB_ACCOUNT_NAME_PROP_NAME);
  }

  if (!configParams.hasOwnProperty(HOME_PAGE_URI_PROP_NAME)) {
    isAllPropsDefined = false;
    outputConfigErrorMessage(HOME_PAGE_URI_PROP_NAME);
  }

  if (!configParams.hasOwnProperty(OAUTH_AUTHORIZE_URL_PROP_NAME)) {
    isAllPropsDefined = false;
    outputConfigErrorMessage(OAUTH_AUTHORIZE_URL_PROP_NAME);
  }

  if (!configParams.hasOwnProperty(OAUTH_PROVIDER_NAME_PROP_NAME)) {
    isAllPropsDefined = false;
    outputConfigErrorMessage(OAUTH_PROVIDER_NAME_PROP_NAME);
  }

  if (!configParams.hasOwnProperty(OAUTH_GH_SCOPES_PROP_NAME)) {
    isAllPropsDefined = false;
    outputConfigErrorMessage(OAUTH_GH_SCOPES_PROP_NAME);
  } else {
    if (configParams.get(OAUTH_GH_SCOPES_PROP_NAME).length < 1) {
      isAllPropsDefined = false;
      console.log("ERROR: The required configuration property array '" + OAUTH_GH_SCOPES_PROP_NAME + "' is empty.");
    }
  }

  return isAllPropsDefined;
}

function outputConfigErrorMessage(configPropName) {
  console.log("ERROR: Required configuration property '" + configPropName + "' is not defined.");
}
