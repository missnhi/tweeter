/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {
  $.getJSON('/data/initial-tweets.json')
    .done(function(tweets) {
      console.log(tweets); // Log the JSON content
      const $tweetContainer = $('.tweet-container');
      
      tweets.forEach(tweet => {
        const $tweet = $(`
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
            <footer>
              <div>
                <p>${new Date(tweet.created_at).toLocaleDateString()}</p>
              </div>
              <div>
                <i class="fa-solid fa-retweet"></i>
                <i class="fa-solid fa-flag"></i>
                <i class="fa-solid fa-heart"></i>
              </div>
            </footer>
          </article>
        `);
        $tweetContainer.append($tweet);
      });
    })
    .fail(function(jqxhr, textStatus, error) {
      console.error("Request Failed: " + textStatus + ", " + error);
    });
});