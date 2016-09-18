
$('.js-hint').on('click', function() {
   'use strict';

   if (!$(this).hasClass('js-hint-active')) {
      var $activeHint = $('.js-hint-active');
      var activeHintNum = $activeHint.data('hint');
      var newHintNum = $(this).data('hint');

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

$('.js-hint-trigger').on('click', function() {
   'use strict';

   $('.qa-hints-area').toggleClass('closed');
});

function displayMessage(message, success) {
   'use strict';

   var $message = $('<div class="qa-message-overlay"></div>');

   $message.append('<div class="qa-message ' + (success ? 'correct' : 'wrong') + '"><span>' + message + '</span></div>');
   $message.hide();
   $('.qa-question-content').append($message);

   $message
     .fadeIn(800)
     .delay(1000)
     .fadeOut(1500, function() {
      $(this).remove();
   });
}
