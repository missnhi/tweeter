/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Load the tweets in the initial-tweets.json file and render them to the page
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
            <hr style="border: 3px solid #333; ">
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
        $tweetContainer.append($tweet);
      });
    })
    .fail(function(jqxhr, textStatus, error) {
      console.error("Request Failed: " + textStatus + ", " + error);
    });
});