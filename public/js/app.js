$(document).ready(function() {
  console.log('app is on!');

  var $evictions = $("#evictions");

// #########################
// retrieve endpoint data
// #########################

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
    $evictions.append(evictionHtml);
  });
}

evictionHandlebarsTemplate();

// *************
// create notice by eviction id
// *************

// modal fields update form to server
$evictions.on('click', '.link', function(e) {
  e.preventDefault();

  var evictionsToHide = $(this).closest('.eviction');

  var id= $(this).parents().data('eviction-id');
  console.log('id',id);

  evictionsToHide.next('.eviction-details').show();

  $('html, body').animate({
        scrollTop: evictionsToHide.offset().top
    }, 500);
});

// handles the modal fields and POSTing the form to the server
//modal fields update form to server
$evictions.on('click', '.add-notice', function(e) {
  e.preventDefault();
  var id= $(this).data('eviction-id');
  console.log('id',id);
  $('#add-notice-modal').data('eviction-id', id);
  $('#add-notice-modal').modal();

  $('#save-notice').on('click', handleNewNoticeSubmit);
});

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

  $.post('/api/notices', formData)
    .success(function(notice) {
    console.log('notice after POST', notice);

    //render the server's response
    var source = $('#notices-template').html();
    var template = Handlebars.compile(source);
    var id = notice.eviction_id;
    var noticeHtml = template(notice);
    console.log(noticeHtml);
    $('.eviction-details[data-eviction-id=' + id + ']').after(noticeHtml);
  });

  $('form')[0].reset();
  $('#add-notice-modal').modal('hide');
}

// *************
// delete notice
// *************

$evictions.on('click', '.delete-notice', function(e) {
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

$evictions.on('click', '.edit-notice', function(e) {
  e.preventDefault();
  var evictionId = $(this).data('eviction-id');
  var id = $(this).data('id');
  console.log('id',id);
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

//compile notice handlebars template
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
