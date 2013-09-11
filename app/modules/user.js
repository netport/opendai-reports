// User module
define([
  // Application.
  "app"
],

// Map dependencies from above array.
function(app) {

  // Create a new module.
  var User = app.module();

  // Default Model.
  User.Model = new Backbone.Model({

  });

  // Default Collection.
  User.Collection = Backbone.Collection.extend({
    model: User.Model
  });

  // Default View.
  User.Views.Layout = Backbone.Layout.extend({
    template: "userinfo"
  });

  User.Views.View = Backbone.View.extend({
    model: User.Model,
    initialize: function() {
      User.Model.on('change', function(){
        console.log('model update');
      });
    },
    el: '#header',
    template: "userinfo",
    render: function() {
      console.log('rendering user');
    }
  });

  // Return the module for AMD compliance.
  return User;

});
