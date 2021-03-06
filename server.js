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
var cloudinary = require('cloudinary');

app.use(express.static(path.join(__dirname, 'public')));

app.use(favicon(__dirname + '/public/app/images/favicon.ico'));

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

app.use(cookieParser());
app.set('views', path.join(__dirname, 'public/'));
app.set('view engine', 'jade');


// Here we find an appropriate database to connect to, defaulting to
// localhost if we don't find one.
var uristring =
  process.env.MONGODB_URI ||
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

// Para subir imagenes al Cloud
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// requisito para passport auth
app.use(session({ secret: 'libroAmigo123' })); // session secret
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

require('./config/passport')(passport);

var userAuth = function(req, res, next){ if (!req.isAuthenticated()) res.send(401); else next(); };
var adminAuth = function(req, res, next){if (req.user.role == "Admin") next(); else res.send(403); };
// REST API ROUTES
var users = require('./server/controllers/userRouter.js')(app, passport, userAuth);
var email = require('./server/controllers/emailRouter');
var volunteers = require('./server/controllers/volunteerRouter')(app, userAuth, adminAuth, passport, cloudinary);
var photo = require('./server/controllers/photoRouter')(app, userAuth, adminAuth, cloudinary);
var blog = require('./server/controllers/blogRouter')(app, userAuth, adminAuth, cloudinary);
var hospital = require('./server/controllers/hospitalRouter')(app, adminAuth, cloudinary);
var socialMedia = require('./server/controllers/mediaRouter')(app);
var activity = require('./server/controllers/activityRouter')(app, userAuth, adminAuth, cloudinary);
app.use('/contact', email);

// Single page webpage con Angular
app.get('*', function(req, res) {
  res.locals._user = req.user || null;
  res.render('index.jade');
});

