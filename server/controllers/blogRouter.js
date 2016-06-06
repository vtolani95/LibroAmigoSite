var Blog = require('../models/blog');

module.exports = function(app, userAuth, adminAuth, cloudinary) {

  var canChange = function(req, blog) {
    if (req.user.role == "Admin") {
      return true;
    } else {
      return req.user._id === blog.author.id;
    }
  };

  app.get('/api/public/blogs', function(req, res, next) {
    debugger;
    Blog.find({}, 'text author photo date', {sort: '-date'},
      function(err, blogs){
        if(err) {
          res.send(err);
        }
        if (req.query.mostRecent) {
          res.json(blogs[0]);
        } else {
          res.json(blogs);
        }

      })
  });

  // Crear nuevo blog post
  app.post('/api/blog', userAuth, function(req, res, next) {
    var newBlog = new Blog();
    newBlog.text = req.body.text;
    if (req.body.photo) {
      newBlog.photo = req.body.photo;
    }
    newBlog.author.name = req.user.name.first + " " + req.user.name.last;
    newBlog.author.id = req.user.id;
    newBlog.save();
    res.send(newBlog);
  });

    // Cambiar blog post
  app.put('/api/blog', userAuth, function(req, res, next) {
    Blog.findById(req.body.id, function(err, blog) {
      if(err) {
        res.send(err);
        return;
      }
      if (canChange(req, blog)) {
        blog.text = req.body.text;
        if (req.body.photo) {
          if(blog.photo) {
            cloudinary.v2.uploader.destroy(blog.photo.public_id, function(error, result) {
              console.log(result);
            });
          }
          blog.photo = req.body.photo;
        }
        blog.save();
        res.json(blog);
        return;
      }
      res.send(401);
    });
  });

  // Borrar una foto
  app.delete('/api/blog/:id', adminAuth, function(req, res, next) {
    Blog.findById(req.params.id, function(err, blog) {
      if(err) {
        res.send(err);
        return;
      }
      if (canChange(req, blog)) {
        if(blog.photo) {
          cloudinary.v2.uploader.destroy(blog.photo.public_id, function(error, result) {
            console.log(result);
          });
        }
        blog.remove();
        res.send(200);
      }
      res.send(401);
    });
  });

};
