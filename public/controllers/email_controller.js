angular.module('EmailCtrl', []).controller('emailController', function($http, $scope) {
  $scope.participationModel = [
    {id: 1, text: 'Gestión del módulo'},
    {id: 2, text: 'Carrito Lector'},
    {id: 3, text: 'Cuenta Cuentantos / narración oral'},
    {id: 4, text: 'Otro (bibliotecología, gestión de campañas, etc.)'}
  ];

  $scope.scheduleModel = [
    {id: 1, text: 'Lunes 15:30 - 19:30'},
    {id: 2, text: 'Martes 15:30 - 19:30'},
    {id: 3, text: 'Miercoles 15:30 - 19:30'},
    {id: 4, text: 'Jueves 15:30 - 19:30'},
    {id: 5, text: 'Viernes 15:30 - 19:30'},
    {id: 6, text: 'Sabado 17:00 - 19:00'},
    {id: 7, text: 'Domingo 17:00 - 19:00'}
  ]

  $scope.durationModel = [
    {id: 1, text: '3 meses'},
    {id: 2, text: '4 meses'},
    {id: 3, text: '5 meses'},
    {id: 4, text: '6 meses'}
  ]

  this.checkForm = function() {
    return this.participationModel && this.scheduleModel && this.durationModel;
  }

  this.sendMail = function() {
    if (!this.checkForm()) {
      alert('Por favor llena responde a todas las preguntas.');
      return;
    }

    $('#submit')
      .after('<img src="sources/assets/ajax-loader.gif" class="loader" />')
      .attr('disabled','disabled');

    var data = ({
      Name: this.contactName,
      Email: this.email,
      Edad: this.age,
      Teléfono: this.telephone,
      Ocupación: this.occupation,
      '¿Por qué te interesa participar?': this.interest,
      '¿Qué esperas del voluntariado en Libro Amigo?': this.hope,
      'En caso de "Otro" en sig. pregunta, especificar': this.other,
      '¿Cómo te gustaría participar?': this.participationModel.map(function(s) {return s.text}),
      '¿Días y horarios en que podrías participar?': this.scheduleModel.map(function(s) {return s.text}),
      'Duración de voluntariado (con opción de extender)': this.durationModel
    });

    if (this.readingModel) {
      var reading = ({'Interesados en cuentacuentos: ¿Tienes experiencia?': this.readingModel});
      $.extend(data, reading);
    }

    $http.post('/contact/send', data).
      success(function(data, status, headers, config) {
        $("input.form-button").val("Mensaje Enviado!");
        $(".loader").remove();
      }).
      error(function(data, status, headers, config) {
        alert('problem');
      });
  }
});
