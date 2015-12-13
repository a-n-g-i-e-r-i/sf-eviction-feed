var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var resourceSchema = new Schema({
  title: String,
  link: String,
  caption: String,
  date: String,
  type: String,
});

var Resource = mongoose.model("Resource", resourceSchema);

module.exports = Resource;