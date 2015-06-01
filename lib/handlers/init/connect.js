"use strict";

var config = require('../../../config/configuration.js');

module.exports.get = function get(req, res, next) {
  res.redirect(config.managerUrl + '/oauth/authorize?client_id=' + config.appId + '&redirect_uri=' + encodeURIComponent(config.serverUrl + '/init/callback' + '?state=' + req.query.state));
  next();
};
