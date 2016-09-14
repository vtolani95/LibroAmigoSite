app.controller('otherAccountController', function($scope, $http, $routeParams, account_services) {
  $http.get('/checklogin').
    success(function(my_data, status, headers, config) {
      if(my_data.role != "Admin") {
        $('#change-info').remove();
      }
      $http.get('/api/voluntario/' + $routeParams.id).
        success(function(data, status, headers, config) {
          account_services.populateUser(data);
          if(data.dob) {
            $('#dob p').text(account_services.formatDate(data.dob));
          } else {
            $('#dob').remove();
          }

          if(data.phone) {
            $('#phone p').text(data.phone);
          } else {
            $('#phone').remove();
          }

          if(my_data.role == "Admin" && data.role == "Admin") {
            $('#change-info').remove();
          }
        });
    });

  var cloudinary_pic_change_callback = function(new_photo) {
    $http.put('/api/voluntario/foto/cambiar/' + $routeParams.id, new_photo).
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
  photo_upload_service.setupCloudinary(cloudinary_pic_change_callback, '.spacer');

  $scope.$on('$viewContentLoaded', function() {
    account_services.bindButtons();
  });

});
