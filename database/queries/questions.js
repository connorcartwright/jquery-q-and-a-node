var connection = require('../connection');

function addQuestion(
  pageID,
  questionType,
  questionName,
  questionStatement,
  hint1,
  hint2,
  hint3,
  callback
) {
  'use strict';
  var queryString =
     'INSERT INTO Questions (PageID, QuestionType, QuestionName, ' +
     'QuestionStatement, Hint1, Hint2, Hint3) VALUES(?, ?, ?, ?, ?, ?, ?)';

   connection.query(queryString, [
pageID,
 questionType,
 questionName,
 questionStatement,
 hint1,
 hint2,
 hint3
], function(err, results) {
      if (err) {
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

function updateQuestion(
  questionID,
  pageID,
  questionType,
  questionName,
  questionStatement,
  hint1,
  hint2,
  hint3,
  callback
) {
  'use strict';
  var queryString = 'UPDATE Questions ' +
     'SET PageID=?, QuestionType=?, QuestionName=?, QuestionStatement=?, ' +
     'Hint1=?, Hint2=?, Hint3=?' +
     'WHERE QuestionID=?;';

   connection.query(queryString, [
pageID,
 questionType,
 questionName,
 questionStatement,
 hint1,
 hint2,
 hint3,
 questionID
], function(err, results) {
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

   connection.query(queryString, [pageID, questionID], function(err, results) {
      if (err) {
         console.log('Error occurred: ' + err.code);
      }
   });
}

function deleteQuestion(questionID) {
  'use strict';
  var queryString = 'DELETE FROM Questions ' +
     'WHERE QuestionID=?;';

   connection.query(queryString, [questionID], function(err, results) {
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
