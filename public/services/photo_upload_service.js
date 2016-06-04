app.service('photo_upload_service', function($http) {
  this.setupCloudinary = function(callback) {
    $http.get('/photo/signature').
      success(function(data, status, headers, config) {
        cloudinary_data = ({
          timestamp: data.timestamp,
          signature: data.signature,
          api_key: data.api_key,
          callback: data.callback
        });
        var choose_photo = '<input name="file" accept="image/*" class="cloudinary-fileupload" data-cloudinary-field="image_id" data-form-data=' + JSON.stringify(cloudinary_data) + ' type="file"/>';
        $('.spacer').append(choose_photo);
        $("input.cloudinary-fileupload[type=file]").cloudinary_fileupload();

        $('.cloudinary-fileupload').bind('fileuploadprogress', function(e, data) {
          $('.progress-bar').css('width', Math.round((data.loaded * 100.0) / data.total) + '%');
        });

        $('.cloudinary-fileupload').bind('cloudinarydone', function(e, data) {
          var new_photo = ({
            url: data.result.secure_url,
            public_id: data.result.public_id
          });
          callback(new_photo);
        });
      }).
      error(function(data, status, headers, config) {
        alert('no pudimos subir la foto nueva');
      });
  };
});
