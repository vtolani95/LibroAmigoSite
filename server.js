
var express = require('express');
var app = express();
var mongoose = require('mongoose');
var path = require('path');

app.use(express.static(path.join(__dirname, 'public')));

// Here we find an appropriate database to connect to, defaulting to
// localhost if we don't find one.
var uristring =
  process.env.MONGOLAB_URI ||
  process.env.MONGOHQ_URL ||
  'mongodb://localhost:27017/angular-book';

// The http server will listen to an appropriate port, or default to
// port 5000 (when use in localhost).
var theport = process.env.PORT || 5000;

// Makes connection asynchronously.  Mongoose will queue up database
// operations and release them when the connection is complete.
mongoose.connect(uristring, function (err, res) {
  if (err) {
    console.log ('ERROR connecting to: ' + uristring + '. ' + err);
  } else {
    console.log ('Succeeded connected to: ' + uristring);
  }
});

app.listen(process.env.PORT || 8080, function() {
    console.log('App listening on port 8080');
});

app.get('*', function(req, res) {
    res.sendFile('./public/index.html');
});
