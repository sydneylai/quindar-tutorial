// Program: verifyMe.js
// Purpose: sample REST API for heartbeat
// Author:  Shalini Negi
// Updated: Aug 16, 2016
//

/* API annotation */
/**
	* @api {get} /verifyMe system heartbeat
	* @apiVersion 0.1.0
  * @apiName verifyMe
  * @apiDescription verify if system is alive
  * @apiGroup System
 	*
 	* @apiSuccess {String} message system status about the platform
 	*
 	* @apiExample {curl} Example usage:
 	* curl -X GET http://localhost:3000/verifyMe
 	*
 	* @apiSuccessExample Success-Response:
 	*     HTTP/1.1 200 OK
 	*     {
 	*       "message": "Quindar platform is alive"
 	*     }
 	*
 	* @apiError (Error 500) {json} N/A Not applicable
 	*
 	* @apiErrorExample {json} Error-Response:
 	*     HTTP/1.1 500 Not Found
 	*     {
 	*       "error": "Internal system error. Please check with system administrator to restart servers."
 	*     }
	**/
app.get('/verifyMe', function(req, res) {
  res.status(200).send({"status": 200, "message": "Quindar platform is alive"});
});
