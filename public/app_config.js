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
app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
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
      .when('/privado/voluntarios', {
        templateUrl: 'app/partials/private/voluntarios.html',
        controller: 'volunteerController',
        resolve: {
          loggedin: checkLoggedin
        }
      })
      .when('/privado/voluntario/nuevo', {
        templateUrl: 'app/partials/private/voluntario_nuevo.html',
        controller: 'newVolunteerController',
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
      .when('/privado/voluntario/:id', {
        templateUrl: 'app/partials/other_account.html',
        controller: 'otherAccountController',
        resolve: {
          loggedin: checkLoggedin
        }
      })
      .when('/cloudinary_cors', {
        templateUrl: 'app/partials/cloudinary_cors.html',
        resolve: {
          loggedin: checkLoggedin
        }
      })
      .when('/equipo', {
        templateUrl: 'app/partials/public/equipo.html',
        controller: 'publicVolunteerController'
      })
      .when('/fotos', {
        templateUrl: 'app/partials/photos.html',
        controller: 'photoController'
      })
      .when('/blog', {
        templateUrl: 'app/partials/blog.html',
        controller: 'blogController'
      })
      .when('/hospitales', {
        templateUrl: 'app/partials/hospitals.html',
        controller: 'hospitalController'
      })
      .otherwise({ templateUrl: 'app/partials/404.html' });
}]);
