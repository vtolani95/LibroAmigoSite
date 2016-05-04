var mongoose = require('mongoose');
var roleSchema = mongoose.Schema({
  name: String
});
module.exports = mongoose.model('Role', roleSchema);
