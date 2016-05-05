var sha1 = require('sha1');
module.exports = function(app, userAuth) {
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
};
