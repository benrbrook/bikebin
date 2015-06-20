Meteor.publish('bike', function(id) {
	check(id, String);
	return Bikes.find(id);
});

Meteor.publish('ownedBikes', function(userId) {
	check(userId, String);
	// console.log(userId);
	return Bikes.find({userId: userId});
});