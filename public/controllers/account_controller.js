angular.module('AccountCtrl', []).controller('accountController', function($scope, $http) {
  $scope.$on('$viewContentLoaded', function(){
    $http.get('/curruser').
      success(function(data, status, headers, config) {
        var name = data.name.first + ' ' + data.name.last;
        $('#user').append(name);
        $('#user_email').append(data.email);
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
