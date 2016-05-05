var User = require('../models/user');

module.exports = function(app, userAuth, passport) {

  app.get('/api/voluntarios', userAuth, function(req, res, next) {
    User.find({_id: {$ne : req.user._id}}, 'name email role photo_url',
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

  app.put('/api/voluntario/foto/cambiar', userAuth, function(req, res, next) {
    req.user.photo_url = req.body.url;
    req.user.save();
    res.send(req.body.url);
  });

  app.delete('/api/voluntario/:id', userAuth, function(req, res, next) {
    debugger;
  })
};
