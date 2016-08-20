
var database = require('../database/database');
var addPage = require('./post/add-page');
var addQuestion = require('./post/add-question');
var editQuestion = require('./post/edit-question');
var getQuestionsForPage = require('./post/get-questions-for-page');
var getQuestionCount = require('./post/get-question-count');
var checkMultipleChoiceAnswers = require('./post/check-multiple-choice-answers');
var checkCodingAnswers = require('./post/check-coding-answers');
var GitHub = require('github-api');

function handlePostRequest(reqData, callback) {
   'use strict';

   console.log('Access Token: ' + reqData.accessToken);

   var gh = new GitHub();

   var qaTest = gh.getOrganization('qa-test55');

   if (qaTest.isMember('Connor Cartwright')) {
      console.log('The user is a member!');
   } else {
      console.log('The user is NOT a member!');
   }

   // Github
   //   .getUser() // Gets the User object (e.g. the object possessing the methods to work with the User API)
   //   .getProfile() // Retrieves the profile of the user
   //   .then(function() {
   //    var jQueryOrg = github.getOrganization('qa-test55');
   //
   //    Return jQueryOrg.isMember('ConnorCartwright');
   // })
   //   .then(function(isMember) {
   //    if (isMember) {
   //       console.log('The user is a member');
   //    } else {
   //       console.log('The user is NOT a member');
   //    }
   // });

   switch(reqData.action) {
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