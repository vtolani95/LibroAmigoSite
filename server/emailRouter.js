

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
/* Send email de contacto */
emailRouter.post('/sendbasic', function(req, res) {
  var data = req.body;
  var emailInfo = {
    from: process.env.EMAIL_SMPT_USER,
    to: process.env.EMAIL_RECIPIENT,
    subject: 'Mensaje de ' + data.name,
    text: data.message + '\n Email: ' + data.email + '\n Teléfono: ' + data.telefono
  }
  transporter.sendMail(emailInfo, function(error, info){
    if(error) {
      res.status(500);
    } else {
      res.json(req.body);
    }
  });
});

emailRouter.post('/send', function(req, res) {
  var data = req.body;
  res.json(data);
});

module.exports = emailRouter;
