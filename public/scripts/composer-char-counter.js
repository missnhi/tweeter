//This file will be solely responsible for this character counter.

//also have the realistic way of typing in the textarea
$(document).ready(function() {
  let typingSpeed = 50; // Default typing speed
  const $textarea = $('.new-tweet textarea');
  let typingTimeout;
  let isTypingEffect = false;
  
  // Update the typing speed when user changes it from the slider
  $('#typing-speed').on('input', function() {
    typingSpeed = $(this).val();
    $('#speed-value').text(`${typingSpeed}ms`);
  });
  
  // Common function to update the counter based on current input value
  const updateCounter = () => {
    const maxLength = 140;
    const currentLength = $textarea.val().length;
    const remainingLength = maxLength - currentLength;
    
    const counter = $textarea.siblings('div').find('.counter');
    counter.text(remainingLength);
    
    if (remainingLength < 0) {
      counter.addClass('negative');
    } else {
      counter.removeClass('negative');
    }
  };
  
  // Handle input event
  $textarea.on('input', function() {
    if (isTypingEffect) return;
    
    clearTimeout(typingTimeout);
    const inputText = $(this).val(); // Get the text in the textarea
    let index = $textarea.data('current-index') || 0; // Keep track of typing index
    
    // If the user is deleting characters, immediately update the counter
    if (inputText.length < index) {
      index = inputText.length;
      $textarea.data('current-index', index); // Adjust the index for deletion
      updateCounter();
      return;
    }
    
    isTypingEffect = true;
    
    // Simulate the typing effect
    const typeCharacter = () => {
      if (index < inputText.length) {
        $textarea.val(inputText.substring(0, index + 1)); // Add one character at a time
        index++;
        $textarea.data('current-index', index); // Save the progress
        
        // Update the counter for each character typed
        updateCounter();
        
        typingTimeout = setTimeout(typeCharacter, typingSpeed);
      } else {
        isTypingEffect = false; // Typing effect completed
      }
    };
    
    typeCharacter();
  });
});
