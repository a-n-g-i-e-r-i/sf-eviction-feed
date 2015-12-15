$(document).ready(function() {
  console.log('app is on!');

// #########################
// retrieve endpoint data
// #########################

// *************
// consume external api
// *************

$.get('https://data.sfgov.org/resource/ugv9-ywu3.json').success(function (eviction) {
  eviction.forEach( function(eviction) {
    var evictionNew = {
      eviction_id: eviction.estoppel_id,
      address: eviction.address,
      supervisor_district: eviction.supervisor_district,
      filed_on: eviction.file_date,
      neighborhood: eviction.neighborhood,
      // notice: ''
    };

    $.post('/api/evictions', evictionNew)
      .success(function(evictionNew) {
    });

  });
});

// *************
// read all evictions
// *************

// compile and render eviction handlebars template
function evictionHandlebarsTemplate() {
  var source = $('#evictions-template').html();
  var template = Handlebars.compile(source);

  $.get('/api/evictions').success(function (eviction) {
    // eviction results are in an array called `items`
    // which is nested in the `eviction` object
    var evictionResult = eviction;

    // pass in data to render in the template
    var evictionHtml = template({ eviction: evictionResult });

    // append html to the view
    $('#evictions').append(evictionHtml);
  });
}

evictionHandlebarsTemplate();

// *************
// get eviction by id
// *************

// *************
// create notice by eviction id
// *************

// modal fields update form to server
$('#evictions').on('click', '.link', function(e) {
  e.preventDefault();
  var evictionsToHide = $(this).closest('.eviction');
  // console.log(evictionsToHide);
  var id= $(this).parents().data('eviction-id');
  console.log('id',id);

  evictionsToHide.each(function(){
    $(this).siblings().not('.notice').toggle();
  });

  evictionsToHide.next('.notice').toggle();

  $('html, body').animate({
        scrollTop: $('.eviction-feed').offset().top
    }, 500);
});

// handles the modal fields and POSTing the form to the server
//modal fields update form to server
$('#evictions').on('click', '.add-notice', function(e) {
  e.preventDefault();
  var id= $('.add-notice').data('eviction-id');
  console.log('id',id);
  $('#add-notice-modal').data('eviction-id', id);
  $('#add-notice-modal').modal();
});

$('#save-notice').on('click', handleNewNoticeSubmit);

function handleNewNoticeSubmit(e) {
  e.preventDefault();
  // var formData = $('form').serialize();

  var evictionId = $('#add-notice-modal').data('eviction-id');
  var title = $('#notice-title').val();
  var username = $('#username').val();
  var comment = $('#comment').val();
  var date = $('#date').val();
  var image = $('#image').val();
  var pdf = $('#pdf').val();

  var formData = {
    eviction_id: evictionId,
    title: title,
    user: username,
    comment: comment,
    date: date,
    resource: [
      {image: image},
      {pdf: pdf}
    ]
  };

  // var formData = $('#form').clone()
  //   .append('<input name="eviction_id" value="evictionId" />')
  //   .serialize();

  // console.log(formData);

  $.post('/api/notices', formData)
    .success(function(notice) {
    console.log('notice after POST', notice);
    //render the server's response
  });

  $('form')[0].reset();
  $('#add-notice-modal').modal('hide');
}

// *************
// render notices by eviction id
// *************

//compile notice handlebars template
function noticeHandlebarsTemplate() {
  var source = $('#notices-template').html();
  var template = Handlebars.compile(source);
  console.log("hi");

  $.get('/api/notices').success(function (notice) {
    // eviction results are in an array called `items`
    // which is nested in the `eviction` object
    var noticeResult = notice;

    // pass in data to render in the template
    var noticeHtml = template({ notice: noticeResult });

    // append html to the view
    $('#notices').append(noticeHtml);
  });
}

noticeHandlebarsTemplate();

//render resource

// #########################
// SPA Navigation
// #########################

$(".nav-tenants-rights").click(function() {
    $('html, body').animate({
        scrollTop: $(".tenants-rights").offset().top
    }, 500);
});

$(".nav-eviction-feed").click(function() {
    $('html, body').animate({
        scrollTop: $(".eviction-feed").offset().top
    }, 500);
});

$(".nav-view-map").click(function() {
    $('html, body').animate({
        scrollTop: $(".view-map").offset().top
    }, 500);
});

});