var mongoose = require('mongoose');
var blogSchema = mongoose.Schema({
  text: {
    type: String,
    required: true
  },
  author: {
    name: {
      type: String,
      required: true
    },
    id: {
      type: String,
      required: true
    }
  },
  photo: {
    url: String,
    public_id: String
  },
  date: {
    type: Date,
    default: Date.now
  }
});
module.exports = mongoose.model('Blog', blogSchema);
