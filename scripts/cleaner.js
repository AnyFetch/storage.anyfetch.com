"use strict";
var fs = require("fs");
var async = require("async");

var config = require('../config');

/**
 * Remove all files created before "olderThan" date
 */
module.exports = function cleanFolder(olderThan, cb) {
  fs.readdir(config.storageDir, function(err, files) {
    if(err) {
      return cb(err);
    }

    files = files.map(function(file) {
      return config.storageDir + "/" + file;
    });
    async.eachSeries(files, function(file, cb) {
      fs.stat(file, function(err, stat) {
        if(err) {
          return cb(err);
        }

        // Is it older than specified date? If so, remove.
        if(stat.mtime.getTime() < olderThan.getTime()) {
          fs.unlink(file, cb);
        }
        else {
          cb();
        }
      });
    }, cb);
  });


};
