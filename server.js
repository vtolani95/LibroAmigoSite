require('dotenv').config();
var express = require('express');
var app = express();
var mongoose = require('mongoose');
var path = require('path');
var passport = require('passport');
var flash    = require('connect-flash');
var favicon = require('serve-favicon');
var bodyParser  = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');

app.use(express.static(path.join(__dirname, 'public')));

app.use(favicon(__dirname + '/public/app/images/favicon.ico'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.set('views', path.join(__dirname, 'public/'));
app.set('view engine', 'jade');


// Here we find an appropriate database to connect to, defaulting to
// localhost if we don't find one.
var uristring =
  process.env.MONGOLAB_URI ||
  process.env.MONGOHQ_URL ||
  'mongodb://localhost:27017/angular-book';

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

// requisito para passport auth
app.use(session({ secret: 'libroAmigo123' })); // session secret
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

require('./config/passport')(passport);

// REST API ROUTES
var auth = require('./server/controllers/authRouter.js')(app, passport);
var email = require('./server/controllers/emailRouter');
app.use('/contact', email);

// Single page webpage con Angular
app.get('*', function(req, res) {
  res.locals._user = req.user || null;
  res.render('index.jade');
});

