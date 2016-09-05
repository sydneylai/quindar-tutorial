// Program: analyticsTestCases.js
// Purpose: Testing using mocha
// Author:  Shalini Negi
// Updated: Jul 12, 2016
// License: MIT license

process.env.NODE_ENV = 'test';
var chai = require('chai');
var chaiHttp = require('chai-http');
var mongoose = require("mongoose");
var should = chai.should();
var url = require('url');
chai.use(chaiHttp);
var supertest = require("supertest");
var systemSettings = require('../config/systemSettings');

var platform = systemSettings.platform;
var port = systemSettings.port;
var host= "http://" + platform + ':' + port;
var server = supertest.agent(host);

// *** UNIT test begin ***//

// *** GET - REST API For Analytics - attitude metrics total count  ***//
describe(" GET - REST API For Analytics attitude metrics total count", function() {
    // #1 200 should return all total count
    it("GET /services/v1/admin/metrics/attitude/total/all - should return 200", function (done) {
        server
            .get("/services/v1/admin/metrics/attitude/total/all")
            .end(function (err, res) {
                //console.log (res.should.have);
                res.status.should.equal(200);
                res.body.message.should.equal("Quindar attitude metrics updated successfully.");
                res.body.message.should.not.equal("retrieve all attitude metrics");
                res.body.should.have.property("message");
                res.body.should.have.property("collection");
                res.body.should.have.property("count");
                res.body.collection.should.equal("attitude");
                done();
            });
    });
});

// *** GET - REST API For Telemetry position ***//
describe('GET - REST API For Telemetry attitude by vehicleId and timestamp', function() {
    it('GET /services/v1/position', function(done) {
        server
            .get('/services/v1/position')
            .end(function(err, res){
                //console.log(res.should.have);
                res.should.be.json;
                res.body.should.have.property('status');
                res.body.should.have.property('message');
                res.body.should.have.property('data');
                res.body.message.should.equal("retrieve all position data points");
                res.body.message.should.not.equal("retrieve all attitude telemetry");
                done();
            });
    });
});