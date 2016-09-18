// Database stuff

module.exports = {
   createTables: require('./queries/create-tables'),
   pageQueries: require('./queries/pages'),
   questionQueries: require('./queries/questions'),
   answerQueries: require('./queries/answers'),
   tokenQueries: require('./queries/access-token')
};