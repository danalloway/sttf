(function($){
  var firebaseConString = "https://shining-torch-9613.firebaseio.com/";
  var myFirebaseRef = new Firebase(firebaseConString);

  $('#players-table').loadFirebaseTable({
    connectionString: firebaseConString,
    collectionName: "members",
    getDataFunction: getPlayersFromFirebaseData
  });
}(jQuery));

function refreshPlayersTable(){
  console.log('Refresh Table Button Clicked');
  var table = $('#players-table');
  table.get(0).data = [];
  table.refreshFirebaseTable({
    connectionString: "https://shining-torch-9613.firebaseio.com/",
    collectionName: "members",
    getDataFunction: getPlayersFromFirebaseData
  });
}

function getPlayersFromFirebaseData(data){
  var temp = [];

  jQuery.each(data, function(index, user){
    temp.push({
      first_name: user.firstName,
      nick_name: '"' + user.nickName + '"',
      last_name: user.lastName
    });
  });

  return temp;
}
