  // Map module
define([
  // Application.
  "app"
],

// Map dependencies from above array.
function(app) {

  // Create a new module.
  var Map = app.module();

  // Default Model.
  Map.Model = Backbone.Model.extend({

  });

  // Default Collection.
  Map.Collection = Backbone.Collection.extend({
    model: Map.Model
  });

  // Default View.
  Map.Views.Layout = Backbone.Layout.extend({
    el: '#main',
    template: "map"
  });

  // Return the module for AMD compliance.
  return Map;

});
