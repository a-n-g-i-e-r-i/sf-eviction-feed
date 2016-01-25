var mongoose = require("mongoose");
  Schema = mongoose.Schema;

//defines noticeSchema
var noticeSchema = new Schema({
  eviction_id: String,
  title: String,
  user: String,
  comment: String,
  notice_date: String,
  date: String,
});

//defines Notice by noticeSchema
var Notice = mongoose.model('Notice', noticeSchema);

//exports Notice through module
module.exports = Notice;