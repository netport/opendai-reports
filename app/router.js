define([
  // Application.
  "app",
  "modules/report",
  "modules/map"
],

function(app, Report, Map) {

  // Defining the application router, you can attach sub routers here.
  var Router = Backbone.Router.extend({
    routes: {
      "": "index",
      "reports": "reports"
    },

    index: function() {
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
