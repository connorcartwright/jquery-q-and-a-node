
function checkMultipleChoiceAnswers(database, reqData, callback) {
   'use strict';

   database.answerQueries.getMultipleChoiceAnswers(reqData.questionID, function(data) {
      console.log(data);

      var options = JSON.parse(reqData.options);

      console.log(options);
      console.log('yaaay');

      var passed = true;
      var numCorrect = 0;

      for(var i = 0; i < data.length; i++) {
         if (data[i].correct !== options[i]) {
            passed = false;
         } else {
            numCorrect++;
         }
      }

      var response = {
         status: 200,
         success: passed,
         numCorrect: numCorrect
      };

      callback(response);
   });
}

module.exports = checkMultipleChoiceAnswers;
