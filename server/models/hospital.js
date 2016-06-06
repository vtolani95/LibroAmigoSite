var mongoose = require('mongoose');
var hospitalSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  photo: {
    url: String,
    public_id: String
  }
});
module.exports = mongoose.model('Hospital', hospitalSchema);
