app.controller('donateController', function($http) {

  this.sendMail = function() {
    var data = ({
      Name: this.contactName,
      Email: this.email,
      Message: this.note
    });

    $('#submit')
      .after('<img src="sources/assets/ajax-loader.gif" class="loader" />')
      .attr('disabled','disabled');

    $http.post('/contact/send/donate', data).
      success(function(data, status, headers, config) {
        $("input.form-button").val("Mensaje Enviado!");
        $(".loader").remove();
      }).
      error(function(data, status, headers, config) {
        alert('Lo siento- no podemos enviar su mensaje');
      })
  }
});
