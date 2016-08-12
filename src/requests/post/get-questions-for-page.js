
function getAnswers(database, question, callback) {
   'use strict';

   if (question.questionType === 'Multiple Choice') {
      database.answerQueries.getMultipleChoiceAnswers(question.questionID, function(answers) {
         callback(answers);
      });
   } else {
      database.answerQueries.getCodingAnswers(question.questionID, function(answers) {
         callback(answers);
      });
   }
}

function loopAnswers(i, database, questions, callback) {
   'use strict';

   getAnswers(database, questions[i], function(answers) {
      questions[i].answers = answers;

      if (i < questions.length - 1) {
         i++;
         loopAnswers(i, database, questions, callback);
      } else {
         var response = {
            status: 200,
            success: 'Retrieved Successfully',
            questions: questions
         };

         return callback(response);
      }
   });
}

function getQuestionsForPage(database, reqData, callback) {
   'use strict';

   database.pageQueries.getPageQuestions(reqData.id, function(questions) {
      loopAnswers(0, database, questions, callback);
   });
}

module.exports = getQuestionsForPage;
