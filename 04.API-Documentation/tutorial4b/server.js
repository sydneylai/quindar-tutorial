// Program: server.js
// Purpose: REST API examples with loadable modules
// Author:  Ray Lai
// Updated: Jul 12, 2016
// License: MIT license
//
// Remarks: this program shows 2 REST APIs
//          first REST API is /verifyMe (inline REST API)
//          second REST API is /services/v1/position to write telemetry data into MongoDB
//

var express = require('express');

// Mongoose ORM will read database
var mongoose = require('mongoose');

// configure express HTTP Web server (Express server dependencies)
var bodyParser   		= require('body-parser');
var session      		= require('express-session');
var app = express();
app.use(express.static(__dirname + '/'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// start express web server with port 3000, or $PORT
var port = process.env.PORT || 3000;
app.listen(port, function() {
   console.log('NodeJS Web server listening on port ' + port);
});

// example 1: in-line REST API
app.get('/verifyMe', function(req, res) {
  // we can add cross-domain support here so that local browser with localhost domain can still access this web service
  res.setHeader('Content-Type', 'application/json');
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  return res.status(200).send({"status": 200, "message": "Quindar platform is alive"});
});


require('./app/scripts/module01.js')(app,mongoose);

