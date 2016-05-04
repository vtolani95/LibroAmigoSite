angular.module('LoginCtrl', []).controller('loginController', function($http, $scope) {

// Solamente acesible para administradores
this.signup = function() {
  var data = ({
    email: this.email,
    password: this.password,
    name: this.name
  });
  $http.post('/signup', data).
    success(function(data, status, headers, config) {
      window.location.reload();
    }).
    error(function(data, status, headers, config) {
      alert('No podimos crear la cuenta');
    });
}

this.login = function() {
  var data = ({
    email: this.email,
    password: this.password
  });

  $http.post('/login', data).
    success(function(data, status, headers, config) {
      window.location.href="/";
    }).
    error(function(data, status, headers, config) {
      alert('información incorecta');
    });
}
// this.checkLogin = function() {
//   $http.get('/checklogin').
//     success(function(data, status, headers, config) {
//     }).
//     error(function(data, status, headers, config) {
//     });
// }
});
