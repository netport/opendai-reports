define([
  // Application.,
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
      "reports": "reports",
      "report/:id": "report",
      "*hello": "all"
    },
    index: function() {
        var MainLayout = new View.Views.Main();
        MainLayout.render();
    },
    reports: function() {
        $('#main').html('Loading...');
        Report.Store.Reports = new Report.Collection();
        Report.Store.Reports.fetch({success: function(){
            var reports = {'reports': Report.Store.Reports.models};
            var ReportLayout = new Report.Views.Layout({'data': reports});
            ReportLayout.render();
        }, error: function(obj, err){
            console.log('Error: Data not loaded');
        }});
    },
    report: function(id) {
        var model = Report.Store.Reports.get(id);
        var report = {'report': model};
        var SingleReport = new Report.Views.Single({model: model});
        SingleReport.render();
    },
    all: function() {
        console.log('Routed!');
    }
  });

  return Router;

});
