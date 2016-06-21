app.controller('publicVolunteerController', function($scope, $http) {

  var formatVolunteer = function(user) {
    var html = '<div class="col-md-4"><div class="single-mission"><div class="mission-img"><a title=""><img src=';
    if(user.photo) {
      html += '"' + user.photo.url + '"' + 'width="273"';
    } else {
      html += '"/app/images/libro_logo.png"';
    }
    html += '" alt="" /></a></div><h3>' + user.name.first + ' ' + user.name.last + '</h3>';
    html += '<h2>' + user.position + '</h2>';
    html += '</div></div>';
    return html;
  }

  $scope.$on('$viewContentLoaded', function(){

    $http.get('/api/public/voluntarios')
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
