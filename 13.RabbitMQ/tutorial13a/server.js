// Program: server.js
// Purpose: receive from MQ topic, and insert into database
// Authors:  Shalini Negi, Ray Lai
// Updated: Jul 20, 2016
//
var fs = require("fs");
var amqp = require('amqplib');
var basename = require('path').basename;
var all = require('when').all;
var Client = require('node-rest-client').Client;

/**
var syslogger = require('morgan');
var logger = require('winston');
var FileStreamRotator = require('file-stream-rotator');
**/

var systemSettings = require('./config/systemSettings.js');
var serverEndpoint = systemSettings.serverEndpoint;
var ex = systemSettings.exchange;
var exType = systemSettings.exchangeType;
var payload = "";
var platformClientSystem = require('./config/mqClientSettings.js');
var platform = platformClientSystem.platform;
var port = platformClientSystem.port;
var servicePosition = "http://" + platform + ':' + port + "/services/v1/position";
var serviceAttitude = "http://" + platform + ':' + port + "/services/v1/attitude";
var serviceVehicle = "http://" + platform + ':' + port + "/services/v1/vehicle";

// syntax: server.js <topic>
// where keys = topic
var keys = process.argv.slice(2);
if (keys.length < 1) {
    console.log('Usage: %s topic [payloadType]',
        basename(process.argv[1]));
    console.log(' where topic can be audacy.telemetry.position, audacy.telemetry.attitude, audacy.telemetry.vehicles');
    console.log(' where payloadType 1=position, 2=attitude, 3=vehicles');
    process.exit(1);
}

var payloadType = process.argv.slice(2);

if (payloadType[1] === undefined) {
    // throws errors
}
var serviceURL = "http://" + platform + ':' + port + "/services/v1/" + payloadType[1];


/**
// system logging
var logDirectory = __dirname + '/log';
var accessLogStream = FileStreamRotator.getStream({
  date_format: 'YYYYMMDD',
  filename: logDirectory + '/access-%DATE%.log',
  frequency: 'daily',
  verbose: false
});
app.use(syslogger('combined', {stream: accessLogStream}));
**/

console.log('ServiceURL=' + serviceURL);

// - read mq access config
var opt = {};

// main logic
//initiate(mqAccessConfig);
subscribeFromTopic(serverEndpoint);

// receive from MQ
function subscribeFromTopic(endpointURL){
    amqp.connect(endpointURL).then(function(conn) {
        process.once('SIGINT', function() { conn.close(); });
        return conn.createChannel().then(function(ch) {
            var ok = ch.assertExchange(ex, exType, {durable: true});
            
            ok = ok.then(function() {
                return ch.assertQueue(payloadType[1] //, {exclusive: true}
                 );
            });

            ok = ok.then(function() {
                return ch.prefetch(1);
            });

            ok = ok.then(function(qok) {
                var queue = qok.queue;
                return all(keys.map(function(rk) {
                    ch.bindQueue(queue, ex, rk);
                })).then(function() { return queue; });
            });


            ok = ok.then(function(queue) {
                 return ch.consume(queue, function(msg) { //consumes the queue
                     if (msg !== null) {
                         payload = Base64.decode(msg.content.toString());
                         upsert(serviceURL, payload);
                         console.log(msg.content.toString());
                         console.log(" [x] topic=%s:  mq sees='%s' ",
                                       msg.fields.routingKey,
                                       payload);
                         ch.ack(msg);
                     }
                 }, {noAck: false});
            });
            return ok.then(function() {
                console.log(' [*] Waiting for logs. To exit press CTRL+C.');
            });

            // function logMessage(msg) {
            //     //payload = Base64.decode(msg.content.toString());
            //
            //     if(msg !==null) {
            //         payload = msg.content.toString();
            //         upsert(serviceURL, payload);
            //         console.log("...raw content [decode]=" + payload);
            //         console.log("...stringify=" + payload);
            //         console.log(" [x] topic=%s:  mq sees='%s' ",
            //             msg.fields.routingKey,
            //             payload);
            //     }
            //
            // }

        });
    }).then(null, console.warn);
};

// upsert into database
function upsert(serviceURL, payload) {
    var client = new Client();
    var args = {
        "data": payload,
        "headers": { "Content-Type": "application/json" }
    };
    console.log(serviceURL);
    client.post(serviceURL, args, function (data, response) {
        // parsed response body as js object
        //console.log(data);
        // raw response
        //console.log(response);
    });

}

// Base64 encode helper class
var Base64={_keyStr:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
    encode:function(e){var t="";var n,r,i,s,o,u,a;var f=0;e=Base64._utf8_encode(e);while(f<e.length)
    {n=e.charCodeAt(f++);r=e.charCodeAt(f++);i=e.charCodeAt(f++);s=n>>2;o=(n&3)<<4|r>>4;u=(r&15)<<2|i>>6;a=i&63;
        if(isNaN(r)){u=a=64}else if(isNaN(i)){a=64}t=t+this._keyStr.charAt(s)+this._keyStr.charAt(o)+this._keyStr.charAt(u)
        +this._keyStr.charAt(a)}return t},
      decode:function(e){var t="";var n,r,i;var s,o,u,a;var f=0;
        e= e.replace(/[^A-Za-z0-9\+\/\=]/g,"");
          while(f<e.length)
        {s=this._keyStr.indexOf(e.charAt(f++));o=this._keyStr.indexOf(e.charAt(f++));
            u=this._keyStr.indexOf(e.charAt(f++));
            a=this._keyStr.indexOf(e.charAt(f++));
            n=s<<2|o>>4;r=(o&15)<<4|u>>2;i=(u&3)<<6|a;
            t=t+String.fromCharCode(n);
            if(u!=64){t=t+String.fromCharCode(r)}if(a!=64){t=t+String.fromCharCode(i)}}t=Base64._utf8_decode(t);
            return t},
       _utf8_encode:function(e){e=e.replace(/\r\n/g,"\n");
            var t="";for(var n=0;n<e.length;n++){var r=e.charCodeAt(n);
            if(r<128){t+=String.fromCharCode(r)}else if(r>127&&r<2048){t+=String.fromCharCode(r>>6|192);
                t+=String.fromCharCode(r&63|128)}else{t+=String.fromCharCode(r>>12|224);
                t+=String.fromCharCode(r>>6&63|128);
                t+=String.fromCharCode(r&63|128)}}return t},
        _utf8_decode:function(e)
        {var t="";var n=0;var r=c1=c2=0;while(n<e.length){r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r);
        n++}else if(r>191&&r<224){c2=e.charCodeAt(n+1);t+=String.fromCharCode((r&31)<<6|c2&63);
        n+=2}else{c2=e.charCodeAt(n+1);c3=e.charCodeAt(n+2);t+=String.fromCharCode((r&15)<<12|(c2&63)<<6|c3&63);n+=3}}
        return t }
    };

// export modules for reusability
exports.subscribeFromTopic = subscribeFromTopic; 

