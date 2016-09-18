
var database = require('../database/database');
var accessToken = database.tokenQueries;
var addPage = require('./post/add-page');
var addQuestion = require('./post/add-question');
var editQuestion = require('./post/edit-question');
var getQuestionsForPage = require('./post/get-questions-for-page');
var getQuestionCount = require('./post/get-question-count');
var checkMultipleChoiceAnswers = require('./post/check-multiple-choice-answers');
var checkCodingAnswers = require('./post/check-coding-answers');
var checkAuth = require('./post/check-auth');
var deleteQuestion = require('./post/delete-question');

function checkMembership(token, callback) {
   'use strict';

   console.log('Check Authentication');

   checkAuth(token, function(isMember) {
      if (isMember) {
         accessToken.addAccessToken(token);
      } else {
         accessToken.checkAccessToken(token, function(exists) {
            if (exists) {
               accessToken.deleteAccessToken(token);
            }
         });
      }

      var response = {
         status: 200,
         success: 'Added Successfully',
         response: isMember
      };

      callback(response);
   });
}

function handleAnswerChecking(reqData, callback) {
   'use strict';

   switch(reqData.action) {
      case 'checkMultipleChoiceAnswers':
         return checkMultipleChoiceAnswers(database, reqData, callback);
      case 'checkCodingAnswers':
         return checkCodingAnswers(database, reqData, callback);
   }
}

function handlePostRequest(reqData, callback) {
   'use strict';

   console.log('received post request: ' + reqData.action);

   if (reqData.action === 'checkAuth') {
      return checkMembership(reqData.accessToken, callback);
   } else if (reqData.action === 'checkMultipleChoiceAnswers' || reqData.action === 'checkCodingAnswers') {
      return handleAnswerChecking(reqData, callback);
   } else {
      accessToken.checkAccessToken(reqData.accessToken, function(isMember) {
         if (isMember) {
            switch(reqData.action) {
            case 'deleteQuestion':
               return deleteQuestion(database, reqData.questionID, reqData.pageID, callback);
            case 'addPage':
               return addPage(database, reqData, callback);
            case 'addQuestion':
               return addQuestion(database, reqData, callback);
            case 'editQuestion':
               return editQuestion(database, reqData, callback);
            case 'getQuestionCount':
               return getQuestionCount(database, reqData, callback);
            case 'getQuestionsForPage':
               return getQuestionsForPage(database, reqData, callback);
         }
         } else {
            var error = {
               status: 401,
               success: 'Unauthorised Access'
            };

            callback(error);
         }
      });
   }
}

module.exports = handlePostRequest;