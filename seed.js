//variable to link to models dir
var db = require("./models");

//hard coded data to push into array

var evictionList = [];
evictionList.push({
  eviction_id: 'D000000',
  address: '100 Broadway Ave',
  supervisor_district: '1',
  filed_on: '2015-10-29T00:00:00',
  neighborhood: 'Mission',
  lat_lng: [37.7932081771262,37.7932081771262]
  // notice: ''
});

var noticeList = [];
noticeList.push({
  eviction_id: 'D000000',
  title: 'Ellis Act kick out',
  user: 'riotgrrrl212',
  comment: 'Another one bites the dust',
  date: '10/10/2015',
  resource: '',
});

var sampleResource = [];
sampleResource.push({
  title: 'My First Eviction Notice',
  link: 'http://www.socketsite.com/wp-content/uploads/2009/03/1240-5th-Avenue.jpg',
  caption: 'I have to leave',
  date: '10/11/2015',
  type: 'image',
});

//populate each eviction with notices
evictionList.forEach(function(eviction){
  eviction.notice = noticeList;
});

//populate each notice with resources
noticeList.forEach(function(notice){
  notice.resource = sampleResource;
});



//this is really fucking important.
db.Eviction.remove({}, function (err, evictions) {

  db.Eviction.create(evictionList, function(err, evictions) {
    if (err) { return console.log('ERROR', err); }
    console.log('all evictions:', evictions);
    console.log('created', evictions.length, 'evictions');
    process.exit();
  });

});

// //this is really fucking important.
// db.Notice.remove({}, function (err, notices) {

//   db.Notice.create(noticeList, function(err, notices) {
//     if (err) { return console.log('ERROR', err); }
//     console.log('all notices:', notices);
//     console.log('created', notices.length, 'notices');
//     process.exit();
//   });

// });