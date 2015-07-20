/*
* A quick jQuery plugin to handle all the binding and checking for our firebase table binding.
* Requires a passed in object of settings: connection string, collection name, table selector, data formatting function.
*/
(function($) {
    $.fn.loadFirebaseTable = function(options) {
      // Check if we have already rendered the table via firebaseTableRendered data.
      if (this.data('firebaseTableRendered'))
      {
        console.log('Table already rendered. Avoiding second render.');
        return this;
      }

      // Lets map our options. If we provide defaults, add them in here.
      var settings = $.extend({
        connectionString: null,
        collectionName: null,
        getDataFunction: null
      }, options);

      // Make sure we have all our properties.
      if (settings.connectionString == null) {
        throw 'A firebase connection string must be provided.'
      }

      if (settings.collectionName == null) {
        throw 'The collection name must be provided.'
      }

      if (settings.getDataFunction == null || !jQuery.isFunction(settings.getDataFunction))
      {
        throw 'Data function parameter must be provided and must be a function.'
      }

      console.log('Starting Plugin Code');
      // Setup our firebase reference.
      var myFirebaseRef = new Firebase(settings.connectionString);
      // We have to assign our 'this' scoped variable to another variable, due to scope change in method call back.
      var $table = this;
      // Bind to our firebase query.
      myFirebaseRef.child(settings.collectionName).once('value', function(snapshot){
        console.log('Plugin callback received');
        // Grab the snapshot of the data.
        var data = snapshot.val();
        console.log('Invoking passed method');
        // Call our format function to generate our table data array.
        var dataArray = settings.getDataFunction(data);

        console.log('Setting Table Data');
        // Set the table data, mark that this table instance has been rendered.
        $table.get(0).data = dataArray;
        $table.data('firebaseTableRendered', true);
      });

      return this;
    };

    $.fn.refreshFirebaseTable = function(options) {
      // Check if we have already rendered the table via firebaseTableRendered data.
      if (!this.data('firebaseTableRendered'))
      {
        console.log('Table not rendered. Unable to refresh.');
        return this;
      }

      // Lets map our options. If we provide defaults, add them in here.
      var settings = $.extend({
        connectionString: null,
        collectionName: null,
        getDataFunction: null
      }, options);

      // Make sure we have all our properties.
      if (settings.connectionString == null) {
        throw 'A firebase connection string must be provided.'
      }

      if (settings.collectionName == null) {
        throw 'The collection name must be provided.'
      }

      if (settings.getDataFunction == null || !jQuery.isFunction(settings.getDataFunction))
      {
        throw 'Data function parameter must be provided and must be a function.'
      }

      console.log('Starting Plugin Code');
      // Setup our firebase reference.
      var myFirebaseRef = new Firebase(settings.connectionString);
      // We have to assign our 'this' scoped variable to another variable, due to scope change in method call back.
      var $table = this;
      // Bind to our firebase query.
      myFirebaseRef.child(settings.collectionName).once('value', function(snapshot){
        console.log('Plugin callback received');
        // Grab the snapshot of the data.
        var data = snapshot.val();
        console.log('Invoking passed method');
        // Call our format function to generate our table data array.
        var dataArray = settings.getDataFunction(data);

        console.log('Setting Table Data');
        // Set the table data, mark that this table instance has been rendered.
        $table.get(0).data = dataArray;
        $table.data('firebaseTableRendered', true);
      });

      return this;
    };
}(jQuery));
