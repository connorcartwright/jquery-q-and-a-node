
var addMultipleChoiceAnswers = require('../../helpers/add-multiple-choice-answers');
var addCodingAnswers = require('../../helpers/add-coding-answers');
var createQuestionPage = require('../../helpers/create-question-page');

function updateQuestionAnswers(database, questionData, oldQuestionType) {
   'use strict';

   var questionID = questionData.questionID;
   var questionTypeArea = JSON.parse(questionData.answers);

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

function updateQuestion(database, questionData, oldQuestionType) {
   'use strict';

   database.questionQueries.updateQuestion(questionData, function() {
      updateQuestionAnswers(database, questionData, oldQuestionType);
   });

   var response = {
      status: 200,
      success: 'Question Updated Successfully'
   };

   createQuestionPage(questionData.questionID);

   return response;
}

function editQuestion(database, reqData, callback) {
   'use strict';

   database.questionQueries.getQuestionType(reqData.questionID, function(oldQuestionType) {
      return callback(updateQuestion(database, reqData, oldQuestionType));
   });
}

module.exports = editQuestion;
