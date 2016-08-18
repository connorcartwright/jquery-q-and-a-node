var fs = require('fs');
var baseURL = './questions';
var cheerio = require('cheerio');

function createHintArea(hints, $) {
   'use strict';

   var $hintArea = $('.qa-hints-area');

   for(var i = 0; i < hints.length; i++) {
      var $hint = $hintArea.find('.js-hint-' + (i + 1));

      $hint.attr('data-hint-text', hints[i]);
   }

   $hintArea.find('.qa-hint-text').text(hints[0]);
}

function createMultipleChoiceArea(answers, $) {
   'use strict';

   $('.qa-question-type-area.multiple-choice').insertAfter($('.qa-question-statement'));

   for(var i = 0; i < answers.length; i++) {
      var $option = '';

      if (i === 0) {
         $option = $('.multiple-choice-option');
         $option
           .find('.mc-option-text span')
           .text(answers[i].optionText);
      } else {
         $option = $('.multiple-choice-option').first().clone();
         $option
           .find('.mc-option-text span')
           .text(answers[i].optionText)
           .end()
           .insertAfter($('.multiple-choice-option').last());
      }
   }
}

function createCodingArea(answers, $) {
   'use strict';

   $('.qa-question-type-area.coding').insertAfter($('.qa-question-statement'));

   var hidden = Math.ceil(answers.length / 2);

   for(var j = 0; j < answers.length; j++) {
      var $test = '';

      if (j === 0) {
         console.log(answers[j].input);
         $test = $('.test');
         $test
           .find('.test-name')
           .text('Test ' + (j + 1))
           .end()
           .find('.input span')
           .text(answers[j].input)
           .end()
           .find('.expected-output span')
           .text(answers[j].output)
           .end();
      } else {
         $test = $('.test').first().clone();

         if (j >= hidden) {
            console.log('WOOHOOOO');
            $test
              .find('.expected-output')
              .addClass('qa-hidden');
         }

         $test
           .find('.test-name')
           .text('Test ' + (j + 1))
           .end()
           .find('.input span')
           .text(answers[j].input)
           .end()
           .find('.expected-output span')
           .text(j >= hidden ? 'hidden' : answers[j].output)
           .end()
           .insertAfter($('.test').last());
      }
   }
}

function createTypeArea(data, $) {
   'use strict';

   var answers = JSON.parse(data.answers);

   if (data.questionType === 'Multiple Choice') {
      createMultipleChoiceArea(answers, $);
   } else {
      createCodingArea(answers, $);
      $('.qa-coding').attr('data-code', data.questionCode);
   }
}

function getScripts(questionType) {
   'use strict';

   var scripts = '<script src="https://code.jquery.com/jquery-2.2.4.min.js"></script>';

   if (questionType !== 'Multiple Choice') {
      scripts += '<script src="https://cdn.jsdelivr.net/ace/1.2.3/min/ace.js"></script>';
      scripts += '<script src="../js/coding.js"></script>';
   } else {
      scripts += '<script src="../js/multiple-choice.js"></script>';
   }

   scripts += '<script src="../js/script.js"></script>';

   return scripts;
}

function createBody(data, $) {
   'use strict';

   $('.qa-question')
     .attr('data-pageID', data.pageID)
     .attr('data-questionID', data.questionID)
     .find('.qa-question-header')
     .text(data.questionType + ' Question')
     .end()
     .find('.qa-question-name')
     .text(data.questionName)
     .end()
     .find('.qa-question-statement')
     .text(data.questionStatement)
     .end();

   createTypeArea(data, $);
   createHintArea(data.questionHints, $);

   var body = '<body>' + $('.container').html() +
     getScripts(data.questionType) + '</body>';

   return body;
}

function createPage(data, $) {
   'use strict';

   var html = '<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"><title>' + data.questionName + '</title>' +
     '<link rel="stylesheet" href="../css/style.css">' +
     '<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css"></head>';

   html += createBody(data, $);

   return html;
}

function buildQuestionPage(questionData, callback) {
   'use strict';

   fs.readFile('questions/template.html', 'utf8', function(err, data) {
      if (err) {
         return console.log(err);
      } else {
         callback(createPage(questionData, cheerio.load(data)));
      }
   });
}

function writeQuestionDetails(data, url) {
   'use strict';

   buildQuestionPage(data, function(page) {
      fs.writeFile(url + '/' + data.questionID + '.html', page, function(err) {
         if (err) {
            throw err;
         }

         console.log('Saved!');
      });
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
