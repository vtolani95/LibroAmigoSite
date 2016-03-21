angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
  $locationProvider.html5Mode(true);
  $routeProvider
      .when('/', {
          templateUrl: 'app/partials/home.html',
          controller: 'indexController'
      })
      .otherwise({
          templateUrl: 'app/partials/404.html',
          controller: 'errorController'
      });
}]);

angular.module('app', ['ngRoute', 'appRoutes', 'IndexCtrl', 'ErrorCtrl']);
