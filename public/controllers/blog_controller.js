app.controller('blogController', function($http, $scope, photo_upload_service) {

  this.createPost = function() {
    var photo_data = $('.change-blog-form > textarea').data();
    var new_post = {
      text : this.text
    };
    if (photo_data.photoUrl) {
      new_post['photo'] = {
        url : photo_data.photoUrl,
        public_id : photo_data.photoId
      };
    }
    $http.post('/api/blog', new_post).
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

  var canEdit = function(user, admin, blog) {
    if (admin) {
      return true;
    } else if (!user) {
      return false;
    } else {
      return blog.author.id === user._id;
    }
  }

  var format_blog = function(blogs, admin, user) {
    var html = '';
    for (var row = 0; row < blogs.length; row++) {
      html += '<form class="blog-post">';
      if (blogs[row].photo) {
        html += '<div class="col-md-4"><div class="gallery-image"><img src="' + blogs[row].photo.url + '"></div></div><div class="col-md-8">';
      } else {
        html += '<div class="col-md-12">';
      }
      if (canEdit(user, admin, blogs[row])) {
        html += '<textarea data-id="' + blogs[row]._id + '" class="edit-blog form-control input-field" rows="11">' + blogs[row].text + '</textarea>';
      } else {
        html += blogs[row].text;
      }
      html += '</div><div class="blog-post-details"><ul class="post-meta">';
      html += '<li><a><i class="icon-calendar"></i>' + formatDate(blogs[row].date) + '</a></li>';
      html += '<li><a><i class="icon-user"></i>' + blogs[row].author.name + '</a></li>';
      html += '</ul>';
      if (canEdit(user, admin, blogs[row])) {
        html += '<div id="change-blog-photo"><div class="spacer"></div><div class="progress-bar"></div><div class="spacer2"></div></div>';
        html += '<div class="blog-post-options">' + '<button class="delete-img-button" onclick=deleteBlog("' + blogs[row]._id + '")>Borrar</button>';
        html += '<button class="delete-img-button" onclick=editBlog("' + blogs[row]._id + '")>Guardar Cambios</button>' +'</div>';
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
    // agregar foto a esta pagina

    $('.change-blog-form > textarea').data("photoUrl", new_photo.url);
    $('.change-blog-form > textarea').data("photoId", new_photo.public_id);
    $('.progress-bar').css('display', 'none');
  };

  $scope.$on('$viewContentLoaded', function(){

    var admin = true;
    var user = null;

    $http.get('/checklogin')
      .success(function(data) {
        photo_upload_service.setupCloudinary(new_blog_upload_callback, '#new-blog-photo > .spacer');
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

    $http.get('/api/public/blogs')
      .success(function(data, status, headers, config) {
        var html = format_blog(data, admin, user);
        $('#blogs').append(html);
        var delete_blog = '<script>var deleteBlog=function(id){if(confirm("¿Usted está seguro que quiere borrar esta entrada de Blog?")){$.ajax({url:"/api/blog/"+id,type:"DELETE",success:function(e){window.location.reload();}})}};</script>';
        var change_blog = '<script>var editBlog=function(t){if(confirm("¿Usted está seguro que quiere cambiar esta entrada de Blog?")){var a=$("textarea[data-id=\'"+t+"\']").val(),o=$(".change-blog-form > textarea").data(),e={text:a, id:t};o.photoUrl&&(e.photo={url:o.photoUrl,public_id:o.photoId}),$.ajax({url:"/api/blog/",type:"PUT",data: e,success:function(t){location.reload()}})}};</script>';
        $('head').append(delete_blog);
        $('head').append(change_blog);
        if(user) {
          photo_upload_service.setupCloudinary(change_pic_upload_callback, '#change-blog-photo > .spacer', false, true);
        }

      })
      .error(function(data, status, headers, config) {
        alert('error');
      });

  });
});
