
var database = require('../database/database');
var addPage = require('./post/add-page');
var addQuestion = require('./post/add-question');
var editQuestion = require('./post/edit-question');
var getQuestionsForPage = require('./post/get-questions-for-page');
var getQuestionCount = require('./post/get-question-count');
var checkMultipleChoiceAnswers = require('./post/check-multiple-choice-answers');
var checkCodingAnswers = require('./post/check-coding-answers');
var checkAuth = require('./post/check-auth');
var deleteQuestion = require('./post/delete-question');

function handlePostRequest(reqData, callback) {
   'use strict';

   console.log('Post Request: ' + reqData.action);

   if (reqData.action === 'checkAuth') {
      return checkAuth(reqData.accessToken, callback);
   } else {
      checkAuth(reqData.accessToken, function(data) {
         if (data.response) {
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
               case 'checkMultipleChoiceAnswers':
                  return checkMultipleChoiceAnswers(database, reqData, callback);
               case 'checkCodingAnswers':
                  return checkCodingAnswers(database, reqData, callback);
            }
         } else {
            var response = {
               status: 401,
               success: 'Unauthorised Access'
            };

            callback(response);
         }
      });
   }
}

module.exports = handlePostRequest;