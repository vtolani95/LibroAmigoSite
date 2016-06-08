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
  User.find({'email': 'test' + i.toString() + '@test.com'}, function(err, user) {
    if(user.length != 0) {
      console.log ('test user test' + i.toString() + ' already exists');
      return;
    }
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
  });
}


var Hospital = require('./server/models/hospital');

// Crear hospital Félix Bulnes
Hospital.find({'name' : 'Hospital Félix Bulnes'}, function(err, hospital) {
  if(hospital.length != 0) {
    console.log ('hospital Félix Bulnes already exists');
    return;
  }
  var newHospital = new Hospital();
  // set the hospital's local credentials
  newHospital._doc['name'] = 'Hospital Félix Bulnes';
  newHospital._doc['description'] = 'Ubicado en calle Holanda #060, Providencia, nuestro módulo está ubicado por la entrada principal, al lado de la sala de espera. La atención es de lunes a viernes, entre las 17:30 y 19:30 hrs, durante los fines de semana la atención es entre 17:00 y 19:00 hrs.';

  // save the user
  newHospital.save(function(err) {
      if (err)
        throw err;
      console.log ('created hospital Félix Bulnes');
      return;
  });
});

// Crear hospital Félix Bulnes
Hospital.find({'name' : 'Hospital del Salvador'}, function(err, hospital) {
  if(hospital.length != 0) {
    console.log ('Hospital del Salvador already exists');
    return;
  }
  var newHospital = new Hospital();
  // set the hospital's local credentials
  newHospital._doc['name'] = 'Hospital del Salvador';
  newHospital._doc['description'] = 'Ubicado en Avenida Salvador #364, Providencia. Nuestro módulo se encuentra en el hall del acceso principal, junto a la oficina de informaciones. La atención ';

  // save the user
  newHospital.save(function(err) {
      if (err)
        throw err;
      console.log ('created Hospital del Salvador');
      return;
  });
});


