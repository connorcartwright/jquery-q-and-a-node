var http = require('http');
var qs = require('querystring');

var database = require('./database/database');

var PORT = 8080;

function handleGetRequest(data) {
   'use strict';

   data = data;
   console.log('GET REQUEST');
}

function addMultipleChoiceAnswers(questionTypeArea, questionID) {
   'use strict';

   for(var i = 0; i < questionTypeArea.length; i++) {
      var option = questionTypeArea[i];

      database.answerQueries.addMultipleChoiceAnswer(questionID, option.text, option.correct);
   }
}

function addCodingAnswers(questionTypeArea, questionID) {
   'use strict';

   for(var i = 0; i < questionTypeArea.length; i++) {
      var inputOutput = questionTypeArea[i];

      database.answerQueries.addCodingAnswer(questionID, inputOutput.input, inputOutput.output);
   }
}

function updateQuestionAnswers(questionData, oldQuestionType) {
   'use strict';

   var questionID = questionData.questionID;
   var questionTypeArea = JSON.parse(questionData.questionTypeArea);

   if (oldQuestionType === 'Multiple Choice') {
      database.answerQueries.removeMultipleChoiceAnswers(questionID, function() {
         addMultipleChoiceAnswers(questionTypeArea, questionID);
      });
   } else {
      database.answerQueries.removeCodingAnswers(questionID, function() {
         addCodingAnswers(questionTypeArea, questionID);
      });
   }
}

function updateQuestion(questionData, oldQuestionType) {
   'use strict';

   database.questionQueries.updateQuestion(questionData, function() {
      updateQuestionAnswers(questionData, oldQuestionType);
   });
}

function loopQuestions(question, callback) {
   'use strict';

   if (question.QuestionType === 'Multiple Choice') {
      database.answerQueries.getMultipleChoiceAnswers(question.QuestionID, function(answers) {
         callback(answers);
      });
   } else {
      database.answerQueries.getCodingAnswers(question.QuestionID, function(answers) {
         callback(answers);
      });
   }
}

function handlePostRequest(reqData, callback) {
   'use strict';

   switch(reqData.action) {
   case 'addPage':
      database.pageQueries.addPage(reqData.id, reqData.title);
      var response = {
         status: 200,
         success: 'Added Successfully'
      };

      return callback(response);
   case 'addQuestion':
      if (reqData.questionID) {
         database.questionQueries.getQuestionType(reqData.questionID, function(oldQuestionType) {
            updateQuestion(reqData, oldQuestionType);
         });
      } else {
         database.questionQueries.addQuestion(reqData, function(questionID) {
            if (reqData.questionType === 'Multiple Choice') {
               addMultipleChoiceAnswers(JSON.parse(reqData.questionTypeArea), questionID);
            } else {
               addCodingAnswers(JSON.parse(reqData.questionTypeArea), questionID);
            }
         });
      }

      break;
   case 'getQuestionCount':
      database.pageQueries.pageCount(reqData.id, function(result) {
         var response = {
            status: 200,
            success: 'Retrieved Successfully',
            pageCount: result[0].PageCount
         };

         return callback(response);
      });
      break;
   case 'getQuestionsForPage':
      database.pageQueries.getPageQuestions(reqData.id, function(questions) {
         var i = 0;
         var loopQ = function(questions) {
            loopQuestions(questions[i], function(answers) {
               questions[i].Answers = answers;

               if (i < questions.length - 1) {
                  i++;
                  loopQ(questions);
               } else {
                  var response = {
                     status: 200,
                     success: 'Retrieved Successfully',
                     questions: questions
                  };

                  return callback(response);
               }
            });
         };

         loopQ(questions);
      });
      break;
}
}

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
   require('./database/database').createTables();
});
