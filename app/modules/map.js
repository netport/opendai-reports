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
      
    }
  });

  // Return the module for AMD compliance.
  return Map;

});
