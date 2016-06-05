var sha1 = require('sha1');
var Photo = require('../models/photo');

module.exports = function(app, userAuth, adminAuth, cloudinary) {
  // Ruta para crear firma unica para cloudinary segun estas instrucciones
  // http://cloudinary.com/documentation/upload_images#creating_api_authentication_signatures
  app.get('/photo/signature', userAuth, function(req, res, next) {
    var curr_time = new Date();
    var unix_time = Math.floor(curr_time.getTime() / 1000);
    var callback = process.env.ROOT_URL + "/cloudinary_cors";
    var to_hash = "callback=" + callback + "&timestamp=" + unix_time.toString() + process.env.CLOUDINARY_API_SECRET;
    var data = ({
      signature: sha1(to_hash),
      api_key: process.env.CLOUDINARY_API_KEY,
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      timestamp: unix_time,
      callback: callback
    });
    res.json(data);
  });

  app.get('/api/public/photos', function(req, res, next) {
    Photo.find({}, 'url',
      function(err, photos){
        if(err) {
          res.send(err);
        }
        res.json(photos);
      })
  });

  // Crear nueva foto
  app.post('/api/photo', adminAuth, function(req, res, next) {
    var newPhoto = new Photo();
    newPhoto.url = req.body.url;
    newPhoto.public_id = req.body.public_id;
    newPhoto.save();
    res.send(newPhoto.url);
  });

  // Borrar una foto
  app.delete('/api/photo/:id', adminAuth, function(req, res, next) {
    Photo.findById(req.params.id, function(err, photo) {
      if(err) {
        res.send(err);
        return;
      }
      cloudinary.v2.uploader.destroy(photo.public_id, function(error, result) {
        console.log(result);
      });
      photo.remove();
      res.send(200);
    });
  });

};
