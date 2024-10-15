/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Load the tweets in the initial-tweets.json file and render them to the page
 */

$(document).ready(function() {
  
  // Function to create a tweet element takes in a tweet object and is responsible for
  // returning a tweet <article> element containing the entire HTML structure of the tweet.
  //Use jQuery's text() method to safely insert the tweet content.
  const createTweetElement = (tweet) => {
    const $tweet = $('<article>').append(
      $('<header>').append(
        $('<div>').append(
          $('<img>').attr('src', tweet.user.avatars).attr('alt', `${tweet.user.name}'s avatar`),
          $('<h2>').text(tweet.user.name)
        ),
        $('<div>').append(
          $('<h3>').text(tweet.user.handle)
        )
      ),
      $('<p>').text(tweet.content.text),
      $('<hr>').css('border', '3px solid #333'),
      $('<footer>').append(
        $('<div>').append(
          $('<p>').text(timeago.format(tweet.created_at))
        ),
        $('<div>').append(
          $('<i>').addClass('fa-solid fa-retweet'),
          $('<i>').addClass('fa-solid fa-flag'),
          $('<i>').addClass('fa-solid fa-heart')
        )
      )
    );
    return $tweet.prop('outerHTML');
  };
  
  // Function to render tweets in reverse chronological order
  // taking in an array of tweet objects and then appending each one to the #tweets-container.
  const renderTweets = (tweets) => {
    const $tweetContainer = $('.tweet-container');
    $tweetContainer.empty();
    tweets.forEach(tweet => {
      const $tweet = createTweetElement(tweet);
      $tweetContainer.prepend($tweet);
    });
  };
  
  // Load initial tweets: fetching tweets from the http://localhost:8080/tweets page
  const loadTweets = () => {
    $.ajax({
      type: 'GET',
      url: '/tweets',
    })
      .done(function(tweets) {
        renderTweets(tweets);
      })
      .fail(function(jqxhr, textStatus, error) {
        console.error("Request Failed: " + textStatus + ", " + error);
        alert("Failed to load tweets. Please try again later.");
      });
  };
  
  // Load initial tweets on page load
  loadTweets();
  
  // add event listener for submit and prevent its default behaviour.
  $('form').on('submit', function(event) {
    event.preventDefault();
    
    //validate the form data
    const tweetText = $('#tweet-text').val().trim();
    const $errorContainer = $('.error-container'); //jquery error container
    
    // Clear previous error messages
    $errorContainer.text('').hide();
    
    if (!tweetText) {
      $errorContainer.text('uhno! Tweet cannot be empty.≡(▔﹏▔)≡').slideDown();
      return;
    }
    
    if (tweetText.length > 140) {
      $errorContainer.text('BOOOO you exceed 140 characters(╯‵□′)╯︵┻━┻').slideDown();
      return;
    }
    
    // serialize the form data
    const formData = $(this).serialize();
    
    // make an AJAX POST request
    $.ajax({
      type: 'POST',
      url: '/tweets',
      data: formData
    })
      .done(function(response, textStatus, jqxhr) {
        const contentType = jqxhr.getResponseHeader("content-type") || "";
        console.log("Response Content-Type:", contentType);
        console.log("Response:", response);
        
        //check if the response is in JSON format
        if (contentType.includes("application/json")) {
          console.log("New tweet added:", response);
          $('form')[0].reset();
          $('.counter').text('140');
          loadTweets(); //call loadTweets to fetch and render all tweets
        } else {
          console.error("Unexpected response format");
          alert("Failed to add tweet. Unexpected response format");
        }
      })
      .fail(function(jqxhr, textStatus, error) {
        console.error("Request Failed: " + textStatus + ", " + error);
        alert("Failed to add tweet. Please try again later.");
      });
  });
});