var mongoose = require("mongoose");
  Schema = mongoose.Schema;

//defines noticeSchema
var noticeSchema = new Schema({
  eviction_id: { type: String, default: ""},
  title: { type: String, default: ""},
  user: { type: String, default: ""},
  comment: { type: String, default: ""},
  notice_date: { type: String, default: ""},
  date: { type: String, default: ""}
});

//defines Notice by noticeSchema
var Notice = mongoose.model('Notice', noticeSchema);

//exports Notice through module
module.exports = Notice;