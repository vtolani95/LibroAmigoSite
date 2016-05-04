angular.module('appRoutes', ["checklist-model"]).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
  $locationProvider.html5Mode(true);
  $routeProvider
      .when('/', {
        templateUrl: 'app/partials/home.html',
        controller: 'indexController'
      })
      .when('/voluntario', {
        templateUrl: 'app/partials/voluntario.html',
        controller: 'emailController'
      })
      .when('/login', {
        templateUrl: 'app/partials/login.html',
        controller: 'loginController'
      })
      .when('/admin/voluntarios', {
        templateUrl: 'app/partials/admin/voluntarios.html',
        controller: 'adminController'
      })
      .otherwise({ templateUrl: 'app/partials/404.html' });
}]);

angular.module('app', ['ngRoute', 'appRoutes', 'IndexCtrl', 'BasicEmailCtrl', 'EmailCtrl', 'LoginCtrl', 'AdminCtrl']);
