angular.module('IndexCtrl', []).controller('indexController', function($scope) {
  // logico del controller main
});


angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider) {

    $routeProvider

        // home page
        .when('/', {
            templateUrl: 'views/home.html',
            controller: 'indexController'
        })

}]);

angular.module('app', ['ngRoute', 'appRoutes', 'IndexCtrl']);
