// Program: module01.js 
// Purpose: test module to mimic db read by returning a pre-defined telemetry position data point
// Author:  Ray Lai
// Updated: Aug 8, 2016
// License: MIT license
//
module.exports = function(app,logger) {
  console.log("/module01.js - module01 (read web service) is loaded.");

  /**
   * @api {get} /services/v1/position
   * @apiVersion 0.1.0
   * @apiName services/v1/position
   * @apiDescription list all position
   * @apiGroup System
   *
   * @apiSuccess {String} message system status about the platform
   *
   * @apiExample {curl} Example usage:
   * curl -X GET http://localhost:3000/services/v1/position
   *
   * @apiSuccessExample Success-Response:
   *     HTTP/1.1 200 OK
   *     {
   *       "status":200,"message":"Fetch position telemetry data points successfully.","data":
   *	    {"vehicleId":"IBEX","timestamp":1457640420,"x":236294.1956,"y":116196.8879,"z":-34379.67682,"vx":-0.675287,"vy":0.508343,"vz":0.434496}
   *     }
   *
   * @apiError (Error 500) {json} N/A Not applicable
   *
   * @apiErrorExample {json} Error-Response:
   *     HTTP/1.1 500 Not Found
   *     {
   *       "error": "Internal system error. Please check with system administrator to restart servers."	* }
   **/

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
