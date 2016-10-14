app.controller('emailController', function($http, $scope) {
  $scope.hospitalModel = [
    {id: 1, text: 'Hospital Félix Bulnes (Lunes a viernes de 17:30 a 19:30hrs. Sábado y domingo de 17 a 19hrs.)'},
    {id: 2, text: 'Hospital San Juan de Dios (Lunes a jueves hasta las 17pm y viernes hasta las 16pm.)'},
    {id: 3, text: 'Hospital del Salvador (Lunes a viernes hasta las 17pm.)'}
  ];

  $scope.participationModel = [
    {id: 1, text: 'Atención del módulo'},
    {id: 2, text: 'Carrito Lector'},
    {id: 3, text: 'Otro (bibliotecología, gestión de campañas, etc.)'}
  ];

  $scope.durationModel = [
    {id: 1, text: '3 meses'},
    {id: 2, text: '4 meses'},
    {id: 3, text: '5 meses'},
    {id: 4, text: '6 meses'}
  ]

  this.checkForm = function() {
    return this.participationModel && this.durationModel;
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
      '¿Días y horarios en que podrías participar?': this.schedule,
      'Duración de voluntariado (con opción de extender)': this.durationModel,
      'Hospital(es)': this.hospitalModel.map(function(s) {return s.text})
    });

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
