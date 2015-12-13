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

//require models
var db = require('./models');

// #########################
// database
// #########################

// #########################
// routes
// #########################

// *************
// html endpoints
// *************

app.get('/', function homepage (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// *************
// json endpoints
// *************

app.get('/api', function apiIndex (req, res) {
  res.json({
    message: "Notice Eviction API index",
    documentation_url: "https://github.com/isangieri/project-01/api.md",
    base_url: "http://localhost:3000/",
    endpoints: [
      {method: 'GET', path: '/api', description: 'Available endpoints'}
    ]
  });
});

//temporary hardcoded data
var evictionList = [];
evictionList.push({
  address: '100 Broadway Ave',
});
evictionList.push({
  address: '101 Broadway Ave',
});
evictionList.push({
  address: '102 Broadway Ave',
});
evictionList.push({
  address: '103 Bpaweifjaoifwjroadway Ave',
});

app.get('/api/evictions', function evictionIndex (req, res) {
  db.Eviction.find({}, function(err, evictions) {
    res.json(evictions);
  });
});

//endpoint for data.gov eviction endpoint
app.get('https://data.sfgov.org/resource/ugv9-ywu3.json', function evictionIndex (req, res) {
  res.send(data);
});

// #########################
// server
// #########################

// listen on port 3000
app.listen(process.env.PORT || 3000, function () {
  console.log('Express server is running on http://localhost:3000/');
});