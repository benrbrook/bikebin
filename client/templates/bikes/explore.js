Template.explore.helpers({
	// Returns a collection containing all the bikes
	bikes: function() {
		return Bikes.find({}, {sort: {submitted: -1}});
	}
});