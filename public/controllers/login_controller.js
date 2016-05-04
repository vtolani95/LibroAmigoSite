angular.module('LoginCtrl', []).controller('loginController', function($http, $scope) {
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
});
