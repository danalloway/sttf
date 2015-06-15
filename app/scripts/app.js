(function(){
  var app = document.querySelector('#page-collection');

  // Routes
  page('/matches', matches);
  page('/rules', rules);
  page('/live', live);
  page('/roster', roster);
  page('/', function(){
    page.redirect('/rules');
  });

  page({ hashbang: true });

  function matches(){
    app.select("matches");
  }

  function rules(){
    app.select("rules");
  }

  function live(){
    app.select("live");
  }

  function roster(){
    app.select("roster");
  }

  page();
})();


// listen for when Polymer has finished parsing and is ready to roll
//window.addEventListener('WebComponentsReady', function() {

    // remove the `unresolved` attribute and fade in the app
    // this prevents any FOUC from occuring
    //document.querySelector('body').removeAttribute('unresolved');

//});
