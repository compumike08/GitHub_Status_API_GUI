const config = require('config');
const express = require('express');

let app = express();

let configServerPort = config.get("configServerPort");
let configParams = config.get("configProps");

app.get('/getConfigs', function (req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify(configParams));
});

app.listen(configServerPort, function () {
  console.log('Configuration server app listening on port ' + configServerPort + '!');
});
