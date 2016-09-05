// Program: server.js
// Purpose: REST API examples
// Author:  Ray Lai
// Updated: Jul 12, 2016
// License: MIT license
// Example: issue the command node server.js to start API server.
//          open web browser with URL http://localhost:3000/verifyMe
//
var express = require('express');
var app = express();

app.use(express.static(__dirname + '/'));

// start web server with port 3000 or from $PORT
var port = process.env.PORT || 3000;
app.listen(port, function() {
   console.log('NodeJS Web server listening on port ' + port);
});

// example 1: in-line REST API to show a simple API example
// best practice is to create separate JS files under /app/scripts for REST API
app.get('/verifyMe', function(req, res) {
  res.status(200).send({"status": 200, "message": "Quindar platform is alive"});
});
