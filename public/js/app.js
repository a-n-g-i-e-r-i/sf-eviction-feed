$(document).ready(function() {
  console.log('app is on!');

// #########################
// retrieve endpoint data
// #########################

// *************
// read all evictions
// *************
var evictionList = [];
evictionList.push({
  address: '100 Broadway Ave',
});
evictionList.push({
  address: '101 Broadway Ave',
});
evictionList.push({
  address: '102 Broadway Ave',
});
evictionList.push({
  address: '103 Broadway Ave',
});

evictionList.forEach( function (element, index) {
  renderEviction(element);
});

// *************
// get eviction by id
// *************

// *************
// create notice by eviction id
// *************


// modal fields update form to server 


//render eviction
function renderEviction(eviction) {
  console.log('rendering eviction');

  var evictionHtml = 
  "        <!-- one eviction -->" +
  "        <div class='row album' data-eviction-id='" + 'EVICTION ID' + "'>" +
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