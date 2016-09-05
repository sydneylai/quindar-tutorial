// Program: module01.js 
// Purpose: test module to mimic db read by returning a pre-defined telemetry position data point
// Author:  Ray Lai
// Updated: Aug 8, 2016
// License: MIT license
//
module.exports = function(app) {
  console.log("/module01.js - module01 (read web service) is loaded.");
  
  // remark: we leave out the API annotation for now; refer to API doc tutorial for clarification
  app.get('/services/v1/position', function(req, res) {
    // to support cross-domain compatibility with browsers, you need to rewrite HTTP header with these commands
    res.setHeader('Content-Type', 'application/json');
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");

    // this API will mimic database read, and return this telemetry data point
    var telemetry = {"vehicleId":"IBEX","timestamp":1457640420, "x":236294.1956, "y":116196.8879,"z":-34379.67682,
      "vx":-0.675287,"vy":0.508343,"vz":0.434496 };
    return res.status(200).send({"status": 200, "message": "Fetch position telemetry data points successfully.",
        "data": telemetry });
  });
};
