var connection = require('../connection');

// NEED THIS TO HAVE A CALLBACK TO GET THE NEW QUESTION ID

function addQuestion(pageID, questionType, questionName, questionStatement,
                     hint1, hint2, hint3) {

  var queryString = 'INSERT INTO Questions (PageID, QuestionType, QuestionName, ' +
    'QuestionStatement, Hint1, Hint2, Hint3) VALUES(?, ?, ?, ?, ?, ?, ?)';

  connection.query(queryString, [pageID, questionType, questionName, questionStatement, hint1, hint2, hint3], function(err, results) {
    if (err) {
      console.log('Error occurred: ' + err.code);
      return '';
    }
    else {
      return results.insertId;
    }
  });
}

function updateQuestion(questionID, pageID, questionType, questionName, questionStatement,
                        hint1, hint2, hint3) {
  var queryString = 'UPDATE Questions ' +
    'SET PageID=?, QuestionType=?, QuestionName=?, QuestionStatement=?, ' +
    'Hint1=?, Hint2=?, Hint3=?' +
    'WHERE QuestionID=?;';

  connection.query(queryString, [pageID, questionType, questionName, questionStatement, hint1, hint2, hint3, questionID], function(err, results) {
    if (err) {
      console.log('Error occurred: ' + err.code);
    }
  });
}

function updateQuestionPage(pageID, questionID) {
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
  updateQuestion: updateQuestion,
  deleteQuestion: deleteQuestion,
  updateQuestionPage: updateQuestionPage
};
