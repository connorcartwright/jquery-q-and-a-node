
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

   switch(reqData.action) {
   case 'deleteQuestion':
      console.log('Deleting question!');

      return deleteQuestion(database, reqData.questionID, callback);
   case 'checkAuth':
      console.log('Checking Auth request!');

      return checkAuth(reqData.accessToken, callback);
   case 'addPage':
      console.log('Add Page Request!');

      return addPage(database, reqData, callback);
   case 'addQuestion':
      console.log('Add Question Request!');

      return addQuestion(database, reqData, callback);
   case 'editQuestion':
      console.log('Edit Question Request!');

      return editQuestion(database, reqData, callback);
   case 'getQuestionCount':
      console.log('Get Question Count Request!');

      return getQuestionCount(database, reqData, callback);
   case 'getQuestionsForPage':
      console.log('Get Questions For Page Request!');

      return getQuestionsForPage(database, reqData, callback);
   case 'checkMultipleChoiceAnswers':
      console.log('Check Multiple Choice Answers Request!');

      return checkMultipleChoiceAnswers(database, reqData, callback);
   case 'checkCodingAnswers':
      console.log('Check Coding Answers Request!');

      return checkCodingAnswers(database, reqData, callback);
}
}

module.exports = handlePostRequest;