  // Map module
define([
  // Application.
  "app"
],

// Map dependencies from above array.
function(app) {

  // Create a new module.
  var Map = app.module();

  Map.Store = {};

  // Default Model.
  Map.Model = Backbone.Model.extend({

  });

  // Default View.

  Map.Views.Map = Backbone.View.extend({
    template: 'map',
    events: {

    },
    afterRender: function() {
      Map.Store = L.map('map').setView([56.169401778813686, 14.864437580108644], 13);
      L.tileLayer('http://{s}.tile.cloudmade.com/4e5f745e28654b7eb26aab577eed79ee/997/256/{z}/{x}/{y}.png', {
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://cloudmade.com">CloudMade</a>[…]',
        maxZoom: 18
      }).addTo(Map.Store);
    }
  });

  // Return the module for AMD compliance.
  return Map;

});
