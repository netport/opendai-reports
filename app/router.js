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
      "reports/:action": "reports",
      "logout": "logout",
      //"*hello": "all"
    },
    initialize: function() {
      that = this;
      var MainLayout = new Backbone.Layout({
        views: {
          'header': new View.Views.HeaderView(),
          'footer': new View.Views.FooterView()
        }
      });

      MainLayout.render();
    },
    index: function() {
        var UserModel = new User.Model();
        FB.login(function(response) {
           if (response.authResponse) {
             console.log('Welcome!  Fetching your information.... ');
             FB.api('/me', function(response) {
              //console.log(response);
              UserModel.set({
                'username': response.username,
                'first_name': response.first_name,
                'last_name': response.last_name,
                'authorized': true
              });
              console.log('Good to see you, ' + response.name + '.');
              FB.api('/me/picture', function(response){
                UserModel.set({'image': response.data.url});
                var UserInfoView = new User.Views.View({data: UserModel.toJSON() });
                UserInfoView.render();
              });
             });
          } else {
            console.log('User cancelled login or did not fully authorize.');
          }
        });
    },
    reports: function(action) {
      if(!UserModel.authorized) {
        this.navigate('', {trigger:true});
      }
      if(action=='new') {
        var view = new Report.Views.AddNew();
        view.render();
      } else {
        $('#main').html('Loading...');
        Report.Store = new Report.Collection();
        Report.Store.fetch({success: function(){
            var reports = {'reports': Report.Store.models};
            var ReportLayout = new Report.Views.Layout({'data': reports});
            ReportLayout.render();
        }, error: function(obj, err){
            console.log('Error: Data not loaded');
        }});
      }
    },
    report: function(id) {
        var model = Report.Store.get(id);
        var report = {'report': model};
        var SingleReport = new Report.Views.Single({data: model.toJSON(), model: model});
        SingleReport.render();
    },
    all: function() {
        console.log('Routed!');
    },
    logout: function() {
      that = this;
      if(FB) {
        FB.logout(function(response){
          console.log('Logged out');
          that.navigate('', {trigger:true});
        });
      }
      
    }
  });

  return Router;

});
