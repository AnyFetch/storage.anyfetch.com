"use strict";
var fs = require("fs");
var restify = require("restify");

var config = require('../../../../config');


module.exports.get = function get(req, res, next) {
  if(req.params.id.match(/[^a-f0-9]/)) {
    return next(new restify.InvalidArgumentError("ID must be an hexadecimal hash"));
  }

  var documentId = req.params.id;
  var documentPath = config.storageDir + "/" + documentId;

  fs.stat(documentPath, function(err, stats) {
    if(err) {
      return next(new restify.NotFoundError("Document does not exist"));
    }

    res.setHeader('Content-Length', stats.size);
    fs.createReadStream(documentPath).pipe(res);
    next();

  });
};


module.exports.del = function del(req, res, next) {
  if(req.params.id.match(/[^a-f0-9]/)) {
    return next(new restify.InvalidArgumentError("ID must be an hexadecimal hash"));
  }

  var documentId = req.params.id;
  var documentPath = config.storageDir + "/" + documentId;

  fs.unlink(documentPath, function(err) {
    if(err) {
      return next(new restify.NotFoundError("Document does not exist"));
    }

    res.send(204);
    next();

  });
};
