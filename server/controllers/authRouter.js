module.exports = function(app, passport, userAuth) {
  // route to log in
  app.post('/login', passport.authenticate('local-login'), function(req, res, next) {
    res.send(req.user);
  });

  app.get('/checklogin', function(req, res, next) {
    res.send(req.isAuthenticated() ? req.user : 401);
  });

  app.post('/changepass', userAuth, function(req, res, next) {
    if (req.user.validPassword(req.body.curr_pass)) {
      req.user.password = req.user.generateHash(req.body.new_pass);
      req.user.save();
      res.send(200);
    } else {
      res.send(500);
    }
  });
  // route to log out
  app.get('/logout', function(req, res, next){
    req.logout();
    res.send(200);
  });

  app.get('/curruser', userAuth, function(req, res, next) {
    res.send(req.user);
  })
};
