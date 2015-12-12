//variable to link to models dir
var db = require("./models");

//hard coded data to push into array

var evictionList = [];
evictionList.push({
  address: '100 Broadway Ave',
});

var sampleNotice = [];
sampleNotice.push({
  title: 'Ellis Act kick out',
  user: 'riotgrrrl212',
  comment: 'Another one bites the dust',
  date: '10/10/2015'
});


var sampleResource = [];
sampleResource.push({
  title: 'My First Eviction Notice',
  link: 'http://www.socketsite.com/wp-content/uploads/2009/03/1240-5th-Avenue.jpg',
  caption: 'I have to leave',
  date: '10/11/2015',
  type: 'image',
});

//populate eviction list with notices
evictionList.forEach(function(eviction){
  eviction.notice = sampleNotice;
});

//populate notice list with resources
noticeList.forEach(function(notice){
  notice.resource = sampleResource;
});