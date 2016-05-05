angular.module('AdminCtrl', []).controller('adminController', function($scope, $http) {

  var formatVolunteer = function(user) {
    var html = '<div class="col-md-4"><div class="single-mission"><div class="mission-img"><a title=""><img src='
    if(user.photo_url) {
      html += '"' + user.photo_url + '"' + 'width="273"';
    } else {
      html += '"http://placehold.it/273x145"';
    }
    html += '" alt="" /></a></div><h3>' + user.name.first + ' ' + user.name.last + '</h3><button ng-click=deleteUser("' + user._id + '")>Borrar</button></div></div>';
    return html;
  }

  $scope.deleteUser = function(id) {
    alert('test');
    debugger;
  }

  $scope.$on('$viewContentLoaded', function(){
    $http.get('/api/voluntarios')
      .success(function(data) {
        var user_format = '';
        for(var i = 0; i < data.length; i += 1) {
          user_format += formatVolunteer(data[i]);
        }
        $('#content').append(user_format);

      })
      .error(function(data) {
        alert('error de servidor');
      });
  });
});
