var mongoose = require("mongoose");
mongoose.connect(process.env.MONGOLAB_URI || 
  process.env.MONGOHQ_URL || 
  "mongodb://localhost/evictions");

var Eviction = require('./eviction.js');
var Notice = require('./notice.js');
var Resource = require('./resource.js');

module.exports.Eviction = Eviction;
module.exports.Notice = Notice;
module.exports.Resource = Resource;