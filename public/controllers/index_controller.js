app.controller('indexController', function($scope, $http) {
  $.cloudinary.config({"api_key": "822171432481527","cloud_name": "doe1qq4xy"});
  $scope.logout = function() {
    $http.get('/logout')
      .success(function(data) {
        window.location.href="/";
      })
      .error(function(data) {
        alert('unsuccesfull logout');
      });
  };

  var formatHospitals = function(hospitals) {
    var html = '';
    for (var row = 0; row < Math.ceil(hospitals.length / 3); row++) {
      html += '<li><div col="row">';
      for(var col = 0; col <= 2; col++) {
        if (row*3 + col >= hospitals.length) {
          break;
        }
        html += '<div class="col-md-4"><div class="causes-image"><img src="';
        if (hospitals[row*3 + col].photo) {
          html += hospitals[row*3 + col].photo.url + '"/>';
        } else {
          html += 'http://placehold.it/270x358"/>';
        }
        html += '<div class="cause-heading"><h3>' + hospitals[row*3 + col].name + '</h3></div>';
        html += '<div class="our-causes-hover"><p>' + hospitals[row*3 + col].description + '</p></div></div></div>';
      }
      html += "</li></div>";
    }
    return html;
  }

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

    $http.get('/api/public/hospitals')
      .success(function(data, status, headers, config) {
        var html = formatHospitals(data);
        $('#hospital-slides').append(html);
      })
      .error(function(data, status, headers, config) {
        alert('No pudimos cargar las hospitales');
      });

  });
});
