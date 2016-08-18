
function checkCodingAnswers(database, reqData, callback) {
   'use strict';

   database.answerQueries.getCodingOutputs(reqData.questionID, function(data) {
      var output = JSON.parse(reqData.output);
      var result = [];
      var passed = true;

      for(var i = 0; i < data.length; i++) {
         if (data[i].output !== output[i]) {
            result.push(false);
            passed = false;
         } else {
            result.push(true);
         }
      }

      var response = {
         status: 200,
         success: passed,
         response: result
      };

      callback(response);
   });
}

module.exports = checkCodingAnswers;
