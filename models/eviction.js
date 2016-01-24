var mongoose = require("mongoose");
  Schema = mongoose.Schema;

//requires Notice from notice.js
var Notice = require('./notice.js');

//defines evictionSchema
var evictionSchema = new Schema ({
  eviction_id: String,
  address: String,
  supervisor_district: Number,
  filed_on: String,
  neighborhood: String,
  lat_lng: []
});

//defines Eviction by evictionSchema
var Eviction = mongoose.model('Eviction', evictionSchema);

//exports Eviction through module
module.exports = Eviction;