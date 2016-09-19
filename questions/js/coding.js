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

function resetCodeFrame() {
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

   var iframe = resetCodeFrame();
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

         if (!output.data) {
            outputArray.push('Nothing returned');
         } else {
            outputArray.push(output.data.toString());
         }
      }
   });

   return {
      passed: passed,
      data: outputArray
   };
}

function updateTestDisplay(output, response) {
   'use strict';

   console.log('output: ');
   console.log(output);

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
   var data;

   if (output.passed) {
      data = {
         pageID: pageID,
         questionID: questionID,
         action: 'checkCodingAnswers',
         output: JSON.stringify(output.data)
      };
   } else {
      console.log('in else');
      console.log(output);
      updateTestDisplay(output.data, [false, false, false]);
   }

   return data;
}

$('.js-submit-question').on('click', function() {
   'use strict';

   var pageID = $('.qa-question').data('pageid');
   var questionID = $('.qa-question').data('questionid');

   $('.qa-test-correct, .qa-test-wrong').remove();
   $('.output span').removeClass('wrong correct');

   var postData = getCodingData(pageID, questionID);

   if (postData) {
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

         if (data.success) {
            displayMessage('Correct!', true);
         } else {
            displayMessage('Incorrect!', false);
         }

         updateTestDisplay(JSON.parse(postData.output), data.response);
      });
   }
});

initialiseEditor();
initialiseCodeFrame();
