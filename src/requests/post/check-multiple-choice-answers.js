
function checkMultipleChoiceAnswers(database, reqData, callback) {
   'use strict';

   database.answerQueries.getMultipleChoiceAnswers(reqData.questionID, function(data) {
      console.log(data);

      var options = JSON.parse(reqData.options);

      console.log(options);
      console.log('yaaay');

      var passed = true;

      for(var i = 0; i < data.length; i++) {
         if (data[i].correct !== options[i]) {
            passed = false;
            break;
         }
      }

      var response = {
         status: 200,
         success: passed
      };

      callback(response);
   });
}

module.exports = checkMultipleChoiceAnswers;
