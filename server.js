var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var fs = require('fs');

require('./src/database/database').createTables();
var handlePostRequest = require('./src/requests/post');

app.use(bodyParser.urlencoded({
   extended: false
}));

app.use(bodyParser.json());

app.use('/', express.static(__dirname + '/'));

var questionPageDirectory = './questions';

if (!fs.existsSync(questionPageDirectory)) {
   fs.mkdirSync(questionPageDirectory);
}

var PORT = process.env.PORT || 8080;

console.log('Server listening at port ' + PORT);

app.listen(PORT);

var requestListener = function(req, res) {
   'use strict';

   handlePostRequest(req.body, function(response) {
      // To fix, would not accept vagrant.learn.jquery
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
      res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
      res.end(JSON.stringify(response));
   });
};

app.post('/', function(req, res) {
   'use strict';

   requestListener(req, res);
});

