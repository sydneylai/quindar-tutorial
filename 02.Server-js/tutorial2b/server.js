// Program: server.js
// Purpose: startup program for NodeJS web server
// Author:  Ray Lai
// Updated: Aug 8, 2016
// License: MIT license
// Example: To run Web server, enter the command "node server.js", open browser with URL http://localhost:3000
// To change port number, issue the command ". ./setNewPort.sh", and re-open browser with URL http://localhost:4000
//
// Remark:
// remember to use a dot (i.e. 'source' command in Linux) in front of the shell script setNewPort.sh
// because this will remember the env variable defined by setNewPort.sh, which is PORT.
//
var express = require('express');

// start Express Http Web server
var server = express();
// This will read all HTML Web pages from the root context
server.use(express.static(__dirname + '/'));

var port = process.env.PORT || 3000;
// you can start the Express Web server with alternate TCP port number defined by 
// environment variable, e.g. $PORT
// You can change the port number by setting env variable, e.g. export PORT=4000
server.listen(port, function() {
   console.log('NodeJS Web server listening on port ' + port);
});

