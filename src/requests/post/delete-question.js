var fs = require('fs');

function deleteQuestion(database, questionID, pageID, callback) {
   'use strict';

   database.questionQueries.deleteQuestion(questionID);

   var response = {
      status: 200,
      success: 'Question deleted successfully'
   };

   fs.unlinkSync('./questions/page-' + pageID + '/' + questionID + '.html');

   return callback(response);
}

module.exports = deleteQuestion;
