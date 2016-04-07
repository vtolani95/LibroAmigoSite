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

  this.sendMail = function() {

  }
});
