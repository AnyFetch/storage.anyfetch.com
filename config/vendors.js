'use strict';

/**
 * @file Load and init external services
 */

var config = require('../config');

var opbeat = require('opbeat');
module.exports.opbeat = opbeat(config.services.opbeat);
