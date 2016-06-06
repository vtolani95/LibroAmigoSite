var Hospital = require('../models/hospital');

module.exports = function(app, adminAuth, cloudinary) {

  app.get('/api/public/hospitals', function(req, res, next) {
    Hospital.find({}, 'name description photo', {sort: 'name'},
      function(err, hospitals){
        if(err) {
          res.send(err);
        }
        res.json(hospitals);
      })
  });

  // Nueva Hospital
  app.post('/api/hospital', adminAuth, function(req,res,next) {
    var newHospital = new Hospital();
    newHospital.name = req.body.name;
    newHospital.description = req.body.description;
    if (req.body.photo) {
      newHospital.photo = req.body.photo;
    }
    newHospital.save();
    res.send(newHospital);
  });

  // Cambiar Hospital
  app.put('/api/hospital', adminAuth, function(req, res, next) {
    Hospital.findById(req.body.id, function(err, hospital) {
      if(err) {
        res.send(err);
        return;
      }
      hospital.description = req.body.description;
      hospital.name = req.body.name;
      if (req.body.photo) {
        if(hospital.photo) {
          cloudinary.v2.uploader.destroy(hospital.photo.public_id, function(error, result) {
            console.log(result);
          });
        }
        hospital.photo = req.body.photo;
      }
      hospital.save();
      res.json(hospital);
    });
  });

  // Borrar una hospital
  app.delete('/api/hospital/:id', adminAuth, function(req, res, next) {
    Hospital.findById(req.params.id, function(err, hospital) {
      if(err) {
        res.send(err);
        return;
      }
      if (hospital.photo) {
        cloudinary.v2.uploader.destroy(hospital.photo.public_id, function(error, result) {
          console.log(result);
        });
      }
      hospital.remove();
      res.send(200);
    });
  });
};
