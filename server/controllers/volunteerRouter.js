var User = require('../models/user');
var cloudinary = require('../../node_modules/cloudinary/cloudinary');
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

module.exports = function(app, userAuth, adminAuth, passport) {

  app.get('/api/voluntarios', userAuth, function(req, res, next) {
    User.find({_id: {$ne : req.user._id}}, 'name email role photo',
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
    })
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
};
