const express = require('express');

let app = express();

// TODO: Replace hardcoded port and params values with values from external configurations
let configServerPort = 5000;
let configParams = {
  "CLIENT_ID": "",
  "GATEKEEPER_AUTH_URL": "",
  "GITHUB_ACCOUNT_NAME": ""
};

app.get('/getConfigs', function (req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify(configParams));
});

app.listen(configServerPort, function () {
  console.log('Configuration server app listening on port ' + configServerPort + '!');
});
