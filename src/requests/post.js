
var database = require('../database/database');
var addPage = require('./post/add-page');
var addQuestion = require('./post/add-question');
var editQuestion = require('./post/edit-question');
var getQuestionsForPage = require('./post/get-questions-for-page');
var getQuestionCount = require('./post/get-question-count');

function handlePostRequest(reqData, callback) {
   'use strict';

   switch(reqData.action) {
   case 'addPage':
      return addPage(database, reqData, callback);
   case 'addQuestion':
      console.log('Add Question Request!');

      return addQuestion(database, reqData, callback);
   case 'editQuestion':
      console.log('Edit Question Request!');

      return editQuestion(database, reqData, callback);
   case 'getQuestionCount':
      return getQuestionCount(database, reqData, callback);
   case 'getQuestionsForPage':
      console.log('Get Questions For Page Request!');

      return getQuestionsForPage(database, reqData, callback);
}
}

module.exports = handlePostRequest;