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
        title: null,
        lat: 0,
        long: 0
    });

    // Default Collection.
    Report.Collection = Backbone.Collection.extend({
        model: Report.Model,
        parse: function(response) {
            return response.reports;
        },
        url: 'http://localhost:8001/api/reports'
    });

    // Default View.
    Report.Views.Layout = Backbone.Layout.extend({
        el: '#main',
        template: "report",
        views: {
            'header': new View.Views.HeaderView(),
            '#mapContainer': new Map.Views.Map(),
            'footer': new View.Views.FooterView()
        }
    });

    Report.Views.Single = Backbone.Layout.extend({
        el: '#main',
        template: 'singlereport',
        data: {},
        model: Report,
        views: {
            'header': new View.Views.HeaderView(),
            '#mapContainer': new Map.Views.Map(),
            'footer': new View.Views.FooterView()
        },
        events: {
            'click button': 'centerMap'
        },
        beforeRender: function() {
            this.data = this.model.toJSON();
        },
        afterRender: function() {
            console.log(this.model.get('lat')+ ' '+this.model.get('lng'));
            Map.Store.setView([this.model.get('lat'), this.model.get('lng')], 16);
            console.log(this.get('data'));
        },
        centerMap: function() {
            Map.Store.setView([54, -09], 18);
        }
    });

    // Return the module for AMD compliance.
    return Report;

});