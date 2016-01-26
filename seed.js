var db = require("./models");

var evictionList = [];
evictionList.push({
  eviction_id: 'D000000',
  address: '100 Broadway Ave',
  supervisor_district: '1',
  filed_on: '2015-10-29T00:00:00',
  neighborhood: 'Mission',
  lat_lng: [37.7932081771262,37.7932081771262],
  img_url: 'http://images.fineartamerica.com/images/artworkimages/mediumlarge/1/in-the-moment-square-sunset-gina-de-gorna.jpg'
});

var noticeList = [];
noticeList.push({
  eviction_id: 'D000000',
  title: 'Ellis Act kick out',
  user: 'riotgrrrl212',
  comment: 'Another one bites the dust',
  notice_date: '10/10/2015',
  date: '10/10/2015'
});

evictionList.forEach(function(eviction){
  eviction.notice = noticeList;
});

db.Eviction.remove({}, function (err, evictions) {

  db.Eviction.create(evictionList, function(err, evictions) {
    if (err) { return console.log('ERROR', err); }
    console.log('all evictions:', evictions);
    console.log('created', evictions.length, 'evictions');
    process.exit();
  });

});

db.Notice.remove({}, function (err, evictions) {

  db.Notice.create(noticeList, function(err, notices) {
    if (err) { return console.log('ERROR', err); }
    console.log('all notices:', notices);
    console.log('created', notices.length, 'notices');
    process.exit();
  });

});