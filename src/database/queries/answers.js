var connection = require('../connection');

function addCodingAnswer(questionID, input, output) {
   'use strict';

   var queryString = 'INSERT INTO CodingAnswers (QuestionID, Input, Output) VALUES(?, ?, ?)';

   connection.query(queryString, [questionID, input, output], function(err) {
      if (err) {
         return 'Error';
      } else {
         return 'Inserted successfully!';
      }
   });
}

function removeCodingAnswers(questionID, callback) {
   'use strict';

   var queryString = 'DELETE FROM CodingAnswers WHERE QuestionID=?;';

   connection.query(queryString, [questionID], function(err) {
      if (err) {
         return 'Error';
      } else {
         callback();
      }
   });
}

function getCodingAnswers(questionID, callback) {
   'use strict';

   var queryString = 'SELECT Input AS input, Output AS output ' +
      'FROM CodingAnswers WHERE QuestionID=?';

   connection.query(queryString, [questionID], function(err, result) {
      if (err) {
         console.log('Error occurred: ' + err.code);

         return callback('Error');
      } else {
         return callback(result);
      }
   });
}

function getCodingOutputs(questionID, callback) {
   'use strict';

   var queryString = 'SELECT Output AS output ' +
     'FROM CodingAnswers WHERE QuestionID=?';

   connection.query(queryString, [questionID], function(err, result) {
      if (err) {
         console.log('Error occurred: ' + err.code);

         return callback('Error');
      } else {
         return callback(result);
      }
   });
}

function addMultipleChoiceAnswer(questionID, optionText, correct) {
   'use strict';

   var queryString = 'INSERT INTO MultipleChoiceAnswers (QuestionID, OptionText, Correct) VALUES(?, ?, ?)';

   connection.query(queryString, [questionID, optionText, correct], function(err) {
      if (err) {
         console.log('Error occurred: ' + err.code);

         return 'Error';
      } else {
         return 'Inserted successfully!';
      }
   });
}

function removeMultipleChoiceAnswers(questionID, callback) {
   'use strict';

   var queryString = 'DELETE FROM MultipleChoiceAnswers WHERE QuestionID=?;';

   connection.query(queryString, [questionID], function(err) {
      if (err) {
         return 'Error';
      } else {
         callback();
      }
   });
}

function getMultipleChoiceAnswers(questionID, callback) {
   'use strict';

   var queryString = 'SELECT OptionText AS optionText, Correct AS correct ' +
      'FROM MultipleChoiceAnswers WHERE QuestionID=?';

   connection.query(queryString, [questionID], function(err, result) {
      if (err) {
         console.log('Error occurred: ' + err.code);

         return callback('Error');
      } else {
         return callback(result);
      }
   });
}

module.exports = {
   addCodingAnswer: addCodingAnswer,
   removeCodingAnswers: removeCodingAnswers,
   getCodingAnswers: getCodingAnswers,
   getCodingOutputs: getCodingOutputs,
   addMultipleChoiceAnswer: addMultipleChoiceAnswer,
   removeMultipleChoiceAnswers: removeMultipleChoiceAnswers,
   getMultipleChoiceAnswers: getMultipleChoiceAnswers
};
