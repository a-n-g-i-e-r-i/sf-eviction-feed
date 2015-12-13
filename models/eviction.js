var mongoose = require("mongoose");
  Schema = mongoose.Schema;

//requires Notice from notice.js
var Notice = require('./notice.js');

//defines evictionSchema
var evictionSchema = new Schema ({
  address: String,
  notice: [Notice.schema],
});

//defines Eviction by evictionSchema
var Eviction = mongoose.model('Eviction', evictionSchema);

//exports Eviction through module
module.exports = Eviction;