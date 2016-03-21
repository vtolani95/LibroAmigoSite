angular.module('IndexCtrl', []).controller('indexController', function($scope) {

  $scope.$on('$viewContentLoaded', function(){
    jQuery("#layerslider").layerSlider({
      responsive: true,
      responsiveUnder: 1280,
      layersContainer: 1170,
      skin: 'fullwidth',
      hoverPrevNext: true,
      skinsPath: 'sources/layerslider/skins/'
    });

    $(function() {
      $('#carousel').carouFredSel({
        responsive: true,
        circular: false,
        auto: false,
        items: {
          visible: 1,
          width: 20,
        },
        scroll: {
          fx: 'directscroll'
        }
      });
      $('#thumbs').carouFredSel({
        responsive: true,
        circular: false,
        infinite: false,
        auto: false,
        prev: '#prev',
        next: '#next',
        items: {
          visible: {
            min: 1,
            max: 6
          },
          width: 200,
          height: '80%'
        }
      });
      $('#thumbs a').click(function() {
        $('#carousel').trigger('slideTo', '#' + this.href.split('#').pop() );
        $('#thumbs a').removeClass('selected');
        $(this).addClass('selected');
        return false;
      });
    });
  });
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
