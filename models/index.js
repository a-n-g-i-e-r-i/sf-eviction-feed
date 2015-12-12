var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/project-01");
var Eviction = require('./eviction.js');
var Notice = require('./notice.js');
var Resource = require('./resource.js');

module.exports.Eviction = Eviction;
module.exports.Notice = Notice;
module.exports.Resource = Resource;