var User = require('../models/user');


module.exports = function(app, userAuth, adminAuth, passport, cloudinary) {

  // API Privado- solo para los que tienen una cuenta con Libro Amigo
  app.get('/api/voluntarios', userAuth, function(req, res, next) {
    User.find({_id: {$ne : req.user._id}}, 'name email role photo position', {sort: '_id'},
      function(err, users){
        if(err) {
          res.send(err);
        }
        res.json(users);
      });
  });

  app.post('/api/voluntario/crear', userAuth, adminAuth, passport.authenticate('local-signup'), function(req, res, next) {
    res.json(req.user);
  });

  app.put('/api/voluntario/foto/cambiar', userAuth, function(req, res, next) {
    var curr_photo_id = req.user.photo.public_id;
    if (curr_photo_id) {
      cloudinary.v2.uploader.destroy(curr_photo_id, function(error, result) {
        console.log(result);
      });
    };

    req.user.photo.url = req.body.url;
    req.user.photo.public_id = req.body.public_id;
    req.user.save();
    res.send(req.body.url);
  });

  app.get('/api/voluntario/:id', userAuth, function(req, res, next) {
    var query_str = 'name email phone photo position role';
    if (req.user.role == "Admin") {
      query_str += ' dob';
    }
    User.findById(req.params.id, query_str, function(err, user) {
      if(err) {
        res.send(err);
        return;
      }
      res.json(user);
    })
  })

  app.delete('/api/voluntario/:id', userAuth, adminAuth, function(req, res, next) {
    User.findById(req.params.id, function(err, user) {
      if(err) {
        res.send(err);
        return;
      }
      user.remove();
      res.send(200);
    });
  });

  // Para administradores- pueden cambiar el imagen de los demas
  // Administradores no pueden borrar los imagenes de otros administradores
  app.put('/api/voluntario/foto/cambiar/:id', adminAuth, function(req, res, next) {
    User.findById(req.params.id, function(err, user) {
      if(err) {
        res.send(err);
        return;
      }
      if (user.role == "Admin") {
        res.send(403);
      }
      var curr_photo_id = user.photo.public_id;
      if (curr_photo_id) {
        cloudinary.v2.uploader.destroy(curr_photo_id, function(error, result) {
          console.log(result);
        });
      };

      user.photo.url = req.body.url;
      user.photo.public_id = req.body.public_id;
      user.save();
      res.send(req.body.url);

    });
  });

  //API Publico- para paginas publicas
  app.get('/api/public/voluntarios', function(req, res, next) {
    User.find({}, 'name photo position', {sort: 'role', sort: '_id'},
      function(err, users){
        if(err) {
          res.send(err);
        }
        res.json(users);
      });
  });
};
