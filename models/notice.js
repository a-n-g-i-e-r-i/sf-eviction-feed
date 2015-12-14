var mongoose = require("mongoose");
  Schema = mongoose.Schema;

//requires Resource from resource.js
var Resource = require('./resource.js');
var Eviction = require('./eviction.js');

//defines noticeSchema
var noticeSchema = new Schema({
  eviction_id: String,
  title: String,
  user: String,
  comment: String,
  date: String,
  resource: [Resource.schema],
});

//defines Notice by noticeSchema
var Notice = mongoose.model('Notice', noticeSchema);

//exports Notice through module
module.exports = Notice;