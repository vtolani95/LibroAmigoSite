var Activity = require('../models/activity');

module.exports = function(app, userAuth, adminAuth, cloudinary) {

  var canChange = function(req, activity) {
    if (req.user.role == "Admin") {
      return true;
    } else {
      return req.user._id === activity.author.id;
    }
  };

  app.get('/api/public/actividades', function(req, res, next) {
    Activity.find({}, 'text author photos date', {sort: '-date'},
      function(err, activities){
        if(err) {
          res.send(err);
        }
        if (req.query.mostRecent) {
          res.json(activities[0]);
        } else {
          res.json(activities);
        }

      })
  });

  // Crear nueva entrada de actividades
  app.post('/api/actividad', userAuth, function(req, res, next) {
    var newActivity = new Activity();
    newActivity.text = req.body.text;
    if (req.body.photos) {
      newActivity.photos = req.body.photos;
    }
    newActivity.author.name = req.user.name.first + " " + req.user.name.last;
    newActivity.author.id = req.user.id;
    newActivity.save();
    res.send(newActivity);
  });

    // Cambiar entrada de actividad
  app.put('/api/actividad', userAuth, function(req, res, next) {

    Activity.findById(req.body.id, function(err, activity) {
      if(err) {
        res.send(err);
        return;
      }
      if (canChange(req, activity)) {
        activity.text = req.body.text;
        if (req.body.photos) {
          for (var i = 0; i < req.body.photos.length; i+=1) {
            activity.photos.push(req.body.photos[i]);
          }
        }
        activity.save();
        res.json(activity);
        return;
      }
      res.send(401);
    });
  });

  //Borrar una foto de entrada de Actividad
  app.delete('/api/actividad/foto/:post_id/:photo_id', userAuth, function(req, res, next) {
    Activity.findById(req.params.post_id, function(err, activity) {
      if(err) {
        res.send(err);
        return;
      }
      if(canChange(req, activity)) {
        cloudinary.v2.uploader.destroy(req.params.photo_id, function(error, result) {
          console.log(result);
        });
        var index = activity.photos.findIndex(function(e) {return e.public_id === req.params.photo_id});
        activity.photos.splice(index, 1);
        activity.save();
      }
      res.send(401);
    })
  })

  // Borrar una entrada de Actividades
  app.delete('/api/actividad/:id', adminAuth, function(req, res, next) {
    Activity.findById(req.params.id, function(err, activity) {
      if(err) {
        res.send(err);
        return;
      }
      if (canChange(req, activity)) {
        if(activity.photos) {
          for(var i = 0; i < activity.photos.length; i+=1) {
            cloudinary.v2.uploader.destroy(activity.photos[i].public_id, function(error, result) {
              console.log(result);
            });
          }
        }
        activity.remove();
        res.send(200);
        return;
      }
      res.send(401);
    });
  });

};
