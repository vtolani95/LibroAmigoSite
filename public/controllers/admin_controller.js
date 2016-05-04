angular.module('AdminCtrl', []).controller('adminController', function($scope, $http, $location) {

  var formatVolunteer = function(user) {
    var html = '<div class="col-md-4"><div class="single-mission"><div class="mission-img"><a href="#" title=""><img src="http://placehold.it/273x145" alt="" /></a></div><h3><a href="#" title="">';
    html += user.name.first + ' ' + user.name.last + '</a></h3></div></div>';
    return html;
  }

  $scope.$on('$viewContentLoaded', function(){
    $http.get('/api/voluntarios')
      .success(function(data) {
        var user_format = '';
        for(var i = 0; i < data.length; i += 1) {
          user_format += formatVolunteer(data[i]);
        }
        $('#content').append(user_format);
      })
      .error(function(data) {
        alert('error de servidor');
      });
  });

  // Crear un voluntario Nuevo
  this.signup = function() {
    if(this.password != this.password_repeat) {
      alert('Las claves no coenciden');
      return;
    }
    var data = ({
      email: this.email,
      password: this.password,
      firstname: this.name.first,
      lastname: this.name.last,
      role: this.role || "Voluntario"
    });
    $http.post('/api/voluntario/crear', data).
      success(function(data, status, headers, config) {
        $location.url('/admin/voluntarios');
      }).
      error(function(data, status, headers, config) {
        alert('No pudimos crear la cuenta');
      });
  }
});
