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

//require models
var db = require('./models/index');

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

app.get('/api/evictions', function evictionIndex (req, res) {
  db.Eviction.find({}, function(err, evictions) {
    res.json(evictions);
  });
});

app.post('/api/evictions', function addEviction (req, res) {
  var body = req.body;
  db.Eviction.remove(req.body, function(err, isThere) {
  });
  db.Eviction.create(req.body, function(err, eviction) {
    res.json(eviction);
  });
});

app.get('/api/notices', function noticeIndex (req, res) {
  db.Notice.find({}, function(err, notices) {
    res.json(notices);
    console.log(notices);
  });
});

app.post('/api/notices', function addNotice(req, res) {
  var body = req.body;
  db.Notice.create(body, function(err, notice) {
    res.json(notice);
  });
});

app.delete('/api/notices/:id', function deleteNotice(req, res) {
  console.log('requested notice id=', req.params.id);
  db.Notice.remove({_id: req.params.id}, function(err, notice) {
    if (err) {console.log('error, err'); }
  res.send("Notice Deleted");
  });
});

// #########################
// server
// #########################

// listen on port 3000
app.listen(process.env.PORT || 3000, function () {
  console.log('Express server is running on http://localhost:3000/');
});