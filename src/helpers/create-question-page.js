var fs = require('fs');
var baseURL = './questions';

// Function createTypeArea(questionType, answers) {
//
// }

function buildQuestionPage(data) {
   'use strict';

   var body = '<body><h1>' + data.questionType + ' Question</h1><h2>' + data.questionName +
     '</h2><p>' + data.questionStatement + '</p></body>';

   var html = '<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"><title>' + data.questionName + '</title>' +
     '<link rel="stylesheet" href="css/style.css"><script src="script.js"></script></head>' +
     body + '</html>';

   return html;
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
