var connection = require('../connection');

function addAccessToken(accessToken) {
   'use strict';

   var queryString = 'INSERT IGNORE INTO AccessTokens (AccessToken) VALUES(?)';

   connection.query(queryString, [accessToken], function(err) {
      if (err) {
         return 'Error';
      } else {
         return 'Inserted successfully!';
      }
   });
}

function checkAccessToken(accessToken, callback) {
   'use strict';

   var queryString = 'SELECT AccessTokens.AccessToken AS accessToken ' +
     'FROM AccessTokens ' +
     'WHERE AccessTokens.AccessToken=?';

   connection.query(queryString, [accessToken], function(err, result) {
      if (err) {
         console.log('Error occurred: ' + err.code);

         return callback(false);
      } else {
         return callback(result.length);
      }
   });
}

function deleteAccessToken(accessToken) {
   'use strict';

   var queryString = 'DELETE FROM AccessTokens ' +
     'WHERE AccessToken=?;';

   connection.query(queryString, [accessToken], function(err) {
      if (err) {
         console.log('Error occurred: ' + err.code);
      }
   });
}

module.exports = {
   addAccessToken: addAccessToken,
   checkAccessToken: checkAccessToken,
   deleteAccessToken: deleteAccessToken
};
