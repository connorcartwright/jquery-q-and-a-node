$('.js-mc-option').on('click', function() {
  $(this)
    .toggleClass('correct')
    .prev()
    .toggleClass('correct');
});


$('.js-hint').on('click', function() {
  if (!$(this).hasClass('js-hint-active')) {
    var $activeHint =  $('.js-hint-active');
    var activeHintNum = $activeHint.data('hint');
    var newHintNum = $(this).data('hint');

    console.log('new hint text: ');
    console.log($(this).data('hint-text'));
    $activeHint
      .removeClass('js-hint-active')
      .find('span')
      .text(activeHintNum);
    $(this)
      .addClass('js-hint-active')
      .find('span')
      .text('Hint ' + newHintNum);
    $('.qa-hint-text').text($(this).data('hint-text'));
  }

});

if ($('.coding').length) {
  $(function() {
    var questionCode = $('#qa-code-editor').data('code');
    var editor = ace.edit('qa-code-editor');
    editor.setTheme('ace/theme/monokai');
    editor.getSession().setMode('ace/mode/javascript');
    editor.setValue(questionCode);
  });
}

$('.test').on('click', function() {
  if ($(this).hasClass('closed')) {
    $('.test.open').toggleClass('closed open');
    $(this).toggleClass('closed open');
  } else {
    $('.test.open').toggleClass('closed open');
  }
});

$('.js-hint-trigger').on('click', function() {
  $('.qa-hints-area').toggleClass('closed');
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

function getCodingData(pageID, questionID) {
  var editor = ace.edit('qa-code-editor');
  var questionCode = editor.getValue();

  var data = {
    pageID: pageID,
    questionID: questionID,
    action: 'checkCodingAnswers',
    questionCode: questionCode
  };

  return data;
}

$('.js-submit-question').on('click', function() {
  var pageID = $('.qa-question').data('pageid');
  var questionID = $('.qa-question').data('questionid');

  console.log('page id: ' + pageID);
  var postData = '';

  if ($('.coding').length) {
    postData = getCodingData(pageID, questionID);
  } else {
    postData = getMultipleChoiceData(pageID, questionID);
  }

  $.ajax({
    url: 'http://localhost:8080',
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
    });

});