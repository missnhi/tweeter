/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Load the tweets in the initial-tweets.json file and render them to the page
 */

$(document).ready(function() {
  // Function to create a tweet element
  const createTweetElement = (tweet) => {
    return $(`
      <article>
        <header>
          <div>
            <img src="${tweet.user.avatars}" alt="${tweet.user.name}'s avatar">
            <h2>${tweet.user.name}</h2>
          </div>
          <div>
            <h3>${tweet.user.handle}</h3>
          </div>
        </header>
        <p>${tweet.content.text}</p>
        <hr style="border: 3px solid #333;">
        <footer>
          <div>
            <p>${(new Date() - new Date(tweet.created_at)) / (1000 * 60 * 60 * 24) < 30
      ? `${Math.floor((new Date() - new Date(tweet.created_at)) / (1000 * 60 * 60 * 24))} days ago`
      : new Date(tweet.created_at).toLocaleDateString()}
            </p>
          </div>
          <div>
            <i class="fa-solid fa-retweet"></i>
            <i class="fa-solid fa-flag"></i>
            <i class="fa-solid fa-heart"></i>
          </div>
        </footer>
      </article>
    `);
  };
  
  // Function to render tweets
  const renderTweets = (tweets) => {
    const $tweetContainer = $('.tweet-container');
    $tweetContainer.empty();
    tweets.forEach(tweet => {
      const $tweet = createTweetElement(tweet);
      $tweetContainer.append($tweet);
    });
  };
  
  // Load initial tweets
  const loadTweets = () => {
    $.ajax({
      type: 'GET',
      url: '/tweets',
      success: function(tweets) {
        renderTweets(tweets);
      },
      error: function(jqxhr, textStatus, error) {
        console.error("Request Failed: " + textStatus + ", " + error);
      }
    });
  };
  
  // Load initial tweets on page load
  loadTweets();
  
  // Handle form submission
  $('form').on('submit', function(event) {
    event.preventDefault(); // prevent the default form submission
    
    // Serialize the form data
    const formData = $(this).serialize();
    
    // Create an AJAX POST request
    $.ajax({
      type: 'POST',
      url: '/tweets',
      data: formData,
      success: function(response) {
        // Assuming the server returns the new tweet as JSON
        const tweet = response;
        const $tweetContainer = $('.tweet-container');
        
        // Create a new tweet element
        const $tweet = createTweetElement(tweet);
        
        // Prepend the new tweet to the tweet container
        $tweetContainer.prepend($tweet);
        
        // Clear the form
        $('form')[0].reset();
        $('.counter').text('140');
      },
      error: function(jqxhr, textStatus, error) {
        console.error("Request Failed: " + textStatus + ", " + error);
      }
    });
  });
});