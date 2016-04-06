angular.module('EmailCtrl', []).controller('emailController', function($http) {
  this.sendMail = function() {
    var data = ({
      name: this.contactName,
      email: this.contactEmail,
      telefono: this.contactPhone,
      message: this.contactMsg
    });

    $http.post('/contact/send', data).
      success(function(data, status, headers, config) {
        alert('email sent');
      }).
      error(function(data, status, headers, config) {
        alert('define rest route');
      })
  }


});
