app.controller('photoController', function($http, $scope, photo_upload_service) {
  var format_photos = function(photos, admin) {
    var html = '';
    for (var row = 0; row < Math.ceil(photos.length/3); row++) {
      html += '<div class="row">';
      for(var pic = 0; pic <= 2; pic++) {
        if (row*3 + pic >= photos.length) {
          break;
        }
        html += '<div class="col-md-4"><div class="gallery-image"><img src="' + photos[row*3 + pic].url + '"></div>';
        if (admin) {
          html += '<button class="delete-img-button" onclick=deleteImage("' + photos[row*3 + pic]._id + '")>Borrar</button>';
        }
        html += '</div>';
      }
      html += '</div>';
    }
    return html;
  }

  $scope.$on('$viewContentLoaded', function(){
    var new_pic_upload_callback = function(new_photo) {
      $http.post('/api/photo', new_photo)
        .success(function(data, status, headers, config) {
          window.location.reload();
        })
        .error(function(data, status, headers, config) {
          alert('Lo siento pero no pudimos subir tú foto');
        });
    };

    var admin = true;
    $http.get('/checklogin')
      .success(function(data) {
          if(data.role != "Admin") {
            admin = false;
            $('#new_photo').remove();
          } else {
              photo_upload_service.setupCloudinary(new_pic_upload_callback);
              $(".change-photo").click(function(){
                $(".change-photo > i").toggleClass("icon-angle-down icon-angle-up");
                $(".change-photo-form").slideToggle(50);
              });
          }
        })
      .error(function(data) { $('#new_photo').remove(); admin = false;});

    $http.get('/api/public/photos')
      .success(function(data, status, headers, config) {
        var html = format_photos(data, admin);
        $('#photos').append(html);
        var js = '<script>var deleteImage=function(id){if(confirm("¿Usted está seguro que quiere borrar este imagen?")){$.ajax({url:"/api/photo/"+id,type:"DELETE",success:function(e){window.location.reload();}})}};</script>';
        $('head').append(js);
      })
      .error(function(data, status, headers, config) {
        alert('error');
      });
  });
});
