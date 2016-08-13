var fs = require('fs');
var baseURL = './questions';

function createMultipleChoiceOption(optionText) {

}

function createTypeArea(questionType, answers) {
   'use strict';

   var r = '';

   if (questionType === 'Multiple Choice') {
      answers = JSON.parse(answers);

      for(var i = 0; i < answers.length; i++) {
         r += '<div class="multiple-choice-option"></div><span>' + answers[i].optionText + '</span>';
      }
   }

   return r;
}

function buildQuestionPage(data) {
   'use strict';

   var body = '<body><h1>' + data.questionType + ' Question</h1><h2>' + data.questionName +
     '</h2><p>' + data.questionStatement + '</p>' + createTypeArea(data.questionType, data.answers) + '</body>';

   var html = '<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"><title>' + data.questionName + '</title>' +
     '<link rel="stylesheet" href="../css/style.css"><script src="script.js"></script></head>' +
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
