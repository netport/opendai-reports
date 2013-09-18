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
  User.Model = Backbone.Model.extend({

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
    el: '#main',
    template: "userinfo",
    model: User,
    initialize: function() {
      that = this;
      _.bindAll(this,'render');
      /*this.model.bind('change:image', function() {
        that.update();
      });*/
    }, update: function() {
      if(this.model.get('image')!==null){
        this.render();
      }
    }, afterRender: function() {
      console.log(this.model);
    }
  });

  // Return the module for AMD compliance.
  return User;

});
