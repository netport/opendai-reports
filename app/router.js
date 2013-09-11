define([
  // Application.,
  "app",
  "modules/report",
  "modules/map",
  "modules/view",
  "modules/user"
],

function(app, Report, Map, View, User) {

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
        //var MainLayout = new View.Views.Main();
        //MainLayout.render();

        var MainLayout = new Backbone.Layout({
          views: {
            'header': new View.Views.HeaderView()
            //'footer': new View.Views.FooterView()
          }
        });

        MainLayout.render();

        FB.login(function(response) {
           if (response.authResponse) {
             console.log('Welcome!  Fetching your information.... ');
             FB.api('/me', function(response) {
              console.log(response);
              var user = User.Model;
              user.set({
                'username': response.username,
                'first_name': response.first_name,
                'last_name': response.last_name
              });
              console.log('Good to see you, ' + response.name + '.');
              FB.api('/me/picture', function(response){
                user.set({'image': response.data.url});
                //console.log(User.Model);
              });
             });
          } else {
            console.log('User cancelled login or did not fully authorize.');
          }
        });
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
        var MainLayout = new View.Views.Main();
        MainLayout.render();
        var view = new Report.Views.AddNew();
        view.render();
    },
    all: function() {
        console.log('Routed!');
    }
  });

  return Router;

});
