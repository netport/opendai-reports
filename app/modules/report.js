// Report module
define([
    // Application.
    "app",
    "modules/map",
    "modules/view"
],

// Map dependencies from above array.
function(app, Map, View) {

    // Create a new module.
    var Report = app.module();

    Report.Store = {};

    // Default Model.
    Report.Model = Backbone.Model.extend({

    });

    // Default Collection.
    Report.Collection = Backbone.Collection.extend({
        model: Report.Model,
        parse: function(response) {
            return response.reports;
        },
        url: 'http://localhost:8001/api/reports'
    });

    Report.Views.AddNew = Backbone.View.extend({
        el: '#main',
        template: 'reportnew',
        initialize: function() {
            console.log('New report');
        }
    });

    // Default View.
    Report.Views.Layout = Backbone.Layout.extend({
        el: '#main',
        template: "report",
        views: {
            'header': new View.Views.HeaderView(),
            '#mapContainer': new Map.Views.Map(),
            'footer': new View.Views.FooterView()
        },
        afterRender: function() {
            _.each(Report.Store.model, function(model){
                console.log(model);
                var attr = model.attributes,
                    marker = L.Marker([attr.lat, attr.lng]);

                marker.addTo(Map.Store);
            });
        }
    });

    Report.Views.Single = Backbone.Layout.extend({
        el: '#main',
        template: 'singlereport',
        model: Report,
        views: {
            'header': new View.Views.HeaderView(),
            '#mapContainer': new Map.Views.Map(),
            'footer': new View.Views.FooterView()
        },
        events: {
            'click button': 'centerMap'
        },
        initialize: function() {

        },
        beforeRender: function() {

        },
        afterRender: function() {
            this.marker = new L.marker([this.model.get('lng'), this.model.get('lat')]);
            console.log(this.marker);
            Map.Store.setView([this.model.get('lat'), this.model.get('lng')], 16);
            this.marker.addTo(Map.Store);
        },
        centerMap: function() {
            Map.Store.setView([54, -9], 18);
        }
    });

    // Return the module for AMD compliance.
    return Report;

});