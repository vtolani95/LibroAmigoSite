app.controller('newVolunteerController', function($http, $location) {

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
      role: this.role || "Voluntario",
      position: this.position
    });
    $http.post('/api/voluntario/crear', data).
      success(function(data, status, headers, config) {
        $location.url('/privado/voluntarios');
      }).
      error(function(data, status, headers, config) {
        alert('No pudimos crear la cuenta');
      });
  }
});
