(function($){
  var firebaseConString = "https://shining-torch-9613.firebaseio.com/";
  var myFirebaseRef = new Firebase(firebaseConString);

  $('#registration-form').submit(function(e){
    if (!this._validate()){
      return;
    }

    var form_data = $(this).serializeArray();

    var obj = {
      firstName: $.grep(form_data, function(field){ return field.name == 'first_name' })[0].value,
      lastName: $.grep(form_data, function(field){ return field.name == 'last_name' })[0].value,
      nickName: $.grep(form_data, function(field){ return field.name == 'nick_name' })[0].value,
      email: $.grep(form_data, function(field){ return field.name == 'email' })[0].value
    };

    myFirebaseRef.child('test-users').push(obj);

    e.preventDefault();
    this.reset();
    var $toast = $('#player-added');
    $toast.get(0).text =  obj.firstName + ' added to the roster.';
    $toast.get(0).show();
  });

}(jQuery));

// This is here so we can submit the form. Required due to custom submit button.
function submitRegistration() {
  var $form = $('#registration-form');

  $form.submit();
};

// This is here so we can submit the form. Required due to custom submit button.
function clearRegistration() {
  $('#registration-form').get(0).reset();
};
