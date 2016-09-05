// Program: module02.js
// Purpose: Data API to write telemetry data into MongoDB
// Author:  Ray Lai
// Updated: Aug 8, 2016
// License: MIT license
// Remark: to run this example, open a terminal window, run "node server.js" from project home folder, and execute this command:
// curl -X POST -H "Content-type: application/json" -d '{"vehicleId":"IBEX","timestamp":1457640420,"x":236294.1956, "y":116196.8879,"z":-34379.67682,"vx":-0.675287,"vy":0.508343,"vz":0.434496}' http://localhost:3000/services/v1/position
//
module.exports = function(app, mongoose) {
  console.log("/module01.js - module02 (database write web service) is loaded.");

  // read database endpoint and retrieve db user credentials from a config file  
  var systemSettings = require('../../config/systemSettings.js');

  // connect to Mongodb database
  mongoose.connect(systemSettings.dbUrl, systemSettings.dbOptions); 
  var db = mongoose.connection;
 
  // Position is db schema
  var Position = require('../models/position.js');
  
  // common database handlers - these will connect or disconnect to MongoDB
  db.on('connected', function (err) {
    console.log('MongoDB connected');
  });

  db.on('error', function (err) {
    console.log('MongoDB connection error', err);
  });

  db.once('open', function (err, res) {
    console.log('MongoDB connected to ' + systemSettings.dbUrl);
  });

  db.on('disconnected', function () {
    console.log('Mongoose default connection disconnected');
  });

  // this handles control-c (break) to disconnect from database
  process.on('SIGINT', function() {
    mongoose.connection.close(function () {
      console.log('Mongoose default connection disconnected through app termination');
    process.exit(0);
    });
  });

  /**
   * @api {post} /services/v1/position
   * @apiVersion 0.1.0
   * @apiName services/v1/position
   * @apiDescription list all position
   * @apiGroup System
   *
   * @apiSuccess {String} message system status about the platform
   *
   * @apiExample {curl} Example usage:
   * curl -X POST -H "Content-type: application/json" -d '{"vehicleId":"IBEX","timestamp":1457640420,"x":236294.1956, "y":116196.8879,"z":-34379.67682,"vx":-0.675287,"vy":0.508343,"vz":0.434496}' http://localhost:3000/services/v1/position
   *
   * @apiSuccessExample Success-Response:
   *     HTTP/1.1 200 OK
   *     {
   *        "status":200,"message":"insert position data points","data":
   *	    {"vehicleId":"IBEX","timestamp":1457640420,"x":236294.1956,"y":116196.8879,"z":-34379.67682,"vx":-0.675287,"vy":0.508343,"vz":0.434496}
   *
   *     }
   *
   * @apiError (Error 500) {json} N/A Not applicable
   *
   * @apiErrorExample {json} Error-Response:
   *     HTTP/1.1 500 Not Found
   *     {
   *       "error": "Internal system error. Please check with system administrator to restart servers."	* }
   **/

  app.post('/services/v1/position', function(req, res, err) {
    // add cross-domain policy support (CORS) for different browsers - by rewriting HTTP header
    res.setHeader('Content-Type', 'application/json');
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");

    // Position is the db schema. We read from the HTTP body, which contains the data contents.
    // Mongoose will check and match pre-defined db schema
    var positionData = new Position(req.body);
    positionData.timestamp = Math.floor(new Date() / 1000);
    positionData.createdAt = new Date();
    positionData.save(function(err) {
      // example 3: now you can add this if err block within the positionData.save(), then the error handling will work.
      if (err) {
        return res.status(500).send({"status": 500, "message": "Cannot insert position data points due to internal system error", 
          "type":"internal", "error": err});
      };

      // if no error
      return res.status(200).send( {"status": 200, "message": "insert position data points", "data": positionData} );
    });
  });

// end of module
};
