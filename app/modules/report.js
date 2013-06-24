// Report module
define([
    // Application.
    "app"
],

// Map dependencies from above array.
function(app) {

    // Create a new module.
    var Report = app.module();

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
        template: "report"
    });

    // Return the module for AMD compliance.
    return Report;

});