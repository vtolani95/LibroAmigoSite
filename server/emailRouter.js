

var express = require('express');
var emailRouter = express.Router();
var nodemailer = require('nodemailer');
var stmpConfig = {
    host: process.env.EMAIL_SMPT_HOST,
    port: 465,
    auth: {
        user: process.env.EMAIL_SMPT_USER,
        pass: process.env.EMAIL_PASS
    }
};
var transporter = nodemailer.createTransport(stmpConfig);

var formatContactEmail = function(data) {
  var html = '<div><h1 style=\'padding:15px;text-align:center;font-family:Helvetica Neue,Helvetica,Arial,sans-serif;font-size:30px;font-weight:600;color:#F5A212;line-height:24px\'>Nuevo Voluntario</h1>';
  html += '<table align=\'center\' bgcolor=\'#FFFFFF\' border=\'0\' cellpadding=\'0\' cellspacing=\'0\' width=\'90%\' style=\'border-collapse: collapse\'><tbody>';
  var commonStyle = " style=\'border-bottom: dotted #B5B5B4 1px;padding:15px;font-family:Helvetica Neue,Helvetica,Arial,sans-serif;font-size:16px;font-weight:400;line-height:24px\'";
  for (var option in data) {
    html += '<tr><td bgcolor=\'#F2F2F2\'' + commonStyle + '>';
    html += option + '</td>';
    html += '<td bgcolor=\'#FBFBFA\'' + commonStyle + '>' + data[option] + '</td></tr>';
  }
  html += '</tbody></table></div>';
  return html;
}

/* Send email de contacto */
emailRouter.post('/send/basic', function(req, res) {
  var data = req.body;
  var emailInfo = {
    from: process.env.EMAIL_SMPT_USER,
    to: process.env.EMAIL_RECIPIENT,
    subject: 'Mensaje de ' + data.Name,
    text: data.Message + '\n\n Email: ' + data.Email + '\n Teléfono: ' + data.Telefono
  }
  transporter.sendMail(emailInfo, function(error, info){
    if(error) {
      res.status(500);
    } else {
      console.log("Message Sent- " + info.response);
      res.json(req.body);
    }
  });
});

emailRouter.post('/send', function(req, res) {
  var data = req.body;
  var htmlTable = formatContactEmail(data);
  var emailInfo = {
    from: process.env.EMAIL_SMPT_USER,
    to: process.env.EMAIL_RECIPIENT,
    subject: 'Nuevo Voluntario- ' + data.Name,
    html: htmlTable
  }
  transporter.sendMail(emailInfo, function(error, info){
    if(error) {
      res.status(500);
    } else {
      console.log("New Volunteer Message Sent- " + info.response);
      res.json(req.body);
    }
  });
});

module.exports = emailRouter;
