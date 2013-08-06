  // Map module
define([
  // Application.
  "app"
],

// Map dependencies from above array.
function(app) {

  // Create a new module.
  var View = app.module();

  var UserBox = Backbone.View.extend({
    template: 'userinfo'
  });

  View.Views.HeaderView = Backbone.View.extend({
    el: '#header',
    template: 'menu',
    views: {
      '#userbox': new UserBox()
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

  View.Views.Main = Backbone.Layout.extend({
    views: {
      'header': new View.Views.HeaderView(),
      'footer': new View.Views.FooterView()
    }
  });

  View.Views.Reports = Backbone.Layout.extend({
    'header': new View.Views.HeaderView(),
    //'main': new View.Views.MapView(),
    'footer': new View.Views.FooterView()
  });

  // Return the module for AMD compliance.
  return View;

});
