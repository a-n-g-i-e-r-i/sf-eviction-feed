var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/project-01");
var Eviction = require('./eviction');
var Notice = require('./notice');
var Resource = require('./resource');

module.exports.Eviction = Eviction;
module.exports.Notice = Notice;
module.exports.Resource = Resource;