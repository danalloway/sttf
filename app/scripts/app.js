var matchesTableRendered = false;
(function(){
  var app = document.querySelector('#page-collection');
  var matchesTable = document.querySelector('#matches-table');
  var myFirebaseRef = new Firebase("https://shining-torch-9613.firebaseio.com/");
  var userData = [];
  var matchData = [];

  // populate player list
  myFirebaseRef.child('players').once('value', function(snapshot){
    var data = snapshot.val();
    jQuery.each(data, function(index, user){
      userData.push({
        id: user._id.oid,
        first: user.firstName,
        last: user.lastName,
        nick: user.nickname
      });
    });

    console.log(userData);
    displayMatches(userData, matchData, matchesTable);
  });

  // Some Firebase Binding
  myFirebaseRef.child('matches').once('value', function(snapshot){
    var data = snapshot.val();
    jQuery.each(data, function(index, match){
      matchData.push({
          type: match.match_type,
          game1: match.challenger_game1 + ' - ' + match.defender_game1,
          game2: match.challenger_game2 + ' - ' + match.defender_game2,
          game3: match.challenger_game3 + ' - ' + match.defender_game3,
          challengerId: match.challenger.oid,
          defenderId: match.defender.oid
        });
    });

    console.log(matchData);
    displayMatches(userData, matchData, matchesTable);
  });

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

// Renders the match table if it hasn't been rendered yet.
function displayMatches(userData, matchData, matchesTable){
  if(matchData == null || matchData.length <= 0 || userData == null || userData.length <= 0 || matchesTable == null || matchesTableRendered == true)
  {
    return;
  }

  var tableData = [];

  jQuery.each(matchData, function(index, match){
    var challenger = jQuery.grep(userData, function(user, index){
      return user.id == match.challengerId;
    })[0];

    var defender = jQuery.grep(userData, function(user, index){
      return user.id == match.defenderId;
    })[0];

    tableData.push({
      type:match.type,
      challenger: challenger.first + ' ' + challenger.nick + ' ' + challenger.last,
      defender: defender.first + ' '  + defender.nick + ' ' + defender.last,
      game1: match.game1,
      game2: match.game2,
      game3: match.game3
    });
  });

  console.log(tableData);

  matchesTable.data = tableData;
  matchesTableRendered = true;
}


// listen for when Polymer has finished parsing and is ready to roll
//window.addEventListener('WebComponentsReady', function() {

    // remove the `unresolved` attribute and fade in the app
    // this prevents any FOUC from occuring
    //document.querySelector('body').removeAttribute('unresolved');

//});
