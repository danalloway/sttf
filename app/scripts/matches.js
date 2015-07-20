(function($){
  var firebaseConString = "https://shining-torch-9613.firebaseio.com/";

  //ToDo: Remove this when we figure out timing.
  var userData = [];
  var myFirebaseRef = new Firebase(firebaseConString);
  //End remove.

  //ToDo: Replace this piece.
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
  });
  //End remove.

  // Enable firebase table for matches.
  $('#matches-table').loadFirebaseTable({
    connectionString: firebaseConString,
    collectionName: "matches",
    getDataFunction: function(data){
      var temp = [];

      jQuery.each(data, function(index, match){
          var challenger = jQuery.grep(userData, function(user, index){
            return user.id == match.challenger.oid;
          })[0];

          var defender = jQuery.grep(userData, function(user, index){
            return user.id == match.defender.oid;
          })[0];

          temp.push({
            type:match.match_type,
            challenger: challenger.first + ' ' + challenger.nick + ' ' + challenger.last,
            defender: defender.first + ' '  + defender.nick + ' ' + defender.last,
            game1: match.challenger_game1 + ' - ' + match.defender_game1,
            game2: match.challenger_game2 + ' - ' + match.defender_game2,
            game3: match.challenger_game3 + ' - ' + match.defender_game3
          });
      });

      return temp;
    }
  });
}(jQuery));
