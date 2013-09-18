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
        events: {
            'click button': 'save'
        },
        model: Report.Store,
        initialize: function() {
            if (navigator.geolocation)
            {
                navigator.geolocation.getCurrentPosition(this.showPosition);
            }
        },
        showPosition: function(position) {
            console.log(this);
            this.lat = position.coords.latitude;
            this.lng = position.coords.longitude;

            $('#lat').val(position.coords.latitude);
            $('#lng').val(position.coords.longitude);

            Report.Views.AddNew.lat = position.coords.latitude;
            Report.Views.AddNew.lng = position.coords.longitude;

        },
        save: function() {
            console.log('Saving report');

            var newReport = new Report.Model();
            newReport.url = 'http://localhost:8001/api/reports';

            newReport.set('title', $('#title').val() );
            newReport.set('description', $('#description').val() );
            newReport.set('types_id', $('#type').val() );
            newReport.set('lat', Report.Views.AddNew.lat);
            newReport.set('lng', Report.Views.AddNew.lng);
            //Add model to collection
            //Report.Store.add(newReport);
            //Save the model to db
            newReport.save();
            console.log('Report saved: '+newReport);
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
            Map.Store = L.map('map').setView([56.169401778813686, 14.864437580108644], 13);
            L.tileLayer('http://{s}.tile.cloudmade.com/4e5f745e28654b7eb26aab577eed79ee/997/256/{z}/{x}/{y}.png', {
                attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://cloudmade.com">CloudMade</a>[…]',
                maxZoom: 18
            }).addTo(Map.Store);
            _.each(Report.Store.models, function(model){
                if(model.get('lat') !== null) {
                    var marker = new L.Marker([model.get('lat'), model.get('lng')]);
                    marker.addTo(Map.Store);
                }
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
            console.log(this.model);
            Map.Store = L.map('map').setView([this.model.get('lat'), this.model.get('lng')], 16);
            L.tileLayer('http://{s}.tile.cloudmade.com/4e5f745e28654b7eb26aab577eed79ee/997/256/{z}/{x}/{y}.png', {
                attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://cloudmade.com">CloudMade</a>[…]',
                maxZoom: 18
            }).addTo(Map.Store);
            var marker = new L.marker([this.model.get('lat'), this.model.get('lng')]);
            marker.addTo(Map.Store);
        },
        centerMap: function() {
            Map.Store.setView([54, -9], 18);
        }
    });

    // Return the module for AMD compliance.
    return Report;

});