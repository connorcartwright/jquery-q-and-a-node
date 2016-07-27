//Lets require/import the HTTP module
var http = require('http'),
    qs = require('querystring');

var database = require('./database/database');


const PORT=8080;

//We need a function which handles requests and send response
var requestListener = function (req, res) {
  var body = '';
  var reqD = '';
  req.on('data', function(chunk) {
    body += chunk;
  });
  req.on('end', function() {
    reqData = qs.parse(body);
    switch (req.method) {
      case 'GET':
        handleGetRequest(req);
        break;

      case 'POST':
        handlePostRequest(reqData, function(response) {
          // to fix, would not accept vagrant.learn.jquery
          res.setHeader('Access-Control-Allow-Origin', '*');
          res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
          res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
          res.end(JSON.stringify(response));
        });
        break;
    }
  });
};

function handleGetRequest(data) {
  console.log('GET REQUEST');
}

// INSERT QUESTION INTO DATABASE
// INSERT QUESTION ANSWERS INTO DATABASE
// RETURN QUESTION ANSWERS

function handlePostRequest(reqData, callback) {
  switch(reqData['action']) {
    case 'addPage':
      addPageToDatabase(reqData['id'], reqData['title']);
      var response = {
        status  : 200,
        success : 'Added Successfully',
      };

      return callback(response);

      break;

    case 'getQuestionCount':
      database.pageQueries.pageCount(reqData['id'], function(result) {
        var response = {
          status  : 200,
          success : 'Retrieved Successfully',
          pageCount  : result[0].PageCount
        };

        return callback(response);
      });
      break;

    case 'getQuestionsForPage':
      database.pageQueries.getPageQuestions(reqData['id'], function(questions) {
        var i = 0;
        var loopQ = function (questions) {
          loopQuestions(questions[i], function (answers) {
            questions[i].Answers = answers;

            if (i < questions.length - 1) {
              i++;
              loopQ(questions);
            }
            else {
              var response = {
                status: 200,
                success: 'Retrieved Successfully',
                questions: questions
              };

              return callback(response);
            }

          });
        };

        loopQ(questions);
      });

      // });
      break;

    case 'addQuestion':
        
      break;

    case 'updateQuestion':
      // updateQuestion();
      break;
  }
}

function loopQuestions(question, callback) {
  if (question.QuestionType === 'Multiple Choice') {
    database.answerQueries.getMultipleChoiceAnswers(question.QuestionID, function(answers) {
      callback(answers);
    });
  }
  else {
    database.answerQueries.getCodingAnswers(question.QuestionID, function(answers) {
      callback(answers);
    });
  }
}

function deal(questions) {

}


function addPageToDatabase(id, title) {
  database.pageQueries.addPage(id, title);
}

// function getRandomInt(min, max) {
//   return Math.floor(Math.random() * (max - min + 1)) + min;
// }

// function addQuestionToDatabase() {
//   database.questionQueries.addQuestion(getRandomInt(1, 183), 'MC', 'How to test X', 'blah blah blah', 'hint1', 'hint2', 'hint3');
// }


// create server
var server = http.createServer(requestListener);

// start server
server.listen(PORT, function(){
  console.log("Server listening on: http://localhost:%s", PORT);
  require('./database/database').createTables();
});

//Lets define a port we want to listen to
