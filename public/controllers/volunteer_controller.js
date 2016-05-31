app.controller('volunteerController', function($scope, $http) {

  var formatVolunteer = function(user, admin) {
    var html = '<div class="col-md-4"><div class="single-mission"><div class="mission-img"><a href="/privado/voluntario/' + user._id + '" title=""><img src=';
    if(user.photo) {
      html += '"' + user.photo.url + '"' + 'width="273"';
    } else {
      html += '"http://placehold.it/273x145"';
    }
    html += '" alt="" /></a></div><h3>' + user.name.first + ' ' + user.name.last + '</h3>';
    if (admin) {
      html += '<button class="form-button" ';
      if (user.role == "Admin") {
        html += 'onclick=deleteAdmin("' + user._id + '","' + user.name.first + '")>Borrar Admin</button>';
      } else {
        html += 'onclick=deleteUser("' + user._id + '","' + user.name.first + '")>Borrar</button>';
      }
    }
    if (user.role == 'Admin') {
      html += '<h2>Admin</h2>';
    } else {
      html += '<h2>Voluntario</h2>';
    }
    html += '<h2>' + user.position + '</h2>';
    html += '</div></div>';
    return html;
  }

  $scope.$on('$viewContentLoaded', function(){
    var admin = true;
    $http.get('/checklogin')
      .success(function(data) {
        if(data.role != "Admin") {
          admin = false;
          $('#new_volunteer').remove();
        }
      })
      .error(function(data) { });

    $http.get('/api/voluntarios')
      .success(function(data) {
        var user_format = '';
        for(var i = 0; i < data.length; i += 1) {
          user_format += formatVolunteer(data[i], admin);
        }
        $('#content').append(user_format);
        var jsUser = '<script>var deleteUser=function(e, first){if(confirm("¿Usted está seguro que quiere borrar la cuenta de: " + first + "?")){$.ajax({url:"/api/voluntario/"+e,type:"DELETE",success:function(e){window.location.reload();}})}};</script>';
        var jsAdmin = '<script>var deleteAdmin=function(e, first){if(confirm("Ésta cuenta pertenece a un administrador. ¿Usted está seguro que quiere borrar la cuenta de: " + first + "?")){$.ajax({url:"/api/voluntario/"+e,type:"DELETE",success:function(e){window.location.reload();}})}};</script>'
        $('head').append(jsUser);
        $('head').append(jsAdmin);

      })
      .error(function(data) {
        alert('error de servidor');
      });
  });
});
