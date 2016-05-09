angular.module('AdminCtrl', []).controller('adminController', function($scope, $http) {

  var formatVolunteer = function(user) {
    var html = '<div class="col-md-4"><div class="single-mission"><div class="mission-img"><a title=""><img src='
    if(user.photo) {
      html += '"' + user.photo.url + '"' + 'width="273"';
    } else {
      html += '"http://placehold.it/273x145"';
    }
    html += '" alt="" /></a></div><h3>' + user.name.first + ' ' + user.name.last + '</h3><button onclick=deleteUser("' + user._id + '","' + user.name.first + '")>Borrar</button></div></div>';
    return html;
  }

  $scope.$on('$viewContentLoaded', function(){
    $http.get('/api/voluntarios')
      .success(function(data) {
        var user_format = '';
        for(var i = 0; i < data.length; i += 1) {
          user_format += formatVolunteer(data[i]);
        }
        $('#content').append(user_format);
        var js = '<script>var deleteUser=function(e, first){if(confirm("¿Usted está seguro que quiere borrar la cuenta de: " + first + "?")){$.ajax({url:"/api/voluntario/"+e,type:"DELETE",success:function(e){window.location.reload();}})}};</script>';
        $('head').append(js);

      })
      .error(function(data) {
        alert('error de servidor');
      });
  });
});
