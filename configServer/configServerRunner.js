let localConfigProps = require('../configs/configProps.json');
const express = require('express');

let app = express();

// TODO: Replace hardcoded port with value from external configurations
let configServerPort = 5000;
let configParams = localConfigProps;

app.get('/getConfigs', function (req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify(configParams));
});

app.listen(configServerPort, function () {
  console.log('Configuration server app listening on port ' + configServerPort + '!');
});
