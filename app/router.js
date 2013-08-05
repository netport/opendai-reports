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
      "reports/new": "reportsnew",
      "*hello": "all"
    },
    index: function() {
        var MainLayout = new View.Views.Main();
        MainLayout.render();
    },
    reports: function() {
        $('#main').html('Loading...');
        Report.Store = new Report.Collection();
        Report.Store.fetch({success: function(){
            var reports = {'reports': Report.Store.models};
            var ReportLayout = new Report.Views.Layout({'data': reports});
            ReportLayout.render();
        }, error: function(obj, err){
            console.log('Error: Data not loaded');
        }});
    },
    report: function(id) {
        var model = Report.Store.get(id);
        var report = {'report': model};
        var SingleReport = new Report.Views.Single({data: model.toJSON(), model: model});
        SingleReport.render();
    },
    reportsnew: function() {
        var view = new Report.Views.AddNew();
        view.render();
    },
    all: function() {
        console.log('Routed!');
    }
  });

  return Router;

});
