// Returns a specific bike from the id
Meteor.publish('bike', function(id) {
	check(id, String);
	return Bikes.find(id);
});

// Returns all bikes owned by a certain user
Meteor.publish('ownedBikes', function(userId) {
	check(userId, String);
	// console.log(userId);
	return Bikes.find({userId: userId});
});