var fs = require('fs');
var baseURL = './questions';

function writeQuestionDetails(data, url) {
   'use strict';

   fs.writeFile(url + '/' + data.questionID + '.html', 'File Created', function(err) {
      if (err) {
         throw err;
      }

      console.log('It\'s saved! in same location.');
   });
}

function checkPageDirectory(data) {
   'use strict';

   var url = baseURL + '/page-' + data.pageID;

   if (!fs.existsSync(url)) {
      fs.mkdirSync(url);
   }

   writeQuestionDetails(data, url);
}

function writeQuestionFile(data) {
   'use strict';

   checkPageDirectory(data);
   console.log('trying to create directory');
}

module.exports = writeQuestionFile;
