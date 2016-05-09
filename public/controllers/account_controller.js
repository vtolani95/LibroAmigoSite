angular.module('AccountCtrl', []).controller('accountController', function($scope, $http, $location) {
  $scope.$on('$viewContentLoaded', function(){

    $http.get('/photo/signature').
      success(function(data, status, headers, config) {
        cloudinary_data = ({
          timestamp: data.timestamp,
          signature: data.signature,
          api_key: data.api_key,
          callback: data.callback
        });
        var choose_photo = '<input name="file" class="cloudinary-fileupload" data-cloudinary-field="image_id" data-form-data=' + JSON.stringify(cloudinary_data) + ' type="file"/>';
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
          $http.put('/api/voluntario/foto/cambiar', new_photo).
            success(function(data, status, headers, config) {
              $('#user_img').attr('src', new_photo.url);
              $('.progress-bar')[0].style.width = "0%";
              $(".change-photo > i").toggleClass("icon-angle-down icon-angle-up");
              $(".change-photo-form").slideToggle(1000);
            }).
            error(function(data, status, headers, config) {
              alert('no pudimos cambiar la foto');
            });
        });
      }).
      error(function(data, status, headers, config) {
        alert('no pudimos subir la foto nueva');
      });

    $http.get('/curruser').
      success(function(data, status, headers, config) {
        var name = data.name.first + ' ' + data.name.last;
        $('#user').append(name);
        $('#user_email').append(data.email);
        if (data.photo) {
           $('#user_img').attr('src', data.photo.url);
        };
      }).
      error(function(data, status, headers, config) {

      });
    $(".change-pass").click(function(){
        $(".change-pass > i").toggleClass("icon-angle-down icon-angle-up");
        $(".change-pass-form").toggle(50);
      });

    $(".change-photo").click(function(){
        $(".change-photo > i").toggleClass("icon-angle-down icon-angle-up");
        $(".change-photo-form").slideToggle(50);
      });
  });

  this.changePass = function() {
    if(this.pass != this.pass_repeat) {
      alert('Las claves no coenciden');
      return;
    }
    var data = ({
      curr_pass: this.prev_pass,
      new_pass: this.pass
    });
    $http.post('/changepass', data).
      success(function(data, status, headers, config) {
        $(".change-pass > i").toggleClass("icon-angle-down icon-angle-up");
        $(".change-pass-form").toggle(50);
        alert('clave cambiado exitosamente');
      }).
      error(function(data, status, headers, config) {
        alert('Tu clave antigua esta incorecta');
      });
  };
});
