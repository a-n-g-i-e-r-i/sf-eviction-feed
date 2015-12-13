$(document).ready(function() {
  console.log('app is on!');

// #########################
// retrieve endpoint data
// #########################

// *************
// read all evictions
// *************

$.get('/api/evictions').success(function (eviction) {
  console.log(eviction);
  eviction.forEach(function (eviction) {
    renderEviction(eviction);
  });
});

$.get('https://data.sfgov.org/resource/ugv9-ywu3.json').success(function (eviction) {
  renderEviction(eviction[0]);
  console.log(eviction[0].estoppel_id);
  // eviction.forEach( function (element, index) {
  //  renderEviction(element);
  // });
});

// *************
// get eviction by id
// *************

// *************
// create notice by eviction id
// *************


//modal fields update form to server
$('#evictions').on('click', '.add-notice', function(e) {
  var id= $(this).parents('.eviction').data('eviction-id');
  console.log('id',id);
  // $('#notice-modal').data('eviction-id', id);
  // $('#notice-modal').modal();
});


//render eviction
function renderEviction(eviction) {
  console.log('rendering eviction');

  var evictionHtml = 
  "        <!-- one eviction -->" +
  "        <div class='row eviction' data-eviction-id='" + eviction.estoppel_id + "'>" +
  "          <div class='col-md-10 col-md-offset-1'>" +
  "            <div class='panel panel-default'>" +
  "              <div class='panel-body'>" +
  "              <!-- begin eviction internal row -->" +
  "                <div class='row'>" +
  "                  <div class='col-md-9 col-xs-12'>" +
  "                    <ul class='list-group'>" +
  "                      <li class='list-group-item'>" +
  "                        <h4 class='inline-header'>Address:</h4>" +
  "                        <span class='eviction-address'>" + eviction.address + "</span>" +
  "                      </li>" +
                          'buildNoticeHtml(eviction.notice)' +
  "                    </ul>" +
  "                  </div>" +
  "                </div>" +
  "                <!-- end of eviction internal row -->" +

  "              </div>" + // end of panel-body

  "              <div class='panel-footer'>" +
  "                <button class='btn btn-warning add-notice'>Add Notice</button>" +
  "                <button class='btn btn-warning edit-notice'>Edit Notice</button>" +
  "              </div>" +

  "            </div>" +
  "          </div>" +
  "          <!-- end one eviction -->";

  $('#evictions').prepend(evictionHtml);
}

//render notice

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