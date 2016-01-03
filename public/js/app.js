$(document).ready(function() {
  console.log('app is on!');

// *************
// consume external api
// *************

$.get('https://data.sfgov.org/resource/ugv9-ywu3.json').success(function (eviction) {
  eviction.forEach( function(eviction) {

    var latitude = parseFloat(eviction.client_location.latitude);
    var longitude = parseFloat(eviction.client_location.longitude);
    var evictionNew = {
      eviction_id: eviction.estoppel_id,
      address: eviction.address,
      supervisor_district: eviction.supervisor_district,
      filed_on: eviction.file_date,
      neighborhood: eviction.neighborhood,
      lat_lng: [latitude, longitude]
    };

    $.post('/api/evictions', evictionNew)
      .success(function(evictionNew) {
    });
  });
});

// *************
// read all evictions
// *************

function evictionHandlebarsTemplate() {
  var source = $('#evictions-template').html();
  var template = Handlebars.compile(source);

  $.get('/api/evictions').success(function (eviction) {

    var evictionResult = eviction;
    var evictionHtml = template({ eviction: evictionResult });

    $('#evictions').append(evictionHtml);
  });
}

evictionHandlebarsTemplate();

// *************
// create notice by eviction id
// *************

$('#evictions').on('click', '.link', function(e) {
  e.preventDefault();

  var evictionsToHide = $(this).closest('.eviction');
  var id= $(this).parents().data('eviction-id');

  evictionsToHide.next('.eviction-details').show();

  $('html, body').animate({
        scrollTop: evictionsToHide.offset().top
    }, 500);
});

$('#evictions').on('click', '.add-notice', function(e) {
  e.preventDefault();

  var id= $(this).data('eviction-id');

  $('#add-notice-modal').data('eviction-id', id);
  $('#add-notice-modal').modal();
  $('#save-notice').on('click', handleNewNoticeSubmit);
});

$(document).ready(function() {
    $("#datepick").datepicker();
});

function getDate() {
  var result = new Date();
  return result.toString("yyyy-MM-dd hh:mm:ss tt");
}

function handleNewNoticeSubmit(e) {
  e.preventDefault();

  var evictionId = $('#add-notice-modal').data('eviction-id');
  var title = $('#notice-title').val();
  var username = $('#username').val();
  var comment = $('#comment').val();
  var date = $('#datepick').val();
  var image = $('#image').val();
  var pdf = $('#pdf').val();
  var formData = {
    eviction_id: evictionId,
    notice_date: getDate(),
    title: title,
    user: username,
    comment: comment,
    date: date,
    resource: [
      {image: image},
      {pdf: pdf}
    ]
  };

  $.post('/api/notices', formData)
    .success(function(notice) {
    console.log('notice after POST', notice);
    
    var source = $('#notices-template').html();
    var template = Handlebars.compile(source);
    var id = notice.eviction_id;
    var noticeHtml = template(notice);

    $('.eviction-details[data-eviction-id=' + id + ']').after(noticeHtml);
  });

  $('form')[0].reset();
  $('#add-notice-modal').modal('hide');
}

// *************
// delete notice
// *************

$('#evictions').on('click', '.delete-notice', function(e) {
  var id= $(this).data('id');
  console.log('id',id);
  $.ajax({
    url: '/api/notices/' + id,
    method: 'DELETE',
    success: function destroy(notice) {
      console.log('notice after DELETE', notice);
      $('#notices').data('id',id).remove();
    }
  });
});

// *************
// update notice
// *************

$('#evictions').on('click', '.edit-notice', function(e) {
  e.preventDefault();

  var evictionId = $(this).data('eviction-id');
  var id = $(this).data('id');

  $('#add-notice-modal').data('eviction-id', evictionId);
   $('#add-notice-modal').data('id', id);
  $('#add-notice-modal').modal();
  $('#save-notice').on('click', handleUpdateNoticeSubmit);
});


function handleUpdateNoticeSubmit(e) {
  e.preventDefault();

  var noticeId = $('#add-notice-modal').data('id');
  var evictionId = $('#add-notice-modal').data('eviction-id');
  var title = $('#notice-title').val();
  var username = $('#username').val();
  var comment = $('#comment').val();
  var date = $('#datepick').val();
  var image = $('#image').val();
  var pdf = $('#pdf').val();
  var formData = {
    eviction_id: evictionId,
    notice_date: getDate(),
    title: title,
    user: username,
    comment: comment,
    date: date,
    resource: [
      {image: image},
      {pdf: pdf}
    ]
  };

  console.log(formData);

  $.ajax({
    url: '/api/notices/' + noticeId,
    method: 'PUT',
    data: formData,
    success: function update(notice) {
      console.log('notice after PUT', notice);
      $('#notices').data('id',noticeId).remove();

      var source = $('#notices-template').html();
      var template = Handlebars.compile(source);
      var noticeHtml = template(notice);
      $('.eviction-details[data-eviction-id=' + evictionId + ']').after(noticeHtml);

    }
  });

  $('form')[0].reset();
  $('#add-notice-modal').modal('hide');
}

// *************
// render notices by eviction id
// *************

function noticeHandlebarsTemplate() {
  var source = $('#notices-template').html();
  var template = Handlebars.compile(source);

  $.get('/api/notices').success(function (notices) {

    notices.forEach(function sortNoticeByEvictionId(notice) {
      var id = notice.eviction_id;
      var noticeHtml = template(notice);

      $('.eviction-details[data-eviction-id=' + id + ']').after(noticeHtml);
    });
  });
}

noticeHandlebarsTemplate();

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