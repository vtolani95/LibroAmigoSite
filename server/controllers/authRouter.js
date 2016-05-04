module.exports = function(app, passport) {
  // route to log in
  app.post('/login', passport.authenticate('local-login'), function(req, res, next) {
    res.send(req.user);
  });

  app.post('/signup', passport.authenticate('local-signup'), function(req, res, next) {

  });

  app.get('/checklogin', function(req, res, next) {
    res.send(req.isAuthenticated() ? req.user : 401);
  });
  // route to log out
  app.get('/logout', function(req, res, next){
    req.logout();
    res.send(200);
  });
};
