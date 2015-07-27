Template.home.events({
	// Loads the add bike template
	'click #btn-bike-add': function() {
		Router.go('bikeAdd');
	},
	// Loads the owned bikes template
	'click #btn-bikes-owned': function() {
		Router.go('bikesOwned');
	}
});

Template.home.helpers({
	newestBikes: function() {
		return Bikes.find({}, {sort: {submitted: -1}, limit: 8});
	},
	featuredBikes: function() {
		return Bikes.find({}, {sort: {votes: -1}, limit: 8})
	}
});