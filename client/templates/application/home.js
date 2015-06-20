Template.home.events({
	'click #btn-bike-add': function() {
		Router.go('bikeAdd');
	},
	'click #btn-bikes-owned': function() {
		Router.go('bikesOwned');
	}
});