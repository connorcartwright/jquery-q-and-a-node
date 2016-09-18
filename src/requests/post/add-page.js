function addPage(database, reqData, callback) {
   'use strict';

   database.pageQueries.addPage(reqData.id, reqData.title);

   var response = {
      status: 200,
      success: 'Added Successfully'
   };

   return callback(response);
}

module.exports = addPage;