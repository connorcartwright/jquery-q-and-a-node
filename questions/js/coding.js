require('bind-hints');
var displayMessage = require('./display-message');

function initialiseEditor() {
   'use strict';

   var questionCode = $('#qa-code-editor').data('code');
   var editor = ace.edit('qa-code-editor');

   editor.setTheme('ace/theme/monokai');
   editor.getSession().setMode('ace/mode/javascript');
   editor.setValue(questionCode);
}

function initialiseCodeFrame() {
   'use strict';

   var editor = ace.edit('qa-code-editor');

   var iframe = document.createElement('iframe');

   iframe.id = 'coding-test';
   document.body.appendChild(iframe);

   var code = editor.getValue();

   var jquery = '<script src="https://code.jquery.com/jquery-2.2.4.min.js"></script>';
   var userFunction = '<script id="user-code"> function userCode() { try { ' + code +
     ' } catch(e) { return { pass: false, data: e } } } </script>';
   var scripts = jquery + userFunction;

   var container = '<div class="qa-input"></div>';
   var html = '<body>' + container + scripts + '</body>';

   document.body.appendChild(iframe);
   iframe.contentWindow.document.open();
   iframe.contentWindow.document.write(html);
   iframe.contentWindow.document.close();
}

$('.test').on('click', function() {
   'use strict';

   if ($(this).hasClass('closed')) {
      $('.test.open').toggleClass('closed open');
      $(this).toggleClass('closed open');
   } else {
      $('.test.open').toggleClass('closed open');
   }
});

function resetIframe() {
   'use strict';

   var iframe = document.getElementById('coding-test');
   var editor = ace.edit('qa-code-editor');
   var code = editor.getValue();

   iframe.contentWindow.document.getElementById('user-code').remove();

   var jquery = '<script src="https://code.jquery.com/jquery-2.2.4.min.js"></script>';
   var userFunction = '<script id="user-code"> function userCode() { try { ' + code +
     ' } catch(e) { return { pass: false, data: e } } } </script>';
   var scripts = jquery + userFunction;

   var container = '<div class="qa-input"></div>';
   var html = '<body>' + container + scripts + '</body>';

   iframe.contentWindow.document.open();
   iframe.contentWindow.document.write(html);
   iframe.contentWindow.document.close();

   return iframe;
}

function getOutputArray() {
   'use strict';

   var iframe = resetIframe();
   var $iframe = $('#coding-test');
   var outputArray = [];
   var passed = true;

   $('.input').each(function() {
      var input = $(this).find('span').text();

      $iframe.contents().find('.qa-input').html(input);

      var output = iframe.contentWindow.userCode();

      if (output[0]) {
         outputArray.push(output);
      } else {
         passed = false;

         output.error = true;

         console.log('in error');
         console.log('output.data');
         console.log(JSON.stringify(output.data.toString()));
         console.log('output.data');

         outputArray.push(output.data.toString());

         return false;
      }
   });

   return {
      passed: passed,
      data: outputArray
   };
}

function updateTestDisplay(output, response) {
   'use strict';

   output = JSON.parse(output);
   var i = 0;

   $('.test').each(function() {
      var $correct = $('<i class="fa ' + (response[i] ? 'fa-check qa-test-correct' :
          'fa-times qa-test-wrong') + '" aria-hidden="true"></i>');

      $correct.insertAfter($(this).find('.test-name'));

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
   'use strict';

   var output = getOutputArray();

   if (output.passed) {
      var data = {
         pageID: pageID,
         questionID: questionID,
         action: 'checkCodingAnswers',
         output: JSON.stringify(output.data)
      };

      return data;
   } else {
      console.log('in else');
      console.log(output.data);
      updateTestDisplay(JSON.stringify(output));
   }
}

$('.js-submit-question').on('click', function() {
   'use strict';

   var pageID = $('.qa-question').data('pageid');
   var questionID = $('.qa-question').data('questionid');

   $('.qa-test-correct, .qa-test-wrong').remove();
   $('.output span').removeClass('wrong correct');

   var postData = getCodingData(pageID, questionID);

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
      console.log('test');
      console.log(data.response);
      console.log('test');

      if (data.success) {
         displayMessage('Correct!', true);
      } else {
         displayMessage('Incorrect!', false);
      }

      console.log('successful post: ');
      console.log(postData.output);

      updateTestDisplay(postData.output, data.response);
   });
});

initialiseEditor();
initialiseCodeFrame();
