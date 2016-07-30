var connection = require('../connection');

function addCodingAnswer(questionID, input, output) {
  var queryString = 'INSERT INTO CodingAnswers (QuestionID, Input, Output) VALUES(?, ?, ?)';

  connection.query(queryString, [questionID, input, output], function(err) {
    if (err) {
      return 'Error';
    }
    else {
      return 'Inserted successfully!';
    }
  });
}

function removeCodingAnswers(questionID) {
  var queryString = 'DELETE FROM CodingAnswers WHERE QuestionID=?;';

  connection.query(queryString, [questionID], function(err) {
    if (err) {
      return 'Error';
    }
    else {
      return 'Inserted successfully!';
    }
  });
}

function getCodingAnswers(questionID, callback) {
  var queryString = 'SELECT Input, Output ' +
    'FROM CodingAnswers WHERE QuestionID=?';

  connection.query(queryString, [questionID], function(err, result) {
    if (err) {
      console.log('Error occurred: ' + err.code);
      return callback('Error');
    }
    else {
      return callback(result);
    }
  });
}

function addMultipleChoiceAnswer(questionID, optionText, correct) {
  var queryString = 'INSERT INTO MultipleChoiceAnswers (QuestionID, OptionText, Correct) VALUES(?, ?, ?)';

  connection.query(queryString, [questionID, optionText, correct], function(err) {
    if (err) {
      console.log('Error occurred: ' + err.code);
      return 'Error';
    }
    else {
      return 'Inserted successfully!';
    }
  });
}

function removeMultipleChoiceAnswers(questionID) {
  var queryString = 'DELETE FROM MultipleChoiceAnswers WHERE QuestionID=?;';

  connection.query(queryString, [questionID], function(err) {
    if (err) {
      return 'Error';
    }
    else {
      return 'Inserted successfully!';
    }
  });
}

function getMultipleChoiceAnswers(questionID, callback) {
  var queryString = 'SELECT OptionText, Correct ' +
    'FROM MultipleChoiceAnswers WHERE QuestionID=?';

  connection.query(queryString, [questionID], function(err, result) {
    if (err) {
      console.log('Error occurred: ' + err.code);
      return callback('Error');
    }
    else {
      return callback(result);
    }
  });
}

// update coding answer

// add mc answer

// update mc answer

// remove is done via delete cascade on the question itself

module.exports = {
  addCodingAnswer: addCodingAnswer,
  removeCodingAnswers: removeCodingAnswers,
  getCodingAnswers: getCodingAnswers,
  addMultipleChoiceAnswer: addMultipleChoiceAnswer,
  removeMultipleChoiceAnswers: removeMultipleChoiceAnswers,
  getMultipleChoiceAnswers: getMultipleChoiceAnswers
};
