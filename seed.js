require('dotenv').config();
var mongoose = require('mongoose');

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

var Role = require('./server/models/role');

// Crear rol de admin si todavia no existe
Role.find({ 'name' :  'Admin' }, function(err, role) {
  if (role.length != 0) {
    console.log ('admin role already exists');
    return;
  }
  Role.create({ name: 'Admin' }, function (err, small) {
    if (err) {
      console.log ('could not create role admin');
    }
    console.log('created admin role');
  });
});

// Crear rol de voluntario si todavia no existe
Role.find({ 'name' :  'Volunteer' }, function(err, role) {
  if (role.length != 0) {
    console.log ('volunteer role already exists');
    return;
  }
  Role.create({ name: 'Volunteer' }, function (err, small) {
    if (err) {
      console.log ('could not create role volunteer');
    }
    console.log ('created volunteer role');
  });
});


// Crear rol de Admin Catalina
var User = require('./server/models/user');

User.find({'name.first' : 'Catalina', 'name.last' : 'Sánchez'}, function(err, user) {
  if(user.length != 0) {
    console.log ('admin Catalina already exists');
    return;
  }
  var newUser = new User();
  // set the user's local credentials
  newUser._doc['email'] = 'catita.psg@gmail.com';
  newUser._doc['password'] = newUser.generateHash(process.env.DEFAULT_ADMIN_PASSWORD);
  newUser._doc['name'].first = 'Catalina';
  newUser._doc['name'].last = 'Sánchez';
  newUser._doc['role'] = 'Admin';
  newUser._doc['position'] = "coordinadora";

  // save the user
  newUser.save(function(err) {
      if (err)
        throw err;
      console.log ('created admin Catalina');
      return;
  });
});

// Crear rol de admin Varun
User.find({'name.first' : 'Varun', 'name.last' : 'Tolani'}, function(err, user) {
  if(user.length != 0) {
    console.log ('admin Varun already exists');
    return;
  }
  var newUser = new User();
  // set the user's local credentials
  newUser._doc['email'] = 'vatolani@gmail.com';
  newUser._doc['password'] = newUser.generateHash(process.env.DEFAULT_ADMIN_PASSWORD);
  newUser._doc['name'].first = 'Varun';
  newUser._doc['name'].last = 'Tolani';
  newUser._doc['role'] = 'Admin';
  newUser._doc['position'] = 'Creador de Pagina de Web';

  // save the user
  newUser.save(function(err) {
      if (err)
        throw err;
      console.log ('created admin Varun');
      return;
  });
});


// Crear Test Voluntarios
var i = 0;
for (i = 0; i < 10; i++) {
    var newUser = new User();
    // set the user's local credentials
    newUser._doc['email'] = 'test' + i.toString() + '@test.com';
    newUser._doc['password'] = newUser.generateHash(process.env.DEFAULT_ADMIN_PASSWORD);
    newUser._doc['name'].first = 'Test' + i.toString();
    newUser._doc['name'].last = 'Volunteer';
    newUser._doc['role'] = 'Volunteer';
    newUser._doc['position'] = 'Test' + i.toString();

    // save the user
    newUser.save(function(err) {
        if (err)
          throw err;
        console.log ('created Test Volunteer ' + i.toString());
        return;
    });
}
