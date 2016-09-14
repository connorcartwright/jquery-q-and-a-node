
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
      var org = github.getOrganization('ORGANISATION_NAME');

      return org.isMember(profile.data.login);
   })
     .then(function(isMember) {
      if (callback) {
         var response = {
            status: 200,
            success: 'Added Successfully',
            response: isMember
         };

         callback(response);
      } else {
         return isMember;
      }
   });
}

module.exports = checkAuth;
