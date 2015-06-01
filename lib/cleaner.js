"use strict";
var fs = require("fs");

var config = require('../config');

/**
 * Remove all files created before "olderThan" date
 */
module.exports = function cleanFolder(olderThan) {
    fs.readdir(config.storageDir, function(files) {
      files = files.map(function(file) {
        return storageDir + "/" + file;
      });
    });
};
