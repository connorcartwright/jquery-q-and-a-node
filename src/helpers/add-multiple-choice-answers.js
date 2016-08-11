
var database = require('../database/database');

function addMultipleChoiceAnswers(questionTypeArea, questionID) {
   'use strict';

   for(var i = 0; i < questionTypeArea.length; i++) {
      var option = questionTypeArea[i];

      database.answerQueries.addMultipleChoiceAnswer(questionID, option.optionText, option.correct);
   }

   var response = {
      status: 200,
      questionID: questionID,
      success: 'Question Added Successfully'
   };

   return response;
}

module.exports = addMultipleChoiceAnswers;