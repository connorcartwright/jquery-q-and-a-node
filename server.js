var http = require('http');
var qs = require('querystring');
var fs = require('fs');
var handleGetRequest = require('./src/requests/get');
var handlePostRequest = require('./src/requests/post');

var dir = './questions';

if (!fs.existsSync(dir)) {
   fs.mkdirSync(dir);
}

//
// Fs.writeFile('./tmp/test.txt', 'Hey there!', function(err) {
//    'use strict';
//
//    If (err) {
//       return console.log(err);
//    }
//
//    Console.log('The file was saved!');
// });

var PORT = 8080;

var requestListener = function(req, res) {
   'use strict';

   var body = '';
   var reqData = '';

   req.on('data', function(chunk) {
      body += chunk;
   });
   req.on('end', function() {
      reqData = qs.parse(body);

      switch(req.method) {
      case 'GET':
         handleGetRequest(req);
         break;
      case 'POST':
         handlePostRequest(reqData, function(response) {
            // To fix, would not accept vagrant.learn.jquery
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
            res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
            res.end(JSON.stringify(response));
         });
         break;
   }
   });
};

// Create server
var server = http.createServer(requestListener);

// Start server
server.listen(PORT, function() {
   'use strict';

   console.log('Server listening on: http://localhost:%s', PORT);
   require('./src/database/database').createTables();
});
