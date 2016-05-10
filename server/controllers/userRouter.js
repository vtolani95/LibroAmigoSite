module.exports = function(app, passport, userAuth) {
  // route to log in
  app.post('/login', passport.authenticate('local-login'), function(req, res, next) {
    res.send(req.user);
  });

  app.get('/checklogin', function(req, res, next) {
    res.send(req.isAuthenticated() ? req.user : 401);
  });

  // route to log out
  app.get('/logout', function(req, res, next){
    req.logout();
    res.send(200);
  });

  // Rutas para cambiar datos de cuenta
  app.post('/change/pass', userAuth, function(req, res, next) {
    if (req.user.validPassword(req.body.curr_pass)) {
      req.user.password = req.user.generateHash(req.body.new_pass);
      req.user.save();
      res.send(200);
    } else {
      res.send(500);
    }
  });

  app.post('/change/dob', userAuth, function(req, res, next) {
    req.user.dob = req.body.dob;
    req.user.save();
    res.send({dob: req.user.dob});
  });

  app.post('/change/phone', userAuth, function(req, res, next) {
    req.user.phone = req.body.phone;
    req.user.save();
    res.send({phone: req.user.phone});
  });
};
