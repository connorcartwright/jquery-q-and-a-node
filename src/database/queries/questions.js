var connection = require('../connection');

function addQuestion(questionData, callback) {
   'use strict';

   var queryString =
      'INSERT INTO Questions (PageID, QuestionType, QuestionName, ' +
      'QuestionStatement, QuestionCode, Hint1, Hint2, Hint3) VALUES(?, ?, ?, ?, ?, ?, ?, ?)';

   connection.query(queryString, [
questionData.pageID,
 questionData.questionType,
     questionData.questionName,
 questionData.questionStatement,
       questionData.questionCode,
       questionData.questionHints[0],
     questionData.questionHints[1],
questionData.questionHints[2]
],
     function(err, results) {
      if (err) {
         console.log('right here bbe!');
         console.log('Error occurred: ' + err.code);

         return '';
      } else {
         return callback(results.insertId);
      }
   });
}

function getQuestionType(questionID, callback) {
   'use strict';

   var queryString = 'SELECT Questions.QuestionType as QuestionType ' +
      'FROM Questions ' +
      'WHERE Questions.QuestionID=?';

   connection.query(queryString, [questionID], function(err, results) {
      if (err) {
         console.log('Error occurred: ' + err.code);
      } else {
         callback(results[0].QuestionType);
      }
   });
}

function updateQuestion(questionData, callback) {
   'use strict';

   var queryString = 'UPDATE Questions ' +
      'SET PageID=?, QuestionType=?, QuestionName=?, QuestionStatement=?, ' +
      'QuestionCode=?, Hint1=?, Hint2=?, Hint3=?' +
      'WHERE QuestionID=?;';

   connection.query(queryString, [
questionData.pageID,
 questionData.questionType,
     questionData.questionName,
 questionData.questionStatement,
     questionData.questionCode,
     questionData.questionHints[0],
 questionData.questionHints[1],
 questionData.questionHints[2],
 questionData.questionID
], function(err) {
      if (err) {
         console.log('Error occurred: ' + err.code);
      } else {
         callback();
      }
   });
}

function updateQuestionPage(pageID, questionID) {
   'use strict';

   var queryString = 'UPDATE Questions ' +
      'SET PageID=? ' +
      'WHERE QuestionID=?;';

   connection.query(queryString, [pageID, questionID], function(err) {
      if (err) {
         console.log('Error occurred: ' + err.code);
      }
   });
}

function deleteQuestion(questionID) {
   'use strict';

   var queryString = 'DELETE FROM Questions ' +
      'WHERE QuestionID=?;';

   connection.query(queryString, [questionID], function(err) {
      if (err) {
         console.log('Error occurred: ' + err.code);
      }
   });
}

module.exports = {
   addQuestion: addQuestion,
   getQuestionType: getQuestionType,
   updateQuestion: updateQuestion,
   deleteQuestion: deleteQuestion,
   updateQuestionPage: updateQuestionPage
};
