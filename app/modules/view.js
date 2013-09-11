  // Map module
define([
  // Application.
  "app",
  "modules/user"
],

// Map dependencies from above array.
function(app, User) {

  // Create a new module.
  var View = app.module();

/*
  View.Views.UserBox = Backbone.View.extend({
    template: 'userinfo'
  });
*/
  View.Views.HeaderView = Backbone.View.extend({
    el: '#header',
    template: 'menu',
    views: {
      //'#userbox': User.Views.View()
    }
  });

  View.Views.FooterView = Backbone.View.extend({
    el: '#footer',
    template: 'footer'
  });

  //Not used
  View.Views.MapView = Backbone.View.extend({
    el: '#mapContainer',
    template: 'map'
  });

  View.Views.Reports = Backbone.Layout.extend({
    'header': new View.Views.HeaderView(),
    //'main': new View.Views.MapView(),
    'footer': new View.Views.FooterView()
  });

  // Return the module for AMD compliance.
  return View;

});
