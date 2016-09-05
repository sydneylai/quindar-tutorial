// Program: server.js
// Purpose: startup program for NodeJS web server
// Author:  Masaki Kakoi
// Updated: Jul 12, 2016
// License: MIT license
// Example: To run Web server, enter the command "node server.js", open browser with URL http://localhost:3000
//
var express = require('express');

// start Express Http Web server
var server = express();

// This will read all HTML Web pages from the root context
server.use(express.static(__dirname + '/'));

// default Http port for Web server here defined to be 3000
var port = 3000;
server.listen(port, function() {
   console.log('NodeJS Web server listening on port ' + port);
});

