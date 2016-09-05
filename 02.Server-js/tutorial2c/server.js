// Program: server.js
// Purpose: startup program for NodeJS web server with SSL (https)
// Author:  Ray Lai
// Updated: Aug 8, 2016
// License: MIT license
//
var express = require('express');
var app = express();
var https = require('https');
var fs = require('fs');

var secureServer = express();
var securePort  = process.env.PORT || 3000;

// read SSL cert (self-signed cert for testing)
//all SSL generated under /keys.. you can use buildssl.sh
//quindar-key :
var quindarKey = fs.readFileSync(__dirname + '/keys/quindar-key.pem');
var quindarCert = fs.readFileSync(__dirname + '/keys/quindar-cert.pem');
var sslOptions = {
  key: quindarKey,
  cert: quindarCert
};

app.use(express.static(__dirname + '/'));
// 7/22/2016 RayL: #example 1: the following codes will not run. do you know why?
//secureServer.use(express.static(__dirname + '/'));

// 7/22/2016 RayL: #example 2: the following codes will not run. do you know why?
//app.engine('html', cons.swig)
//app.set('views', __dirname + '/app/views');
//app.set('view engine', 'html');

// now run HTTPS with secure port
secureServer = https.createServer(sslOptions,app);
secureServer.listen(securePort, function() {
  console.log('Express Web server listening on port ' + securePort + ' over HTTPS');
});


