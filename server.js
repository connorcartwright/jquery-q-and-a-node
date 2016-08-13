var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var fs = require('fs');

var handlePostRequest = require('./src/requests/post');

app.use(bodyParser.urlencoded({
   extended: false
}));

app.use(bodyParser.json());

var questionPageDirectory = './questions';

if (!fs.existsSync(questionPageDirectory)) {
   fs.mkdirSync(questionPageDirectory);
}

var PORT = process.env.PORT || 8080;

console.log('Server listening at port ' + PORT);

app.listen(PORT);

app.get('/questions/', function(req, res) {
   'use strict';

   var pageID = req.query.pageID;
   var questionID = req.query.questionID;

   console.log('GET REQUEST');
   console.log(req.url);
   console.log(req.query.pageID);
   console.log(req.query.questionID);
   console.log('GET REQUEST');

   res.sendFile(__dirname + '/questions/page-' + pageID + '/' + questionID + '.html');
});

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

