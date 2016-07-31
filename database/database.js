// Database stuff

module.exports = {
   createTables: require('./queries/create-tables'),
   pageQueries: require('./queries/pages'),
   questionQueries: require('./queries/questions'),
   answerQueries: require('./queries/answers')

   // Queries: {
   // questionQueries
   // pageQueries
   // }
   // addQuestion: require('./queries/add-question')
};