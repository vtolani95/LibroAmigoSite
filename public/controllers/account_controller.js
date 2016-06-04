app.controller('accountController', function($scope, $http, account_services, photo_upload_service) {

  $scope.$on('$viewContentLoaded', function(){
    var cloudinary_pic_change_callback = function(new_photo) {
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
      };
    photo_upload_service.setupCloudinary(cloudinary_pic_change_callback);
    account_services.bindButtons();
    $http.get('/checklogin').
      success(function(data, status, headers, config) {
        account_services.populateUser(data);
        if(data.dob) {
          $('#dob p').text(account_services.formatDate(data.dob));
        } else {
          $('#dob p').text('Agréguela');
          $('#dob p').css('color', '#e94e15');
        }

        if(data.phone) {
          $('#phone p').text(data.phone);
        } else {
          $('#phone p').text('Agréguelo');
          $('#phone p').css('color', '#e94e15');
        }
      });
  });

  this.changePass = function() {
    if(this.pass != this.pass_repeat) {
      alert('Las claves no coenciden');
      return;
    }
    if(!confirm('¿Usted está seguro que quiere cambiar su clave?')) {
      return;
    }
    var data = ({
      curr_pass: this.prev_pass,
      new_pass: this.pass
    });
    $http.post('/change/pass', data).
      success(function(data, status, headers, config) {
        $(".change-pass > i").toggleClass("icon-angle-down icon-angle-up");
        $(".change-pass-form").toggle(50);
        alert('clave cambiado exitosamente');
      }).
      error(function(data, status, headers, config) {
        alert('Su clave antigua esta incorecta');
      });
  };

  var formatDate = function(date) {
    return date.substring(0, date.indexOf("T"));
  }


  this.changeDob = function() {
    var data = ({
      dob: this.dob
    });
    $http.post('/change/dob', data).
      success(function(data, status, headers, config) {
        $(".change-dob > i").toggleClass("icon-angle-down icon-angle-up");
        $(".change-dob-form").toggle(50);
        $('#dob p').text(formatDate(data.dob));
        $('#dob p').css('color', '#9a9a9a');
        alert('fecha de nacimiento cambiado exitosamente');
      }).
      error(function(data, status, headers, config) {
        alert('No pudimos cambiar su fecha de nacimiento');
      });
  };

  this.changePhone = function() {
    var data = ({
      phone: this.phone
    });
    $http.post('/change/phone', data).
      success(function(data, status, headers, config) {
        $(".change-phone > i").toggleClass("icon-angle-down icon-angle-up");
        $(".change-phone-form").toggle(50);
        $('#phone p').text(data.phone);
        $('#phone p').css('color', '#9a9a9a')
        alert('Teléfono cambiado exitosamente');
      }).
      error(function(data, status, headers, config) {
        alert('No pudimos cambiar su teléfono');
      });
  };

});
