define([
  // Application.
  "app",
  "modules/report",
  "modules/map",

  "modules/view"
],

function(app, Report, Map, View) {

  // Defining the application router, you can attach sub routers here.
  var Router = Backbone.Router.extend({
    routes: {
      "": "index",
      "reports": "reports"
    },
    index: function() {
        var MainLayout = new View.Views.Main();
        MainLayout.render();

        var MapLayout = new Map.Views.Layout();
        MapLayout.render();
    },
    reports: function() {
        var ReportCollection = new Report.Collection();
        ReportCollection.fetch({success: function(){
            var test = {'reports': ReportCollection.models};
            var ReportLayout = new Report.Views.Layout({'data': test});
            ReportLayout.render();
        }});
    }
  });

  return Router;

});
