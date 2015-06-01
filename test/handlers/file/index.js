"use strict";

require("should");

var async = require("async");
var request = require("supertest");
var fs = require("fs");

var server = require('../../../app');
var config = require("../../../config");


describe("/files endpoint", function() {
  describe("POST /files", function() {
    it("should fail when no file is specified", function(next) {
      request(server)
        .post('/files')
        .expect(409)
        .expect(/expected a file/i)
        .end(next);
    });

    it("should return an identifier when the upload succeeds", function(next) {
      async.waterfall([
        function send(cb) {
          request(server)
            .post('/files')
            .attach('file', __filename)
            .expect(200)
            .end(cb);
        },
        function retrieve(res, body, cb) {
          body.should.have.property('url');
          var contentUrl = body.url;

          request(server)
            .get(contentUrl.replace(config.storageUrl, ''))
            .expect(200)
            .expect(function(res) {
              res.body.should.eql(fs.readFileSync(__filename));
            })
            .end(cb);
        }
      ], next);

    });
  });
});
