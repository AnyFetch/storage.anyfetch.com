"use strict";

var restify = require("restify");
var config = require("../../../config/");

module.exports.post = function post(req, res, next) {
  if(!req.files || !req.files.file) {
    return next(new restify.MissingParameterError("Expected a file :("));
  }

  var fileId = req.files.file.path.replace(config.storageDir, "");

  res.send({
    url: config.storageUrl + "/files" + fileId
  });
  next();
};
