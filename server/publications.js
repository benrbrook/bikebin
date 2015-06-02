Meteor.publish('bikes', function(id) {
	check(id, String);
	return Bikes.find(id);
});