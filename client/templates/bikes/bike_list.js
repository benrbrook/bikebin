Template.bikeList.helpers({
	// Returns a collection containing all the bikes owned
	// by the logged in user
	bikes: function() {
		return Bikes.find({userId: Meteor.userId()});
	}
})