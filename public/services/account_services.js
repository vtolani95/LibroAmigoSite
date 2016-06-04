app.service('account_services', function($http) {
  this.bindButtons = function() {
    $(".change-pass").click(function(){
        $(".change-pass > i").toggleClass("icon-angle-down icon-angle-up");
        $(".change-pass-form").toggle(50);
      });

    $(".change-photo").click(function(){
        $(".change-photo > i").toggleClass("icon-angle-down icon-angle-up");
        $(".change-photo-form").slideToggle(50);
      });

    $(".change-dob").click(function(){
        $(".change-dob > i").toggleClass("icon-angle-down icon-angle-up");
        $(".change-dob-form").slideToggle(50);
      });

    $(".change-phone").click(function(){
        $(".change-phone > i").toggleClass("icon-angle-down icon-angle-up");
        $(".change-phone-form").slideToggle(50);
      });
  };

  this.formatDate = function(date) {
    return date.substring(0, date.indexOf("T"));
  };

  // partes de usuario compartidos a traves de paginas publicas y privadas (nombre, posicion, imagen)
  this.populateUser = function(data) {
    var name = data.name.first + ' ' + data.name.last;
    $('#user').append(name);
    $('#user_email').append(data.email);
    $('#position').text(data.role + "- " + data.position);

    if (data.photo) {
       $('#user_img').attr('src', data.photo.url);
    }
  }
});
