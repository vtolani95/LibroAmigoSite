var mongoose = require('mongoose');
var photoSchema = mongoose.Schema({
  url: {
    type: String,
    required: true
  },
  public_id: {
    type: String,
    required: true
  }
});
module.exports = mongoose.model('Photo', photoSchema);
