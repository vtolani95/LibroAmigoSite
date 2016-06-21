// para data de Facebook
var graph = require('fbgraph');
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
})

module.exports = function(app) {

  app.get('/api/fb', function(req, res, next) {
    graph.get('libroamigochile/posts?limit=3&fields=permalink_url', function(err, response){
      res.json(response.data);
    });
  });

  app.get('/api/twitter', function(req, res, next) {
    T.get('/statuses/user_timeline.json?screen_name=libroamigo&count=3', function(err, response) {
      res.json(response);
    })
  });

};
