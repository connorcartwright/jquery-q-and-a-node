
function checkAuth(accessToken, callback) {
   'use strict';

   var GitHub = require('github-api');

   var github = new GitHub({
      token: accessToken
   });

   github
     .getUser()
     .getProfile()
     .then(function(profile) {
      var org = github.getOrganization('bruhack');

      return org.isMember(profile.data.login);
   })
     .then(function(isMember) {
      var response = {
         status: 200,
         success: 'Added Successfully',
         response: isMember
      };

      callback(response);
   });
}

module.exports = checkAuth;
