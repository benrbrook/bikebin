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