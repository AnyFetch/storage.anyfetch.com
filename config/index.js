'use strict';
/**
 * @file Defines the app settings.
 *
 * Will set the path to Mongo, and applications id
 * Most of the configuration can be done using system environment variables.
 */

// Load environment variables from .env file
var dotenv = require('dotenv');
dotenv.load();

// nodeEnv can either be "development" or "production"
var nodeEnv = process.env.NODE_ENV || "development";
var port = process.env.PORT || 8000;

var storageUrl = process.env.STORAGE_URL || 'https://storage.anyfetch.com';

// Third party services
var services = {};
services.opbeat = {
  organization_id: process.env.OPBEAT_ORG_ID,
  app_id: process.env.OPBEAT_APP_ID,
  secret_token: process.env.OPBEAT_TOKEN,
  silent: true,
};

// Exports configuration
module.exports = {
  env: nodeEnv,
  port: port,

  storageUrl: storageUrl,

  services: services
};
