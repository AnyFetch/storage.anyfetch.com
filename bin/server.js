#!/bin/env node
"use strict";
require("newrelic");


var config = require("../config/configuration.js");
var server = require('../app.js');

server.listen(config.port, function() {
  console.log("server listening on port " + config.port);
});
