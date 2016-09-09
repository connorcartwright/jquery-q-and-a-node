$('.js-mc-option').on('click', function() {
  $(this)
    .toggleClass('correct')
    .prev()
    .toggleClass('correct');
});

function getMultipleChoiceData(pageID, questionID) {
  var options = [];


  $('.multiple-choice-option').each(function() {
    options.push($(this).find('.correct').length ? 1 : 0);
  });

  var data = {
    pageID: pageID,
    questionID: questionID,
    action: 'checkMultipleChoiceAnswers',
    options: JSON.stringify(options)
  };

  return data;
}

$('.js-submit-question').on('click', function() {
  var pageID = $('.qa-question').data('pageid');
  var questionID = $('.qa-question').data('questionid');

  var postData = getMultipleChoiceData(pageID, questionID);

  $.ajax({
    url: 'http://139.59.179.19:8080',
    method: 'POST',
    data: postData,
    dataType: 'json',
    crossDomain: true
  })
    .done(function() {
      console.log('done/success');
    })
    .fail(function() {
      console.log('fail/error');
    })
    .always(function(data) {
      console.log('always');
      console.log(data);
      if (data.success) {
        displayMessage('Correct!', true);
      } else {
        var message = '';
        if (data.numCorrect === 0) {
          var numSelected = $('.multiple-choice .mc-option-text.correct').length;
          message = '<span class="small">All of your selected options are incorrect!</span>';
        } else {
          message = '<span class="small">' + data.numCorrect + ' of your selected options are correct!</span>';
        }
        displayMessage('Incorrect! <br> ' + message, false);
      }
    });

});


