var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var resource = require('./resource');

//docusign?
var NoticeSchema = new Schema({
  title: String,
  user: String,
  comment: String,
  date: String,
  resource: [ResourceSchema]
});

var Notice = mongoose.model('Notice', NoticeSchema);

module.exports = Notice;