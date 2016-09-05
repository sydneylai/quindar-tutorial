// Program: server.js
// Purpose: REST API examples with loadable modules
// Author:  Ray Lai
// Updated: Jul 12, 2016
// License: MIT license
//
// Remarks: this program shows 2 REST APIs
//          first REST API is from last exercise: /verifyMe (no db access; it is a heart beat)
//          it will load 1 REST API module: (1) read web service, no database access,
//
var express = require('express');

// Mongoose ORM will read database
var mongoose = require('mongoose');

// configure express HTTP Web server (Express server dependencies)
var bodyParser = require('body-parser');
var session = require('express-session');
var app = express();
app.use(express.static(__dirname + '/'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// logging
var syslogger = require('morgan');
var logger = require('winston');
var FileStreamRotator = require('file-stream-rotator');

var logDirectory = __dirname + '/log';
var accessLogStream = FileStreamRotator.getStream({
  date_format: 'YYYYMMDD',
  filename: logDirectory + '/access-%DATE%.log',
  frequency: 'daily',
  verbose: false
});
app.use(syslogger('combined', {stream: accessLogStream}));

// start express web server with port 3000, or $PORT
var port = process.env.PORT || 3000;
app.listen(port, function() {
   console.log('NodeJS Web server listening on port' + port);
});

// example 1: in-line REST API
app.get('/verifyMe', function(req, res) {
  // Optional: we can add cross-domain support here so that local browser with localhost domain can still access this web service
  //res.setHeader('Content-Type', 'application/json');
  //res.header("Access-Control-Allow-Origin", "*");
  //res.header("Access-Control-Allow-Headers", "X-Requested-With");	

  console.log(".../verifyMe is invoked at " + new Date());
  logger.log("info", ".../verifyMe is invoked at " + new Date());
  logger.info("No cross-domain policy (CORS) is enabled yet. Please enable for remote API use.");

  /** example 2: if you add this block, the REST API /verifyMe will always fail because err (handler) is always true
  if (err) {
    return res.status(500).send({"status": 500, "message": "Quindar server is not running due to internal server error",
        "error": err})
  };
  **/
  return res.status(200).send({"status": 200, "message": "Quindar platform is alive"});
});

require('./app/scripts/module01.js')(app, logger);
require('./app/scripts/module02.js')(app, mongoose);