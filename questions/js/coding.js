function initialiseEditor() {
  var questionCode = $('#qa-code-editor').data('code');
  var editor = ace.edit('qa-code-editor');
  editor.setTheme('ace/theme/monokai');
  editor.getSession().setMode('ace/mode/javascript');
  editor.setValue(questionCode);
}

function initialiseCodeFrame() {
  var editor = ace.edit('qa-code-editor');

  var iframe = document.createElement('iframe');
  iframe.id = 'coding-test';
  document.body.appendChild(iframe);

  var code = editor.getValue();

  var jquery = '<script src="https://code.jquery.com/jquery-2.2.4.min.js"></script>';
  var userFunction = '<script id="user-code"> function userCode() { ' + code + ' } </script>';
  var scripts = jquery + userFunction;

  var container = '<div class="qa-input"></div>';
  var html = '<body>' + container + scripts + '</body>';

  document.body.appendChild(iframe);
  iframe.contentWindow.document.open();
  iframe.contentWindow.document.write(html);
  iframe.contentWindow.document.close();
}

$('.test').on('click', function() {
  if ($(this).hasClass('closed')) {
    $('.test.open').toggleClass('closed open');
    $(this).toggleClass('closed open');
  } else {
    $('.test.open').toggleClass('closed open');
  }
});

function getOutputArray() {
  var iframe = document.getElementById("coding-test");
  var $iframe = $('#coding-test');

  var editor = ace.edit('qa-code-editor');
  var code = editor.getValue();
  console.log('--- --- --- code --- --- --- ');
  console.log(code);
  console.log('--- --- --- code --- --- --- ');
  iframe.contentWindow.document.getElementById('user-code').remove();

  var jquery = '<script src="https://code.jquery.com/jquery-2.2.4.min.js"></script>';
  var userFunction = '<script id="user-code"> function userCode() { ' + code + ' } </script>';
  var scripts = jquery + userFunction;

  var container = '<div class="qa-input"></div>';
  var html = '<body>' + container + scripts + '</body>';

  iframe.contentWindow.document.open();
  iframe.contentWindow.document.write(html);
  iframe.contentWindow.document.close();

  iframe.contentWindow.userCode('<script id="user-code"> function userCode() { ' + code + ' } </script>');
  console.log(iframe.contentWindow.userCode());

  var output = [];

  $('.input').each(function() {
    var input = $(this).find('span').text();
    $iframe.contents().find('.qa-input').html(input);
    output.push(iframe.contentWindow.userCode());
  });

  return output;

}

function updateTestDisplay(output, response) {
  console.log('yes');
  console.log(response);
  console.log(response[0]);
  console.log(response[1]);
  output = JSON.parse(output);
  var i = 0;

  $('.test').each(function () {
    var correct = $('<i class="fa ' + (response[i] ? 'fa-check qa-test-correct' : 'fa-times qa-test-wrong') + '" aria-hidden="true"></i>');
    correct.insertAfter($(this).find('.test-name'));

    var outputText = $(this).find('.output span');

    if (response[i]) {
      outputText.addClass('correct');
    } else {
      outputText.addClass('wrong');
    }

    outputText.text(output[i]);

    i++;
  });
}

function getCodingData(pageID, questionID) {
  var editor = ace.edit('qa-code-editor');

  var output = getOutputArray();
  console.log(output);

  var data = {
    pageID: pageID,
    questionID: questionID,
    action: 'checkCodingAnswers',
    output: JSON.stringify(output)
  };

  return data;
}

$('.js-submit-question').on('click', function() {
  var pageID = $('.qa-question').data('pageid');
  var questionID = $('.qa-question').data('questionid');

  $('.qa-test-correct, .qa-test-wrong').remove();
  $('.output span').removeClass('wrong correct');

  var postData = getCodingData(pageID, questionID);

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
      console.log('test');
      console.log(data.response);
      console.log('test');
      if (data.success) {
        displayMessage('Correct!', true);
      } else {
        displayMessage('Incorrect!', false);
      }

      updateTestDisplay(postData.output, data.response);
    });

});

initialiseEditor();
initialiseCodeFrame();
