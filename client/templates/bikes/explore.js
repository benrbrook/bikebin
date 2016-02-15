Template.explore.helpers({
	// Returns a collection containing all the bikes
	bikes: function() {
		return Bikes.find({userId: Meteor.userId()});
	}
});