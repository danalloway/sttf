(function($){
  var firebaseConString = "https://shining-torch-9613.firebaseio.com/";
  var myFirebaseRef = new Firebase(firebaseConString);
  
  $('#players-table').loadFirebaseTable({
    connectionString: firebaseConString,
    collectionName: "players",
    getDataFunction: function(data){
      var temp = [];

      jQuery.each(data, function(index, player){
        temp.push({
          first_name: player.firstName,
          nick_name: player.nickname,
          last_name: player.lastName
        });
      });

      return temp;
    }
  });
}(jQuery));
