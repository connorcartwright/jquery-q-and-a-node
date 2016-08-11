function getQuestionCount(database, reqData, callback) {
   'use strict';

   database.pageQueries.pageCount(reqData.id, function(result) {
      var response = {
         status: 200,
         success: 'Retrieved Successfully',
         pageCount: result[0].PageCount
      };

      return callback(response);
   });
}

module.exports = getQuestionCount;