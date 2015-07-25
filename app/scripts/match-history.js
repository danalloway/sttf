(function($){
  var firebaseConString = "https://shining-torch-9613.firebaseio.com/";

  //ToDo: Remove this when we figure out timing.
  var userData = [];
  var myFirebaseRef = new Firebase(firebaseConString);
  //End remove.

  //ToDo: Replace this piece.
  // populate player list
  myFirebaseRef.child('members').once('value', function(snapshot){
    var data = snapshot.val();
    jQuery.each(data, function(index, user){
      userData.push({
        id: index,
        first: user.firstName,
        last: user.lastName,
        nick: user.nickName
      });
    });
  });
  //End remove.

  // Enable firebase table for matches.
  $('#matches-table').loadFirebaseTable({
    connectionString: firebaseConString,
    collectionName: "match-histories",
    getDataFunction: function(data){
      var temp = [];

      jQuery.each(data, function(index, match){
          var challenger = jQuery.grep(userData, function(user, index){
            return user.id == match.challenger;
          })[0];

          var defender = jQuery.grep(userData, function(user, index){
            return user.id == match.defender;
          })[0];

          var game1 = jQuery.grep(match.games, function(game, index){
            return game.gameNumber == 1;
          })[0];

          var game2 = jQuery.grep(match.games, function(game, index){
            return game.gameNumber == 2;
          })[0];

          var game3 = jQuery.grep(match.games, function(game, index){
            return game.gameNumber == 3;
          })[0];

          temp.push({
            type:match.matchType,
            challenger: challenger.first + ' ' + challenger.nick + ' ' + challenger.last,
            defender: defender.first + ' '  + defender.nick + ' ' + defender.last,
            game1: game1.challengerScore + ' - ' + game1.defenderScore,
            game2: game2.challengerScore + ' - ' + game2.defenderScore,
            game3: game3.challengerScore + ' - ' + game3.defenderScore
          });
      });

      return temp;
    }
  });
}(jQuery));
