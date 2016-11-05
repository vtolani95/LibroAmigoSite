// para data de Facebook
var graph = require('fbgraph');
var request = require('request');
graph.authorize({
  "client_id": process.env.FB_CLIENT_ID,
  "client_secret": process.env.FB_CLIENT_SECRET,
  "grant_type":"client_credentials"
}, function(err, res) {
  if(err) {
    console.log(err);
  } else {
    graph.setAccessToken(res.access_token);
  }
});

var Twit = require('twit');
var T = new Twit({
  consumer_key: process.env.TWITTER_API_KEY,
  consumer_secret: process.env.TWITTER_API_SECRET,
  app_only_auth: true
});



module.exports = function(app) {

  app.get('/api/fb', function(req, res, next) {
    graph.get('libroamigochile/posts?limit=1&fields=permalink_url', function(err, response){
      res.json(response.data);
    });
  });

  app.get('/api/twitter', function(req, res, next) {
    T.get('/statuses/user_timeline.json?screen_name=libroamigo&count=1', function(err, response) {
      res.json(response);
    })
  });

  // app.get('/api/youtube', function(req, res, next) {
  //   request('https://www.googleapis.com/youtube/v3/search?part=snippet&order=date&maxResults=2&channelId=UCglCGn-cc-peO1m45QnMXLQ&key=' + process.env.YOUTUBE_API_KEY, function (error, response, body) {
  //     if (!error && response.statusCode == 200) {
  //       var videos = JSON.parse(body);
  //       var data = [];
  //       for (var i = 1; i < videos.items.length; i++) {
  //         data.push(videos.items[i].id.videoId);
  //       }
  //       res.json(data);
  //     } else {
  //       res.send(500);
  //     }

  //   })
  // });

};
