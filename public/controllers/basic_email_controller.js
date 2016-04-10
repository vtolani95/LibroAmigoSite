angular.module('BasicEmailCtrl', []).controller('basicEmailController', function($http) {

  this.sendMail = function() {
    // check form filled
    var data = ({
      Name: this.contactName,
      Email: this.contactEmail,
      Telefono: this.contactPhone,
      Message: this.contactMsg
    });

    $http.post('/contact/send/basic', data).
      success(function(data, status, headers, config) {
        $(".message-box-title").toggleClass("opened");
        $(".message-box-title > i").toggleClass("icon-angle-down");
        $(".message-form").slideToggle();
        $(".message-box-title > p").html("Mensaje Enviado!");
      }).
      error(function(data, status, headers, config) {
        alert('Lo siento- no podemos enviar tu mensaje');
        $(".message-box-title").toggleClass("opened");
        $(".message-box-title > i").toggleClass("icon-angle-down");
        $(".message-form").slideToggle();
      })
  }
});
