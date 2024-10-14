//This file will be solely responsible for this character counter.
$(document).ready(function() {
  $('.new-tweet textarea').on('input', function() {
    const maxLength = 140;
    const currentLength = $(this).val().length;
    const remainingLength = maxLength - currentLength;
    
    const counter = $(this).siblings('div').find('.counter');
    counter.text(remainingLength);
    
    if (remainingLength < 0) {
      counter.addClass('negative');
    } else {
      counter.removeClass('negative');
    }
  });
});