"use strict";

require("should");

var request = require("supertest");
var fs = require("fs");

var server = require('../../../../app');
var config = require("../../../../config");


describe("/files/:id endpoint", function() {
  var fileUrl;

  before(function sendFile(next) {
    request(server)
      .post('/files')
      .attach('file', __filename)
      .expect(200)
      .expect(function(res) {
        res.body.should.have.property("url");
        fileUrl = res.body.url;
      })
      .end(next);
  });

  describe("GET /files/:id", function() {
    it("should fail on invalid identifier", function(next) {
      request(server)
        .get('/files/unknown-id')
        .expect(409)
        .end(next);
    });

    it("should fail on unknown identifier", function(next) {
      request(server)
        .get('/files/123456')
        .expect(404)
        .end(next);
    });

    it("should return the file", function(next) {
      request(server)
        .get(fileUrl.replace(config.storageUrl, ''))
        .expect(200)
        .expect(function(res) {
          res.text.should.eql(fs.readFileSync(__filename, 'binary').toString());
        })
        .end(next);
    });
  });

  describe("DELETE /files/:id", function() {
    it("should fail on invalid identifier", function(next) {
      request(server)
        .del('/files/unknown-id')
        .expect(409)
        .end(next);
    });

    it("should fail on unknown identifier", function(next) {
      request(server)
        .del('/files/123456')
        .expect(404)
        .end(next);
    });


    it("should return 204 after deletion", function(next) {
      request(server)
        .del(fileUrl.replace(config.storageUrl, ''))
        .expect(204)
        .end(next);
    });

    it("should not be available anymore", function(next) {
      request(server)
        .get(fileUrl.replace(config.storageUrl, ''))
        .expect(404)
        .end(next);
    });
  });
});
