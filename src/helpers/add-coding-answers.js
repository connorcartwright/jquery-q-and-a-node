
var database = require('../database/database');

function addCodingAnswers(questionTypeArea, questionID) {
   'use strict';

   for(var i = 0; i < questionTypeArea.length; i++) {
      var inputOutput = questionTypeArea[i];

      database.answerQueries.addCodingAnswer(questionID, inputOutput.input, inputOutput.output);
   }

   var response = {
      status: 200,
      questionID: questionID,
      success: 'Question Added Successfully'
   };

   return response;
}

module.exports = addCodingAnswers;
