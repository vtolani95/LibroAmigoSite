app.controller('donateController', function($http) {

  this.sendMail = function() {
    var data = ({
      Name: this.contactName,
      Email: this.email,
      Message: this.note
    });

    $('#submit')
      .after('<img src="sources/assets/ajax-loader.gif" class="loader" />')
      .attr('disabled','disabled');

    $http.post('/contact/send/donate', data).
      success(function(data, status, headers, config) {
        $("input.form-button").val("Mensaje Enviado!");
        $(".loader").remove();
      }).
      error(function(data, status, headers, config) {
        alert('Lo siento- no podemos enviar su mensaje');
      })
  }
  var ALERT_TITLE = "IMPORTANTE";
  var ALERT_BUTTON_TEXT = "Estoy de acuerdo";

if(document.getElementById) {
  window.alert = function(txt) {
    createCustomAlert(txt);
  }
}

function createCustomAlert(txt) {
  d = document;

  if(d.getElementById("modalContainer")) return;

  mObj = d.getElementsByTagName("body")[0].appendChild(d.createElement("div"));
  mObj.id = "modalContainer";
  mObj.style.height = d.documentElement.scrollHeight + "px";
  
  alertObj = mObj.appendChild(d.createElement("div"));
  alertObj.id = "alertBox";
  if(d.all && !window.opera) alertObj.style.top = document.documentElement.scrollTop + "px";
  alertObj.style.left = (d.documentElement.scrollWidth - alertObj.offsetWidth)/2 + "px";
  alertObj.style.visiblity="visible";

  h1 = alertObj.appendChild(d.createElement("h1"));
  h1.appendChild(d.createTextNode(ALERT_TITLE));

  msg = alertObj.appendChild(d.createElement("p"));
  //msg.appendChild(d.createTextNode(txt));
  msg.innerHTML = txt;

  btn = alertObj.appendChild(d.createElement("a"));
  btn.id = "closeBtn";
  btn.appendChild(d.createTextNode(ALERT_BUTTON_TEXT));
  btn.href = "#";
  btn.focus();
  btn.onclick = function() { removeCustomAlert();return false; }

  alertObj.style.display = "block";
  
}

function removeCustomAlert() {
  document.getElementsByTagName("body")[0].removeChild(document.getElementById("modalContainer"));
}
function ful(){
alert('thank you');
}
});

