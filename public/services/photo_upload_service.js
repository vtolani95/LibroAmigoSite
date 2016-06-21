app.service('photo_upload_service', function($http) {
  // si pass_this es verdad el objecto 'this' estará pasado al funcion callback
  // si multiple_images es verdad el usuario tiene la opcion de agregar imagenes multiples
  this.setupCloudinary = function(callback, element, multiple_images, pass_this) {
    $http.get('/photo/signature').
      success(function(data, status, headers, config) {
        cloudinary_data = ({
          timestamp: data.timestamp,
          signature: data.signature,
          api_key: data.api_key,
          callback: data.callback
        });
        var choose_photo = '<input name="file" accept="image/*" class="cloudinary-fileupload" data-cloudinary-field="image_id" data-form-data=' + JSON.stringify(cloudinary_data);
        if (multiple_images) {
          choose_photo += ' type="file" multiple/>';
        } else {
          choose_photo += ' type="file"/>'
        }
        $(element).append(choose_photo);
        $(element + " > input.cloudinary-fileupload[type=file]").cloudinary_fileupload();

        $(element + ' > .cloudinary-fileupload').bind('fileuploadprogress', function(e, data) {
          $('.progress-bar').css('width', Math.round((data.loaded * 100.0) / data.total) + '%');
        });

        $(element + ' > .cloudinary-fileupload').bind('cloudinarydone', function(e, data) {
          var new_photo = ({
            url: data.result.secure_url,
            public_id: data.result.public_id
          });
          if (pass_this) {
            callback(new_photo, this);
          } else {
            callback(new_photo);
          }

        });
      }).
      error(function(data, status, headers, config) {
        alert('no pudimos subir la foto nueva');
      });
  };
});
