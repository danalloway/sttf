$(document).ready(function(){
  var app = $('#page-collection');
  var navbar = $('#navigation');

  // Setup our route collection.
  page('/matches', matches);
  page('/rules', rules);
  page('/live', live);
  page('/roster', roster);
  page('/join', join);

  // Forward default requests to /rules
  page('/', function(){
    page.redirect('/rules');
  });

  // Enable hashbang mode.
  //page({ hashbang: true });

  // Define what happens on each route.
  function matches(){
    loadViewToElement('#matches-page', 'matches.html');
    app.get(0).select("matches");
    navbar.get(0).select("matches");
  }

  function rules(){
    app.get(0).select("rules");
    navbar.get(0).select("rules");
  }

  function live(){
    app.get(0).select("live");
    navbar.get(0).select("live");
  }

  function roster(){
    loadViewToElement('#roster-page', 'roster.html');

    app.get(0).select("roster");
    navbar.get(0).select("roster");
  }

  function join(){
    loadViewToElement('#join-page', 'registration.html');

    app.get(0).select('join');
    navbar.get(0).select("join");
  }

  // Turn on request handling.
  page();
});

function loadViewToElement(selector, viewName){
  if ($(selector).children().length < 1){
    console.log('Loading ' + viewName);
    $(selector).load('/views/' + viewName);
  }
}
