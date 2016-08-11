
var database = require('../database/database');

function handleGetRequest(data) {
   'use strict';

   data = database;

   console.log('GET REQUEST');
}

module.exports = handleGetRequest;
