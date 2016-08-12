var fs = require('fs');
var baseURL = './questions';

function buildQuestionPage(data) {
   'use strict';

   data = 'hello';

   return 'File Created!';
}

function writeQuestionDetails(data, url) {
   'use strict';

   fs.writeFile(url + '/' + data.questionID + '.html', buildQuestionPage(data), function(err) {
      if (err) {
         throw err;
      }

      console.log('Saved!');
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
}

module.exports = writeQuestionFile;
