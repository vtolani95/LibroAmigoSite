var mongoose = require('mongoose');
var activitySchema = mongoose.Schema({
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
  photos: [],
  date: {
    type: Date,
    default: Date.now
  }
});
module.exports = mongoose.model('Activity', activitySchema);
