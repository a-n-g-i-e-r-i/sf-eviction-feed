var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var notice = require('./notice');

var EvictionSchema = new Schema ({
  address: String,
  // notice: [NoticeSchema]
});

var Eviction = mongoose.model('Eviction', EvictionSchema);

module.exports = Eviction;