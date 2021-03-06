// Program: module04.js
// Purpose: send telemetry attitude data to MQ topic, exposed REST API
// Author:  Ray Lai
// Updated: May 26, 2016
// License: MIT license
//
module.exports = function(app, bodyParser, fs, syslogger, logger, helper) {
  var amqp = require('amqplib');
  var when = require('when');
  var randomstring = require('randomstring');
  var FileStreamRotator = require('file-stream-rotator');

  var systemSettings = require('../../config/systemSettings.js');

  // RabbitMQ config settings
  var ex = systemSettings.exchange;
  var exType = systemSettings.exchangeType;
  var mqAccessConfig = systemSettings.mqConfig;
  var serverURL = systemSettings.serverURL;
  var serverEndpoint = systemSettings.serverEndpoint;

  console.log("/messageQueue.js RabbitMQ API loaded.");
  /**
  * @api {post} /services/v1/simulation/messaging/attitude/:topic/:nTimes  attitude/topic/numberOfItems
  * @apiVersion 0.1.0
  * @apiName postAttitudeSimulation(topic, numberOfItems)
  * @apiDescription send to MQ with numberOfItems of attitude data points 
  * @apiGroup Telemetry
  *
  * @apiParam {String} topic   RabbitMQ topic, e.g. audacy.telemetry.attitude, customer1.vehicle1.attitude
  * @apiParam {String} vehicleId spacecraft vehicle identifier
  * @apiParam {Number} q1 quaternion
  * @apiParam {Number} q2 quaternion
  * @apiParam {Number} q3 quaternion
  * @apiParam {Number} q4 quaternion
  * @apiParam {Number} numberOfItems  number of data elements to return
  *
  * @apiSuccess {array} data array of attitude quaternion q1/q2/q3/q4 data points
  *
  * @apiExample {curl} Example usage:
  * curl -X POST -H "Content-type: application/json" -d '{"_id":"56f312e98caf28f687482b5f","vehicleId":"IBEX","timestamp":1457726400,
  * "q1":0.651781,"q2":-0.29526,"q3":-0.268266,"q4":0.645009}'
  *        http://localhost:3000/services/v1/simulation/messaging/attitude/audacy.telemetry.position/3
  *
  * @apiSuccessExample Success-Response:
  *     HTTP/1.1 200 OK
  * {"status":200,"message":"upsert attitude data points",
  *    "data":[{"_id":"56f312e98caf28f687482b5f","vehicleId":"IBEX","timestamp":1457726400,
  *    "q1":0.651781,"q2":-0.29526,"q3":-0.268266,"q4":0.645009}]}
  *
  * @apiError (Error 500) {json}  internal system error       The database is not ready to serve yet, e.g. after restart
  *
  * @apiErrorExample {json} Error-Response:
  *     HTTP/1.1 500 Internal system error encoutered
  * 
  *     {"message":"Internal system error encountered","type":"internal"}
  **/
  app.post('/services/v1/simulation/messaging/attitude/:topic/:nTimes', function(req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");

    var topic = req.params.topic;
    if (!topic || 0 === topic.length) {
      res.status(400);
      res.send(400, {status:400, message: 'Input error - message queue topic is empty', 
         type:'client'});
    }

    var nTimes = parseInt(req.params.nTimes);
    if (nTimes > 9999) {
      res.status(400);
      res.send(400, {status:400, message: 'Input error - nTimes (number of items) need to be <= 9999.', 
        type:'client'});
    };

    var mockData;
    var mockDataSet = [];
    initiate(mqAccessConfig);

    for (var i=0; i < nTimes; i++) {
      mockData = helper.getAttitudeData(0.999999, -0.000001);
      mockDataSet.push(mockData);
      publishToTopic(serverEndpoint, topic, mockData);
    }
    res.status(200);
    res.json( {"status": 200, "message": "generate test attitude data points to Audacy message queue", 
      "data": mockDataSet} );
  });

  /**
  * @api {post} /services/v1/simulation/messaging/position/:topic/:nTimes  position/topic/numberOfItems
  * @apiVersion 0.1.0
  * @apiName postPositionSimulation(topic, numberOfItems)
  * @apiDescription send to MQ with numberOfItems of position data points 
  * @apiGroup Telemetry
  *
  * @apiParam {String} topic   RabbitMQ topic, e.g. audacy.telemetry.position, customer1.vehicle1.position
  * @apiParam {String} vehicleId   spacecraft vehicle id
  * @apiParam {Number} x
  * @apiParam {Number} y
  * @apiParam {Number} z
  * @apiParam {Number} vx velocity for x
  * @apiParam {Number} vy velocity for y
  * @apiParam {Number} vz velocity for z
  * @apiParam {Number} numberOfItems  number of data elements to return
  *
  * @apiSuccess {array} data array of position data points (x,y,z,vx,vy,vz)
  *
  * @apiExample {curl} Example usage:
  * curl -X POST -H "Content-type: application/json" -d '{"_id":"56f3123e8caf28f687480f42","vehicleId":"IBEX","timestamp":1457640420,"x":236294.1956,
  * "y":116196.8879,"z":-34379.67682,"vx":-0.675287,"vy":0.508343,"vz":0.434496}'
  *        http://localhost:3000/services/v1/simulation/messaging/position/audacy.telemetry.position/3
  *
  * @apiSuccessExample Success-Response:
  *     HTTP/1.1 200 OK
  *     {"status":200,"message":"upsert position data points",
  * "data":[{"_id":"56f3123e8caf28f687480f42","vehicleId":"IBEX","timestamp":1457640420,"x":236294.1956,
  * "y":116196.8879,"z":-34379.67682,"vx":-0.675287,"vy":0.508343,"vz":0.434496}]}
  *
  * @apiError (Error 500) {json}  internal system error       The database is not ready to serve yet, e.g. after restart
  *
  * @apiErrorExample {json} Error-Response:
  *     HTTP/1.1 500 Internal system error encoutered
  * 
  *     {"message":"Internal system error encountered","type":"internal"}
  **/ 
  app.post('/services/v1/simulation/messaging/position/:topic/:nTimes', function(req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");

    var topic = req.params.topic;
    if (!topic || 0 === topic.length) {
      res.status(400);
      res.send(400, {status:400, message: 'Input error - message queue topic is empty', 
         type:'client'});
    }

    var nTimes = parseInt(req.params.nTimes);
    if (nTimes > 9999) {
      res.status(400);
      res.send(400, {status:400, message: 'Input error - nTimes (number of items) need to be <= 9999.',
         type:'client'});
    };

    var mockData;
    var mockDataSet = [];
    initiate(mqAccessConfig);

    for (var i=0; i < nTimes; i++) {
      mockData = helper.getPositionData(400000.0, -400000.0, 20.0, -20.0);
      mockDataSet.push(mockData);
      publishToTopic(serverEndpoint, topic, mockData);
    }
    res.status(200);
    res.json( {"status": 200, "message": "generate test position data points to Audacy message queue",
      "data": mockDataSet} );
  });

  /**
  * @api {post} /services/v1/simulation/messaging/vehicle/:topic/:nTimes vehicle/topic/numberOfItems
  * @apiVersion 0.1.0
  * @apiName postVehicleSimulation(topic, numberOfItems)
  * @apiDescription send to MQ with numberOfItems of vehicle data points
  * @apiGroup Telemetry
  *
  * @apiParam {String} topic   RabbitMQ topic, e.g. audacy.telemetry.vehicle, customer1.vehicle1.vehicle
  * @apiParam {String} vehicleId   spacecraft vehicle id
  * @apiParam {Number} numberOfItems  number of data elements to return
  *
  * @apiParam {String} vehicleId   spacecraft vehicle id
  * @apiParam {Number} value, e.g. temperature value, battery level value
  * @apiParam {Number} calbiratin factor, e.g. T = 3*x - 4*x^2 + 2
  * @apiParam {Number} uom unit of measure
  * @apiParam {Number} alertHigh  threshold for high alert 
  * @apiParam {Number} warnHigh threshold for high warning
  * @apiParam {Number} alertLow  threshold for low alert 
  * @apiParam {Number} warnLow threshold for low warning
  * @apiParam {Number} deviceId device identifier
  *
  * @apiSuccess {array} data array of vehicle data points from sensors in the satellite , e.g. temperature value, warnHigh, alertHigh
  *
  * @apiExample {curl} Example usage:
  * curl -X POST -H "Content-type: application/json" -d '{"_id":"56f315e98caf28f687483228","vehicleId":"IBEX","timestamp":1457726400,
  * "value":315,"calibrationFactor":"T = 3*x - 4*x^2 + 2","uom":"Kelvin","alertHigh":330,
  * "warnHigh":321,"alertLow":280,"warnLow":274,"deviceId":"Battery01Temp"}'
  *        http://localhost:3000/services/v1/simulation/messaging/vehicle/audacy.telemetry.position/3
  *
  * @apiSuccessExample Success-Response:
  *     HTTP/1.1 200 OK
  *     {"status":200,"message":"retrieve all vehicle data points",
  * "data":[{"_id":"56f315e98caf28f687483228","vehicleId":"IBEX","timestamp":1457726400,
  * "value":315,"calibrationFactor":"T = 3*x - 4*x^2 + 2","uom":"Kelvin","alertHigh":330,
  * "warnHigh":321,"alertLow":280,"warnLow":274,"deviceId":"Battery01Temp"}]}
  *
  * @apiError (Error 500) {json}  internal system error       The database is not ready to serve yet, e.g. after restart
  *
  * @apiErrorExample {json} Error-Response:
  *     HTTP/1.1 500 Internal system error encoutered
  * 
  *     {"message":"Internal system error encountered","type":"internal"}
  **/
  app.post('/services/v1/simulation/messaging/vehicle/:topic/:nTimes', function(req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");

    var topic = req.params.topic;
    if (!topic || 0 === topic.length) {
      res.status(400);
      res.send(400, {status:400, message: 'Input error - message queue topic is empty',
         type:'client'});
    }

    var nTimes = parseInt(req.params.nTimes);
    if (nTimes > 9999) {
      res.status(400);
      res.send(400, {status:400, message: 'Input error - nTimes (number of items) need to be <= 9999.',
         type:'client'});
    };

    var mockData;
    var mockDataSet = [];
    initiate(mqAccessConfig);

    for (var i=0; i < nTimes; i++) {
      mockData = helper.getVehiclesData(500.9999, -500.9999);
      mockDataSet.push(mockData);
      publishToTopic(serverEndpoint, topic, mockData);
    }
    res.status(200);
    res.json( {"status": 200, "message": "generate test vehicle data points to Audacy message queue",
      "data": mockDataSet} );
  });

  /**
  * @api {post} /services/v1/simulation/messaging/orbit/:topic/:nTimes orbit/topic/numberOfItems
  * @apiVersion 0.1.0
  * @apiName postOrbitSimulation(topic, numberOfItems)
  * @apiDescription send to MQ with numberOfItems of orbit trajectory data points 
  * @apiGroup Telemetry
  *
  * @apiParam {String} topic   RabbitMQ topic, e.g. audacy.telemetry.orbit, customer1.vehicle1.orbit
  * @apiParam {String} vehicleId   spacecraft vehicle id
  * @apiParam {Number} numberOfItems  number of data elements to return
  * @apiParam {Array}  orbit trajectory array (array of longitutde, latitude)
  *
  * @apiSuccess {array} data array of orbit data points (which are a series of longitude and latitude data points, sometimes like a sine wave)
  *
  * @apiExample {curl} Example usage:
  * curl -X POST -H "Content-type: application/json" -d '{"_id":"56f315e98caf28f687483230","vehicleId":"IBEX","timestamp":1457726400,
  * "value": [ 10,20...]}'
  *  http://localhost:3000/services/v1/simulation/messaging/orbit/audacy.telemetry.position/3
  *
  * @apiSuccessExample Success-Response:
  *     HTTP/1.1 200 OK
  *     {"status":200,"message":"retrieve all orbit data points",
  * "data":[{"_id":"56f315e98caf28f687483230","vehicleId":"IBEX","timestamp":1457726400,
  * "value": [ 10,20...]}]}
  *
  * @apiError (Error 500) {json}  internal system error       The database is not ready to serve yet, e.g. after restart
  *
  * @apiErrorExample {json} Error-Response:
  *     HTTP/1.1 500 Internal system error encoutered
  * 
  *     {"message":"Internal system error encountered","type":"internal"}
  **/ 
  app.post('/services/v1/simulation/messaging/orbit/:topic/:nTimes', function(req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");

    var topic = req.params.topic;
    if (!topic || 0 === topic.length) {
      res.status(400);
      res.send(400, {status:400, message: 'Input error - message queue topic is empty',
         type:'client'});
    }

    var nTimes = parseInt(req.params.nTimes);
    if (nTimes > 9999) {
      res.send(400, {status:400, message: 'Input error - nTimes (number of items) need to be <= 9999.',
         type:'client'});
    };

    var mockDataSet = [];
    var nTimes = parseInt(req.params.nTimes);
    mockDataSet = helper.getOrbit(Math.random() * 0.2, Math.random() * 0.3, nTimes);
    publishToTopic(serverEndpoint, topic, mockDataSet);

    res.status(200);
    res.json( {"status": 200, "message": "generate test orbit data points to Audacy message queue",
      "data": mockDataSet} );
  });


  /**
  * @api {post} /services/v1/messaging/attitude/:topic  attitude/topic
  * @apiVersion 0.1.0
  * @apiName postAttitude(topic)
  * @apiDescription send attitude data points to MQ
  * @apiGroup Telemetry
  *
  * @apiParam {String} topic   RabbitMQ topic, e.g. audacy.telemetry.attitude, customer1.vehicle1.attitude
  * @apiParam {String} vehicleId spacecraft vehicle identifier
  * @apiParam {Number} q1 quaternion
  * @apiParam {Number} q2 quaternion
  * @apiParam {Number} q3 quaternion
  * @apiParam {Number} q4 quaternion
  *
  * @apiSuccess {array} data array of attitude quaternion q1/q2/q3/q4 data points
  *
  * @apiExample {curl} Example usage:
  * curl -X POST -H "Content-type: application/json" -d '{"_id":"56f312e98caf28f687482b5f","vehicleId":"IBEX","timestamp":1457726400,
  * "q1":0.651781,"q2":-0.29526,"q3":-0.268266,"q4":0.645009}'
  *  http://localhost:3000/services/v1/messaging/attitude/audacy.telemetry.position
  *
  * @apiSuccessExample Success-Response:
  *     HTTP/1.1 200 OK
  * {"status":200,"message":"upsert attitude data points",
  *    "data":[{"_id":"56f312e98caf28f687482b5f","vehicleId":"IBEX","timestamp":1457726400,
  *    "q1":0.651781,"q2":-0.29526,"q3":-0.268266,"q4":0.645009}]}
  *
  * @apiError (Error 500) {json}  internal system error       The database is not ready to serve yet, e.g. after restart
  *
  * @apiErrorExample {json} Error-Response:
  *     HTTP/1.1 500 Internal system error encoutered
  * 
  *     {"message":"Internal system error encountered","type":"internal"}
  **/
  app.post('/services/v1/messaging/attitude/:topic', function(req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");

    var topic = req.params.topic;
    if (!topic || 0 === topic.length) {
      res.status(400);
      res.send(400, {status:400, message: 'Input error - message queue topic is empty',
         type:'client'});
    }

    initiate(mqAccessConfig);
    publishToTopic(serverEndpoint, topic, req.body);

    res.status(200);
    res.json( {"status": 200, "message": "send attitude data points to Audacy message queue", "data": req.body} );
  });

  /**
  * @api {post} /services/v1/messaging/position/:topic  position/topic
  * @apiVersion 0.1.0
  * @apiName postPosition(topic)
  * @apiDescription send position data points to MQ
  * @apiGroup Telemetry
  *
  * @apiParam {String} topic   RabbitMQ topic, e.g. audacy.telemetry.position, customer1.vehicle1.position
  * @apiParam {String} vehicleId   spacecraft vehicle id
  * @apiParam {Number} x
  * @apiParam {Number} y
  * @apiParam {Number} z
  * @apiParam {Number} vx velocity for x
  * @apiParam {Number} vy velocity for y
  * @apiParam {Number} vz velocity for z
  *
  * @apiSuccess {array} data array of position data points (x,y,z,vx,vy,vz)
  *
  * @apiExample {curl} Example usage:
  * curl -X POST -H "Content-type: application/json" -d '{"_id":"56f3123e8caf28f687480f42","vehicleId":"IBEX","timestamp":1457640420,"x":236294.1956,
  * "y":116196.8879,"z":-34379.67682,"vx":-0.675287,"vy":0.508343,"vz":0.434496}'
  *  http://localhost:3000/services/v1/messaging/position/audacy.telemetry.position
  *
  * @apiSuccessExample Success-Response:
  *     HTTP/1.1 200 OK
  *     {"status":200,"message":"upsert position data points",
  * "data":[{"_id":"56f3123e8caf28f687480f42","vehicleId":"IBEX","timestamp":1457640420,"x":236294.1956,
  * "y":116196.8879,"z":-34379.67682,"vx":-0.675287,"vy":0.508343,"vz":0.434496}]}
  *
  * @apiError (Error 500) {json}  internal system error       The database is not ready to serve yet, e.g. after restart
  *
  * @apiErrorExample {json} Error-Response:
  *     HTTP/1.1 500 Internal system error encoutered
  * 
  *     {"message":"Internal system error encountered","type":"internal"}
  **/ 
  app.post('/services/v1/messaging/position/:topic', function(req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");

    var topic = req.params.topic;
    if (!topic || 0 === topic.length) {
      res.send(400, {status:400, message: 'Input error - message queue topic is empty',
         type:'client'});
    }

    initiate(mqAccessConfig);
    publishToTopic(serverEndpoint, topic, req.body);

    res.status(200);
    res.json( {"status": 200, "message": "send position data points to Audacy message queue", "data": req.body} );
  });

 /**
  * @api {post} /services/v1/messaging/vehicle/:topic  send vehicle data points to MQ
  * @apiVersion 0.1.0
  * @apiName postVehicle(topic)
  * @apiDescription 
  * @apiGroup Telemetry
  *
  * @apiParam {String} topic   RabbitMQ topic, e.g. audacy.telemetry.vehicle, customer1.vehicle1.vehicle
  * @apiParam {String} vehicleId   spacecraft vehicle id
  *
  * @apiParam {String} vehicleId   spacecraft vehicle id
  * @apiParam {Number} value, e.g. temperature value, battery level value
  * @apiParam {Number} calbiratin factor, e.g. T = 3*x - 4*x^2 + 2
  * @apiParam {Number} uom unit of measure
  * @apiParam {Number} alertHigh  threshold for high alert 
  * @apiParam {Number} warnHigh threshold for high warning
  * @apiParam {Number} alertLow  threshold for low alert 
  * @apiParam {Number} warnLow threshold for low warning
  * @apiParam {Number} deviceId device identifier
  *
  * @apiSuccess {array} data array of vehicle data points from sensors in the satellite , e.g. temperature value, warnHigh, alertHigh
  *
  * @apiExample {curl} Example usage:
  * curl -X POST -H "Content-type: application/json" -d '{"_id":"56f315e98caf28f687483228","vehicleId":"IBEX","timestamp":1457726400,
  * "value":315,"calibrationFactor":"T = 3*x - 4*x^2 + 2","uom":"Kelvin","alertHigh":330,
  * "warnHigh":321,"alertLow":280,"warnLow":274,"deviceId":"Battery01Temp"}'
  *  http://localhost:3000/services/v1/messaging/vehicle/audacy.telemetry.position
  *
  * @apiSuccessExample Success-Response:
  *     HTTP/1.1 200 OK
  *     {"status":200,"message":"retrieve all vehicle data points",
  * "data":[{"_id":"56f315e98caf28f687483228","vehicleId":"IBEX","timestamp":1457726400,
  * "value":315,"calibrationFactor":"T = 3*x - 4*x^2 + 2","uom":"Kelvin","alertHigh":330,
  * "warnHigh":321,"alertLow":280,"warnLow":274,"deviceId":"Battery01Temp"}]}
  *
  * @apiError (Error 500) {json}  internal system error       The database is not ready to serve yet, e.g. after restart
  *
  * @apiErrorExample {json} Error-Response:
  *     HTTP/1.1 500 Internal system error encoutered
  * 
  *     {"message":"Internal system error encountered","type":"internal"}
  **/
  app.post('/services/v1/messaging/vehicle/:topic', function(req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");

    var topic = req.params.topic;
    if (!topic || 0 === topic.length) {
      res.status(400);
      res.send(400, {status:400, message: 'Input error - message queue topic is empty',
         type:'client'});
    }

    initiate(mqAccessConfig);
    publishToTopic(serverEndpoint, topic, req.body);

    res.status(200);
    res.json( {"status": 200, "message": "send vehicle data points to Audacy message queue", "data": req.body} );
  });

  /**
  * @api {post} /services/v1/messaging/orbit/:topic  orbit/topic
  * @apiVersion 0.1.0
  * @apiName postOrbitSimulation(topic)
  * @apiDescription send orbit trajectory data points to MQ
  * @apiGroup Telemetry
  *
  * @apiParam {String} topic   RabbitMQ topic, e.g. audacy.telemetry.orbit, customer1.vehicle1.orbit
  * @apiParam {String} vehicleId   spacecraft vehicle id
  * @apiParam {Array}  orbit trajectory array (array of longitutde, latitude)
  *
  * @apiSuccess {array} data array of orbit data points (which are a series of longitude and latitude data points, sometimes like a sine wave)
  *
  * @apiExample {curl} Example usage:
  * curl -X POST -H "Content-type: application/json" -d '{"_id":"56f315e98caf28f687483230","vehicleId":"IBEX","timestamp":1457726400,
  * "value": [ 10,20...] }'
  *  http://localhost:3000/services/v1/messaging/orbit/audacy.telemetry.position
  *
  * @apiSuccessExample Success-Response:
  *     HTTP/1.1 200 OK
  *     {"status":200,"message":"retrieve all orbit data points",
  * "data":[{"_id":"56f315e98caf28f687483230","vehicleId":"IBEX","timestamp":1457726400,
  * "value": [ 10,20...]}]}
  *
  * @apiError (Error 500) {json}  internal system error       The database is not ready to serve yet, e.g. after restart
  *
  * @apiErrorExample {json} Error-Response:
  *     HTTP/1.1 500 Internal system error encoutered
  * 
  *     {"message":"Internal system error encountered","type":"internal"}
  **/ 
  app.post('/services/v1/messaging/orbit/:topic', function(req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");

    var topic = req.params.topic;
    if (!topic || 0 === topic.length) {
      status(400);
      res.send(400, {status:400, message: 'Input error - message queue topic is empty',
         type:'client'});
    }

    initiate(mqAccessConfig);
    publishToTopic(serverEndpoint, topic, req.body);

    res.status(200);
    res.json( {"status": 200, "message": "send orbit data points to Audacy message queue", "data": req.body} );
  });

  // retrieve message queue config, e.g. endpoints
  function initiate(mqAccessConfig) {
    // 7/20/2016 RayL: fix the confusion: mqAccessConfig.queue != virtual host
    /**
    serverEndpoint = "amqp://" + mqAccessConfig.user + ":" + mqAccessConfig.pass + "@" 
       + mqAccessConfig.server + "/" + mqAccessConfig.queue;
    **/
    serverEndpoint = systemSettings.serverEndpoint;
    console.log("server endpoint = " + serverEndpoint);
  }

  // publish to topic
  function publishToTopic(endpointURL, topic, payload) {
    console.log("EndpointURL=" + endpointURL + " and payload=" + JSON.stringify(payload));
    // send to MQ
    amqp.connect(endpointURL).then(function(conn) {
      return when(conn.createChannel().then(function(ch) {
        var ok = ch.assertExchange(ex, exType, {durable: true});
        return ok.then(function() {
          ch.publish(ex, topic, new Buffer(Base64.encode(JSON.stringify(payload)), "utf-8"));
          console.log(" [x] Sent %s:'%s'", topic, Base64.encode(JSON.stringify(payload)));
          return ch.close();
        });
      })).ensure(function() { conn.close(); })
    }).then(null, console.log);
  }

  // Base64 encode helper class
  var Base64={_keyStr:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
    encode:function(e){var t="";var n,r,i,s,o,u,a;var f=0;e=Base64._utf8_encode(e);while(f<e.length)
    {n=e.charCodeAt(f++);r=e.charCodeAt(f++);i=e.charCodeAt(f++);s=n>>2;o=(n&3)<<4|r>>4;u=(r&15)<<2|i>>6;a=i&63;
      if(isNaN(r)){u=a=64}else if(isNaN(i)){a=64}t=t+this._keyStr.charAt(s)+this._keyStr.charAt(o)+this._keyStr.charAt(u)
        +this._keyStr.charAt(a)}return t},
    decode:function(e){var t="";var n,r,i;var s,o,u,a;var f=0;
      e= ("" + e).replace(/[^A-Za-z0-9\+\/\=]/g,"");
      while(f<e.length)
      {s=this._keyStr.indexOf(e.charAt(f++));o=this._keyStr.indexOf(e.charAt(f++));
        u=this._keyStr.indexOf(e.charAt(f++));
        a=this._keyStr.indexOf(e.charAt(f++));
        n=s<<2|o>>4;r=(o&15)<<4|u>>2;i=(u&3)<<6|a;
        t=t+String.fromCharCode(n);
        if(u!=64){t=t+String.fromCharCode(r)}if(a!=64){t=t+String.fromCharCode(i)}}t=Base64._utf8_decode(t);
      return t},
    _utf8_encode:function(e){
      e = ("" + e).replace(/\r\n/g,"\n");
      var t="";for(var n=0;n<e.length;n++){var r=e.charCodeAt(n);
        if(r<128){t+=String.fromCharCode(r)}else if(r>127&&r<2048){t+=String.fromCharCode(r>>6|192);
          t+=String.fromCharCode(r&63|128)}else{t+=String.fromCharCode(r>>12|224);
          t+=String.fromCharCode(r>>6&63|128);
          t+=String.fromCharCode(r&63|128)}}return t} ,
    _utf8_decode:function(e)
    {var t="";var n=0;var r=c1=c2=0;while(n<e.length){r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r);
      n++}else if(r>191&&r<224){c2=e.charCodeAt(n+1);t+=String.fromCharCode((r&31)<<6|c2&63);
      n+=2}else{c2=e.charCodeAt(n+1);c3=e.charCodeAt(n+2);t+=String.fromCharCode((r&15)<<12|(c2&63)<<6|c3&63);n+=3}}return t}

  };
  // end Base64 encode helper class
  
// end of module
};
