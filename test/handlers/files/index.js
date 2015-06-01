"use strict";

require("should");

var request = require("supertest");

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
      request(server)
        .post('/files')
        .attach('file', __filename)
        .expect(200)
        .expect(function(res) {
          res.body.should.have.property('url');
          res.body.url.should.containDeep(config.storageUrl);
        })
        .end(next);
    });
  });
});
