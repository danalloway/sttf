(function($){
  var firebaseConString = "https://shining-torch-9613.firebaseio.com/";
  var myFirebaseRef = new Firebase(firebaseConString);

  $('#match-form').submit(function(e){
    if (!this._validate()){
      return;
    }

    e.preventDefault();
  });

}(jQuery));

// This is here so we can submit the form. Required due to custom submit button.
function submitRecordMatch() {
  var $form = $('#match-form');

  //$form.submit();
};

// This is here so we can submit the form. Required due to custom submit button.
function clearRecordMatch() {
  $('#match-form').get(0).reset();
};
