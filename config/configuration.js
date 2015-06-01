'use strict';

var Anyfetch = require('anyfetch');

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

var managerUrl = process.env.MANAGER_URL || 'https://manager.anyfetch.com';
var apiUrl = process.env.API_URL || 'https://api.anyfetch.com';
var apiId =  process.env.ANYFETCH_API_ID;
var apiSecret = process.env.ANYFETCH_API_SECRET;

if(nodeEnv === 'test') {
  managerUrl = 'http://localhost:8001';
  apiUrl = 'http://localhost:8002';
  apiId = 'test';
  apiSecret = 'test';
}

Anyfetch.setApiUrl(apiUrl);
Anyfetch.setManagerUrl(managerUrl);

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

  appId: apiId,
  appSecret: apiSecret,

  serverUrl: process.env.SERVER_URL || 'http://localhost:' + port,
  managerUrl: managerUrl,
  apiUrl: apiUrl,

  doneEndpoint: process.env.DONE_ENDPOINT || 'https://localhost/done/',
  doneEndpointv2: 'http://chrome.anyfetch.com/?token=',

  services: services
};
