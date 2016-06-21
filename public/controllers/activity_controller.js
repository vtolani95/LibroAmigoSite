app.controller('activityController', function($http, $scope, photo_upload_service) {

  this.createPost = function() {
    var photos = $('.change-blog-form > textarea').data();
    var new_post = {
      text : this.text
    };
    if (photos.photos.length > 0) {
      new_post['photos'] = photos.photos;
    }
    $http.post('/api/actividad', new_post).
      success(function(data, status, headers, config) {
        window.location.reload();
      }).
      error(function(data, status, headers, config) {
        alert('No pudimos crear la nueva entrada de blog');
      });
  };

  var formatDate = function(date) {
    return date.substring(0, date.indexOf("T"));
  }

  var canEdit = function(user, admin, activity) {
    if (admin) {
      return true;
    } else if (!user) {
      return false;
    } else {
      return activity.author.id === user._id;
    }
  }

  var format_activity = function(activities, admin, user) {
    var html = '';
    for (var row = 0; row < activities.length; row++) {
      html += '<form class="blog-post">';
      if (activities[row].photos) {
        html += '<div class="row">';
        for(var i = 0; i < activities[row].photos.length; i+=1) {
          html += '<div class="col-md-4"><div class="single-mission"><div class="mission-img"><a title=""><img width="273" src="' + activities[row].photos[i].url + '"/>';
          html += '</a></div>';
          if (canEdit(user, admin, activities[row])) {
            html += '<button class="form-button" onclick=deleteImage("' + activities[row]._id + '","' + activities[row].photos[i].public_id + '")>Borrar Foto</button>';
          }
          html += '</div></div>';
        }
        html += "</div>";
      }

      html += '<div class="col-md-12">';
      if (canEdit(user, admin, activities[row])) {
        html += '<textarea data-id="' + activities[row]._id + '" class="edit-blog form-control input-field" data-photos="[]" rows="11" style="width:100%;">' + activities[row].text + '</textarea>';
      } else {
        html += activities[row].text;
      }
      html += '</div>';
      html += '<div class="blog-post-details"><ul class="post-meta">';
      html += '<li><a><i class="icon-calendar"></i>' + formatDate(activities[row].date) + '</a></li>';
      html += '<li><a><i class="icon-user"></i>' + activities[row].author.name + '</a></li>';
      html += '</ul>';
      if (canEdit(user, admin, activities[row])) {
        html += '<div id="change-blog-photo"><div class="spacer"></div><div class="progress-bar"></div><div class="spacer2"></div></div>';
        html += '<div class="blog-post-options">';
        html += '<button class="delete-img-button" onclick=deleteActivity("' + activities[row]._id + '")>Borrar</button>';
        html += '<button class="delete-img-button" onclick=editActivity("' + activities[row]._id + '")>Guardar Cambios</button>' +'</div>';
      }
      html += '</div></form>';
    }
    return html;
  }

  var new_blog_upload_callback = function(new_photo) {
    var old_photos = $('.change-blog-form > textarea').data("photos");
    old_photos.push(new_photo);
    $('.change-blog-form > textarea').data("photos", old_photos);
    $('#new-blog-photo').css('display', 'none');
    var new_img = '<img src="' + new_photo.url + '" style="width : 200px; display: table; padding-bottom: 15px;" >';
    $('#new-blog-photo').before(new_img);
  };

  var change_pic_upload_callback = function(new_photo, elem) {
    var blog_id = $(elem).closest('.blog-post').find('textarea').data("id");
    var html = '<div class="col-md-4"><div class="single-mission"><div class="mission-img"><a title=""><img width="273" src="' + new_photo.url + '"/></a></div></div></div>';
    $('textarea[data-id=' + blog_id + ']').parent('form').find('.row').append(html);
    // agregar foto a esta pagina

    var old_photos = $('textarea[data-id=' + blog_id + ']').data("photos");
    old_photos.push(new_photo);
    $('textarea[data-id=' + blog_id + ']').data("photos", old_photos);
    $('.progress-bar').css('display', 'none');
  };

  $scope.$on('$viewContentLoaded', function(){

    var admin = true;
    var user = null;

    $http.get('/checklogin')
      .success(function(data) {
        photo_upload_service.setupCloudinary(new_blog_upload_callback, '#new-blog-photo > .spacer', true);
        user = data;
        $(".change-blog").click(function(){
          $(".change-blog > i").toggleClass("icon-angle-down icon-angle-up");
          $(".change-blog-form").slideToggle(50);
        });
        if(data.role != "Admin") {
          admin = false;
        }
      })
      .error(function(data) { $('#change-blog').remove(); admin = false; $('form.change-blog-form').remove();});

    $http.get('/api/public/actividades')
      .success(function(data, status, headers, config) {
        var html = format_activity(data, admin, user);
        $('#activities').append(html);
        var delete_image = '<script>var deleteImage=function(post_id, img_id){if(confirm("¿Usted está seguro que quiere borrar este Imagen?")){$.ajax({url:"/api/actividad/foto/" + post_id +"/" + img_id,type:"DELETE",success:function(e){window.location.reload();}})}};</script>';
        var delete_blog = '<script>var deleteActivity=function(id){if(confirm("¿Usted está seguro que quiere borrar esta entrada de Actividad?")){$.ajax({url:"/api/actividad/"+id,type:"DELETE",success:function(e){window.location.reload();}})}};</script>';
        var change_blog = '<script>var editActivity=function(t){if(confirm("¿Usted está seguro que quiere cambiar esta entrada de Actividad?")){var a=$("textarea[data-id=\'"+t+"\']").val(),o=$("textarea[data-id=\'"+t+"\']").data(),e={text:a, id:t, photos: o.photos};$.ajax({url:"/api/actividad/",type:"PUT",data: e,success:function(t){location.reload();}})}};</script>';
        $('head').append(delete_image);
        $('head').append(delete_blog);
        $('head').append(change_blog);
        if(user) {
          photo_upload_service.setupCloudinary(change_pic_upload_callback, '#change-blog-photo > .spacer', true, true);
        }

      })
      .error(function(data, status, headers, config) {
        alert('error');
      });

  });
});
