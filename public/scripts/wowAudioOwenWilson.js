// wowAudio.js
export const fetchAndPlayWowAudio = () => {
  $.ajax({
    url: 'https://owen-wilson-wow-api.onrender.com/wows/random',
    method: 'GET',
    dataType: 'json',
    success: function(data) {
      const audioUrl = data[0].audio;
      const audio = new Audio(audioUrl);
      audio.play();
      
      //display the "wow" data on console
      console.log(data);
    },
    error: function(error) {
      console.error('Error fetching the wow:', error);
    }
  });
};