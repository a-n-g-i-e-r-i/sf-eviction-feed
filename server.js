var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var request = require('request');

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// #########################
// database
// #########################

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
  db.Eviction.remove(body, function(err, isThere) {
    if (err) {
      console.log(err.message);
      return res.status(404).json({errors: [err.message]});
    }
  });

  db.Eviction.create(body, function(err, eviction) {
    if (err) {
      console.log(err.message);
      return res.status(404).json({errors: [err.message]});
    }
    res.json(eviction);
  });

});

function initCoords(eviction) {
  var latitude;
  var longitude;

  if (eviction.client_location) {
    latitude = parseFloat(eviction.client_location.latitude);
    longitude = parseFloat(eviction.client_location.longitude);
  }
  return [latitude, longitude];
}

function getAndPostEvictions() {

  var data = [];

  request.get('https://data.sfgov.org/resource/ugv9-ywu3.json',
  function (err, response, body) {
    if (err) {
      console.log(err.message);
      return res.status(404).json({errors: [err.message]});
    }
    if (!err && response.statusCode == 200) {
      body = JSON.parse(body);
      body.forEach(function(eviction) {

        var lat_lng = initCoords(eviction);

        var img_url = 'https://maps.googleapis.com/maps/api/streetview?size=300x300&location=' +
        lat_lng[0] + ',' +
        lat_lng[1] +
        '&fov=75&pitch=25&' +
        'key=AIzaSyBlO4qle8MH0WC4I1cRWRQMcQM7Unmkhns';

        var evictionNew = {
          eviction_id: eviction.estoppel_id,
          address: eviction.address,
          supervisor_district: eviction.supervisor_district,
          filed_on: eviction.file_date,
          neighborhood: eviction.neighborhood,
          lat_lng: lat_lng,
          img_url: img_url
        };

        data.push(evictionNew);

      });

      db.Eviction.save(data,function(){
        err && console.log(err)
      })

      // data.forEach(function (eviction) {
      //   request.post('/api/evictions').form(eviction);
      // });
    }
  });
}

// getAndPostEvictions();

app.get('/api/evictions', function evictionIndex (req, res) {
  db.Eviction.find({}, function(err, evictions) {
    if (err) {
      console.log(err.message);
      return res.status(404).json({errors: [err.message]});
    }
    var limit = parseInt(req.query.limit) || 10;
    db.Eviction.find({}).limit(limit).exec(function(err, evictions) {
    res.json(evictions);
    });
  });
});

app.get('/api/notices', function noticeIndex (req, res) {
  db.Notice.find({}, function(err, notices) {
    if (err) {
      console.log(err.message);
      return res.status(404).json({errors: [err.message]});
    }
    res.json(notices);
  });
});

app.post('/api/notices', function addNotice(req, res) {
  db.Notice.create(req.body, function(err, notice) {
    if (err) {
      console.log(err.message);
      return res.status(404).json({errors: [err.message]});
    }
    res.json(notice);
    console.log(notice, 'post notice');
  });
});

app.delete('/api/notices/:id', function deleteNotice(req, res) {
  console.log('requested notice id=', req.params.id);
  db.Notice.remove({_id: req.params.id}, function(err, notice) {
    if (err) {
      console.log(err.message);
      return res.status(404).json({errors: [err.message]});
    }
    res.json(notice);
    console.log('deleted');
  });
});

app.put('/api/notices/:id', function updateNotice(req, res) {
  db.Notice.update({_id: req.params.id},
    {
      $set: {
        comment: req.body.comment,
        date: req.body.date
      }
    },
   function (err, notice) {
    if (err) {
      console.log(err.message);
      return res.status(404).json({errors: [err.message]});
    }
    console.log("Notice Updated",notice);
  });

  db.Notice.findOne({_id: req.params.id}, function(err, notice) {
    res.json(notice);
  });

});

// #########################
// server
// #########################

app.listen(process.env.PORT || 3000, function () {
});
