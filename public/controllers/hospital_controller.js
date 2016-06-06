app.controller('hospitalController', function($http, $scope, photo_upload_service) {

  this.create = function() {
    var photo_data = $('.change-blog-form > textarea').data();
    var new_hospital = {
      name: this.name,
      description : this.description
    };
    if (photo_data.photoUrl) {
      new_hospital['photo'] = {
        url : photo_data.photoUrl,
        public_id : photo_data.photoId
      };
    }
    $http.post('/api/hospital', new_hospital).
      success(function(data, status, headers, config) {
        window.location.reload();
      }).
      error(function(data, status, headers, config) {
        alert('No pudimos crear la nueva hospital');
      });
  };

  var format_hospital = function(hospitals, admin) {
    var html = '';
    for (var row = 0; row < hospitals.length; row++) {
      html += '<form class="blog-post">';
      if (admin) {
        html += '<textarea class="form-control input-field" rows="1" id="hospital-name">' + hospitals[row].name + '</textarea>';
      } else {
        html += '<h2>' + hospitals[row].name + '</h2>';
      }
      if (hospitals[row].photo) {
        html += '<div class="col-md-4"><div class="gallery-image"><img src="' + hospitals[row].photo.url + '"></div></div><div class="col-md-8">';
      } else {
        html += '<div class="col-md-12">';
      }
      if (admin) {
        html += '<textarea data-id="' + hospitals[row]._id + '" class="edit-blog form-control input-field" rows="8">' + hospitals[row].description + '</textarea></div>';
        html += '<div id="change-blog-photo"><p>Cambiar Foto</p><div class="spacer"></div><div class="progress-bar"></div><div class="spacer2"></div></div>';
        html += '<div class="blog-post-options">' + '<button class="delete-img-button" onclick=deleteHospital("' + hospitals[row]._id + '")>Borrar</button>';
        html += '<button class="delete-img-button" onclick=editHospital("' + hospitals[row]._id + '")>Guardar Cambios</button>' +'</div>';
      } else {
        html += hospitals[row].description + '</div>';
      }
      html += '</div></form>';
    }
    return html;
  }

  var new_blog_upload_callback = function(new_photo) {
    $('.change-blog-form > textarea').data("photoUrl", new_photo.url);
    $('.change-blog-form > textarea').data("photoId", new_photo.public_id);
    $('#new-blog-photo').css('display', 'none');
    var new_img = '<img src="' + new_photo.url + '" style="width : 200px; display: table; padding-bottom: 15px;" >';
    $('#new-blog-photo').before(new_img);
  };

  var change_pic_upload_callback = function(new_photo, elem) {
    var blog_id = $(elem).closest('.blog-post').find('textarea').data("id");

    if ($('textarea[data-id=' + blog_id + ']').closest('.col-md-12').length > 0) {
      $('textarea[data-id=' + blog_id + ']').closest('.col-md-12').addClass('col-md-8').removeClass('col-md-12');
      var img = '<div class="col-md-4"><div class="gallery-image"><img src="' + new_photo.url + '"></div></div>';
      $('textarea[data-id=' + blog_id + ']').parent('div').before(img);
    } else {
      $('textarea[data-id=' + blog_id + ']').closest('.blog-post').find('img').attr('src', new_photo.url);
    }

    $('.change-blog-form > textarea').data("photoUrl", new_photo.url);
    $('.change-blog-form > textarea').data("photoId", new_photo.public_id);
    $('#change-blog-photo > p').text('Guardar Cambios -->');
    $('.progress-bar').css('display', 'none');
  };

  $scope.$on('$viewContentLoaded', function(){

    var admin = true;

    $http.get('/checklogin')
      .success(function(data) {
        photo_upload_service.setupCloudinary(new_blog_upload_callback, '#new-blog-photo > .spacer');
        $(".change-blog").click(function(){
          $(".change-blog > i").toggleClass("icon-angle-down icon-angle-up");
          $(".change-blog-form").slideToggle(50);
        });
        if(data.role != "Admin") {
          admin = false;
        }
        })
      .error(function(data) { $('#change-blog').remove(); admin = false; $('form.change-blog-form').remove();});

    $http.get('/api/public/hospitals')
      .success(function(data, status, headers, config) {
        var html = format_hospital(data, admin);
        $('#hospitals').append(html);
        var delete_hospital = '<script>var deleteHospital=function(id){if(confirm("¿Usted está seguro que quiere borrar esta Hospital del sistema?")){$.ajax({url:"/api/hospital/"+id,type:"DELETE",success:function(e){window.location.reload();}})}};</script>';
        var change_hospital = '<script>var editHospital=function(t){if(confirm("¿Usted está seguro que quiere cambiar la información de esta Hospital?")){var a=$("textarea[data-id=\'"+t+"\']").val(),b=$("textarea[data-id=\'"+t+"\']").closest(".blog-post").find("#hospital-name").val(),o=$(".change-blog-form > textarea").data(),e={description:a, id:t, name:b};o.photoUrl&&(e.photo={url:o.photoUrl,public_id:o.photoId}),$.ajax({url:"/api/hospital/",type:"PUT",data: e,success:function(t){location.reload()}})}};</script>';
        $('head').append(delete_hospital);
        $('head').append(change_hospital);
        if (admin) {
          photo_upload_service.setupCloudinary(change_pic_upload_callback, '#change-blog-photo > .spacer', true);
        }

      })
      .error(function(data, status, headers, config) {
        alert('error');
      });

  });
});
