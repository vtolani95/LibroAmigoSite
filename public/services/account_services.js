app.service('account_services', function($http) {
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

  this.bindButtons = function() {
    $(".change-pass").click(function(){
        $(".change-pass > i").toggleClass("icon-angle-down icon-angle-up");
        $(".change-pass-form").toggle(50);
      });

    $(".change-photo").click(function(){
        $(".change-photo > i").toggleClass("icon-angle-down icon-angle-up");
        $(".change-photo-form").slideToggle(50);
      });

    $(".change-dob").click(function(){
        $(".change-dob > i").toggleClass("icon-angle-down icon-angle-up");
        $(".change-dob-form").slideToggle(50);
      });

    $(".change-phone").click(function(){
        $(".change-phone > i").toggleClass("icon-angle-down icon-angle-up");
        $(".change-phone-form").slideToggle(50);
      });
  };

  this.formatDate = function(date) {
    return date.substring(0, date.indexOf("T"));
  };

  // partes de usuario compartidos a traves de paginas publicas y privadas (nombre, posicion, imagen)
  this.populateUser = function(data) {
    var name = data.name.first + ' ' + data.name.last;
    $('#user').append(name);
    $('#user_email').append(data.email);
    $('#position').text(data.role + "- " + data.position);

    if (data.photo) {
       $('#user_img').attr('src', data.photo.url);
    }
  }
});
