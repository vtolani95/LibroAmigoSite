angular.module('IndexCtrl', []).controller('indexController', function($scope, $http) {

  $scope.logout = function() {
    $http.get('/logout')
      .success(function(data) {
        window.location.href="/";
      })
      .error(function(data) {
        alert('unsuccesfull logout');
      });
  };

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

    $('.slideshow').flexslider({
      animation: "fade",
      animationLoop: false,
      slideShow:false,
      controlNav: true,
        maxItems: 1,
      pausePlay: false,
      mousewheel:true,
      start: function(slider){
        $('body').removeClass('loading');
      }
    });

    $(".message-box-title").click(function(){
      $(".message-box-title").toggleClass("opened");
      $(".message-box-title > i").toggleClass("icon-angle-down");
      $(".message-form").slideToggle();
    });


  });
});
