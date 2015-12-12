var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var ResourceSchema = new Schema({
  title: String,
  link: String,
  caption: String,
  date: String,
  type: String,
});

var Resource = mongoose.model('Resource', ResourceSchema);

module.exports = Resource;