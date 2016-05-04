// Requiere autorizacion para ciertas paginas
var checkLoggedin = function($q, $timeout, $http, $location, $rootScope){
  var deferred = $q.defer();
  $http.get('/checklogin')
    .success(function(user){
      deferred.resolve();
    })
    .error(function(err){
      $rootScope.message = 'You need to log in.';
      deferred.reject();
      $location.url('/login');
    })
  return deferred.promise;
}

// Rutas de Angular
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
        controller: 'adminController',
        resolve: {
          loggedin: checkLoggedin
        }
      })
      .when('/admin/voluntario/nuevo', {
        templateUrl: 'app/partials/admin/voluntario_nuevo.html',
        controller: 'adminController',
        resolve: {
          loggedin: checkLoggedin
        }
      })
      .when('/cuenta', {
        templateUrl: 'app/partials/account.html',
        controller: 'accountController',
        resolve: {
          loggedin: checkLoggedin
        }
      })
      .otherwise({ templateUrl: 'app/partials/404.html' });
}]);

angular.module('app', ['ngRoute', 'appRoutes', 'IndexCtrl', 'BasicEmailCtrl', 'EmailCtrl', 'LoginCtrl', 'AdminCtrl', 'NewVolunteerCtrl', 'AccountCtrl']);
