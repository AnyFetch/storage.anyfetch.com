"use strict";
/**
 * @file Defines the routes available on the server
 *
 * Will define all availables exposed HTTP paths, and their methods (GET / POST / ...).
 */
var lib = require('../lib/');
var handlers = lib.handlers;

// Routes client requests to handlers
module.exports = function(server) {
  server.post('/files', handlers.files.index.post);
  server.get('/files/:id', handlers.files.id.index.get);
  server.del('/files/:id', handlers.files.id.index.del);
};
