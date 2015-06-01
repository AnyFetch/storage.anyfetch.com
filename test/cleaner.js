"use strict";

require("should");

var request = require("supertest");

var server = require('../app');
var config = require("../config");
var cleaner = require('../lib/cleaner');

describe("Cleaner script", function() {
  var fileUrl;

  before(function sendFile(done) {
    request(server)
      .post('/files')
      .attach('file', __filename)
      .expect(200)
      .expect(function(res) {
        res.body.should.have.property("url");
        fileUrl = res.body.url;
      })
      .end(done);
  });

  it("should clean files without errors", function(done) {
    cleaner(new Date(), done);
  });

  it("should have removed files", function(done) {
    request(server)
      .get(fileUrl.replace(config.storageUrl, ''))
      .expect(404)
      .end(done);
  });
});
