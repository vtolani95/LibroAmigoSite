angular.module('AdminCtrl', []).controller('adminController', function($scope, $http) {

  var formatVolunteer = function(user) {
    var html = '<div class="col-md-4"><div class="single-mission"><div class="mission-img"><a href="#" title=""><img src="http://placehold.it/273x145" alt="" /></a></div><h3><a href="#" title="">';
    html += user.name.first + ' ' + user.name.last + '</a></h3></div></div>';
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
      })
      .error(function(data) {
        alert('error de servidor');
      });
  });
});
