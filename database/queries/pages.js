var connection = require('../connection');

function addPage(pageID, pageTitle) {
  var queryString = 'INSERT IGNORE INTO Pages (PageID, PageTitle) VALUES(?, ?)';

  connection.query(queryString, [pageID, pageTitle], function(err, results) {
    if (err) {
      console.log('Error occurred: ' + err.code);
      return '';
    }
    else {
      return results.insertId;
    }
  });
}

function pageCount(pageID, callback) {
  var queryString = 'SELECT COUNT(Pages.PageID) AS "PageCount" ' +
    'FROM Pages ' +
    'INNER JOIN Questions ' +
      'ON Pages.PageID=Questions.PageID ' +
    'WHERE Pages.PageID=?;';

  connection.query(queryString, [pageID], function(err, result) {
    if (err) {
      console.log('Error occurred: ' + err.code);
      return callback('Error');
    }
    else {
      return callback(result);
    }
  });
}

function getPageQuestions(pageID, callback) {
  var queryString = 'SELECT Questions.QuestionID AS QuestionID, Questions.QuestionType AS QuestionType, ' +
    'Questions.QuestionName AS QuestionName, Questions.QuestionStatement AS QuestionStatement, ' +
    'Questions.Hint1 AS Hint1, Questions.Hint2 AS Hint2, Questions.Hint3 AS Hint3 ' +
    'FROM Pages ' +
    'INNER JOIN Questions ' +
    'ON Pages.PageID=Questions.PageID ' +
    'WHERE Pages.PageID=?;';

  connection.query(queryString, [pageID], function(err, result) {
    if (err) {
      console.log('Error occurred: ' + err.code);
      return callback('Error');
    }
    else {
      console.log('page questions returning');
      return callback(result);
    }
  });
}

// update page title (if ID is the same but title differs)
// get title?
// question count

module.exports = {
  addPage: addPage,
  pageCount: pageCount,
  getPageQuestions: getPageQuestions
};

