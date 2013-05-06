window.App = Ember.Application.create();

App.Store = DS.Store.extend({
	revision: 12,
	adapter: DS.RESTAdapter.create({
		url: 'http://localhost:8001/api'
	})
});

App.Router.map(function(){
	this.resource('reports', function() {
		this.resource('report', { path: ':report_id' }, function(){

		});
	});
});

App.ReportsRoute = Ember.Route.extend({
	model: function() {
		return App.Report.find()
	}
});

App.ReportRoute = Ember.Route.extend({

});

App.ReportController = Ember.ObjectController.extend({
	info: function(model) {
		var lat = model.get('lat');
		var lng = model.get('lng');
		var map = App.Map.get('map');
		map.setView([lat, lng], 16);
	},
	addNew: function(position) {
		App.AddReportView.appendTo('#editor');
	}
});

App.ReportsController = Ember.ArrayController.extend({
	centerMap: function() {
		App.Map.map.setView(App.User.position, 16);
	}
});

App.Map = Ember.Object.create({
	map: null,
	tiles: null
});

App.User = Ember.Object.create({
	username: null,
	position: null,
});

App.ReportsView = Ember.View.extend({
	didInsertElement: function() {
		//CHECK USER POSITION
		if (navigator.geolocation) {
	      navigator.geolocation.getCurrentPosition(this.showPosition);
	    } else {
	      alert('Doesn´t support geolocation');
	    }
	},
	showPosition: function(coordinates) {
		App.User.position = [coordinates.coords.latitude, coordinates.coords.longitude];
		var lat = coordinates.coords.latitude;
		var lng = coordinates.coords.longitude;

		App.Map.set('map', L.map('mapContainer').setView([lat, lng], 14));

		App.Map.tiles = L.tileLayer('http://{s}.tile.cloudmade.com/cec90b3181b34d52a7b677e48ac6b136/997/256/{z}/{x}/{y}.png', {
			attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://cloudmade.com">CloudMade</a>',
			maxZoom: 18
		}).addTo(App.Map.map);

		App.Map.map.on('click', function(e){
			App.Report.create(function(){
				
			});
		});

		App.Map.greenIcon = L.icon({
		  iconUrl: 'img/marker-icon.png',
		  shadowUrl: 'img/marker-shadow.png',
		  iconAnchor: [12.5, 41],
		  popupAnchor: [-1, -41]
		});
    
	},
	centerMap: function() {
		App.Map.setView(App.User.position, 16);
	}
});

App.Report = DS.Model.extend({
	title: DS.attr('string'),
	lat: DS.attr('number'),
	lng: DS.attr('number'),
	type: DS.attr('string'),
	description: DS.attr('string'),

	updated: function(item) {
		var lat = item.get('lat');
		var lng = item.get('lng');
		var desc = item.get('description');
		var test = L.marker([lat, lng], {icon: App.Map.greenIcon}).addTo(App.Map.map).bindPopup(desc);
	}.observes('title')
});





