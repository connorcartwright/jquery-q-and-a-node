var addMultipleChoiceAnswers = require('../../helpers/add-multiple-choice-answers');
var addCodingAnswers = require('../../helpers/add-coding-answers');

function addQuestion(database, reqData, callback) {
   'use strict';

   database.questionQueries.addQuestion(reqData, function(questionID) {
      if (reqData.questionType === 'Multiple Choice') {
         return callback(addMultipleChoiceAnswers(JSON.parse(reqData.answers), questionID));
      } else {
         return callback(addCodingAnswers(JSON.parse(reqData.answers), questionID));
      }
   });
}

module.exports = addQuestion;
