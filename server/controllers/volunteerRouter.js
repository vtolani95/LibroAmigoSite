var User = require('../models/user');

module.exports = function(app, userAuth, passport) {
  // route to log in
  app.get('/api/voluntarios', userAuth, function(req, res, next) {
    User.find({_id: {$ne : req.user._id}}, 'name email role',
      function(err, users){
        if(err) {
          res.send(err);
        }
        res.json(users);
      });
  });

  app.post('/api/voluntario/crear', userAuth, passport.authenticate('local-signup'), function(req, res, next) {
    res.json(req.user);
  });
};
