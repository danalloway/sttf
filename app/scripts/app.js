// listen for when Polymer has finished parsing and is ready to roll
window.addEventListener('WebComponentsReady', function() {

    // remove the `unresolved` attribute and fade in the app
    // this prevents any FOUC from occuring
    document.querySelector('body').removeAttribute('unresolved');

});
