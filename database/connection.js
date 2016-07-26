
var mysql = require('mysql');
var db = require('./database-config');

var connection = mysql.createConnection({
  host     : db.host,
  user     : db.user,
  password : db.password,
  database : db.database
});

connection.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
  }
});

module.exports = connection;