function deleteQuestion(database, questionID, callback) {
   'use strict';

   database.questionQueries.deleteQuestion(questionID);

   var response = {
      status: 200,
      success: 'Question deleted successfully'
   };

   return callback(response);
}

module.exports = deleteQuestion;
