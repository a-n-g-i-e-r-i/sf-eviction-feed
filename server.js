//server-side js

//require express in app
var express = require('express');
var request = require("request"); // https://github.com/request/request
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

app.post('/api/evictions', function addEviction (req, res) {
  var body = req.body;
  db.Eviction.remove(req.body, function(err, isThere) {
  });

  db.Eviction.create(req.body, function(err, eviction) {
    res.json(eviction);
  });
});

app.get('/api/evictions', function evictionIndex (req, res) {
  var limit = parseInt(req.query.limit) || 10;
  db.Eviction.find({}).limit(limit).exec(function(err, evictions) {
    res.json(evictions);
  });
});

app.get('/api/notices', function noticeIndex (req, res) {
  db.Notice.find({}, function(err, notices) {
    res.json(notices);
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
  res.json(notice);
  console.log('deleted');
  });
});

app.put('/api/notices/:id', function updateNotice(req, res) {
  console.log(req.body);
  db.Notice.update({_id: req.params.id}, req.body, function(err, notice) {
    if (err) {console.log('error, err'); }
    console.log("Notice Updated",notice);
  });
  db.Notice.findOne({_id: req.params.id}, function(err, notice) {
    res.json(notice);
  });
});



// #########################
// seed task
// #########################

app.get("/api/tasks/fetch_and_save_evictions", function(req, res){
  // TODO: protect this route!

  // https://github.com/request/request
  request.get('https://data.sfgov.org/resource/ugv9-ywu3.json', function(err, response, body){
    var evictions = JSON.parse(body);
    console.log(evictions[0])
    evictions.map( function(eviction, i) {
      var client_location = eviction.client_location || {};
      var latitude = parseFloat(client_location.latitude);
      var longitude = parseFloat(client_location.longitude);
      eviction.eviction_id = eviction.estoppel_id
      // eviction.address = eviction.address
      // eviction.supervisor_district = eviction.supervisor_district
      eviction.filed_on = eviction.file_date
      // eviction.neighborhood = eviction.neighborhood
      eviction.lat_lng = [latitude, longitude]
      return eviction;
    });

    db.Eviction.create(evictions, function(err, new_evictions) {
      res.json({ evictions_created: new_evictions.length, evictions: new_evictions });
    });

  })
})

// #########################
// server
// #########################

// listen on port 3000
app.listen(process.env.PORT || 3000, function () {
  console.log('Express server is running on http://localhost:3000/');
});