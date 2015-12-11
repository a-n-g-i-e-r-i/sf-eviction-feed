//server-side js

//require express in app
var express = require('express');

// generate new express, mongoose, body-parser apps
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

// serve static files from public folder
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: true }));

// #########################
// database
// #########################

// #########################
// routes
// #########################

// *************
// html endpoints
// *************

// *************
// json endpoints
// *************

// #########################
// server
// #########################

// listen on port 3000
app.listen(process.env.PORT || 3000, function () {
  console.log('Express server is running on http://localhost:3000/');
});