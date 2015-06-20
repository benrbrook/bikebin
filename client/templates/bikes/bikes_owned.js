Template.bikesOwned.helpers({
	bikes: function() {
		return Bikes.find({userId: Meteor.userId()});
	}
})