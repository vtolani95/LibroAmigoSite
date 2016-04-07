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
      .otherwise({ templateUrl: 'app/partials/404.html' });
}]);

angular.module('app', ['ngRoute', 'appRoutes', 'IndexCtrl', 'BasicEmailCtrl', 'EmailCtrl']);
