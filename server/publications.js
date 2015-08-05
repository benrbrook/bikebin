// Allow permisions for image upload.  CollectionFS only works
// from the client, so I can't call a Meteor method
// on the server like I normally would.
Images.allow({
  insert: function(userId, doc) {
    return (userId && doc.metadata.owner === userId);
  },
  update: function(userId, doc, fieldNames, modifier) {
    return (userId === doc.metadata.owner);
  },
  remove: function(userId, doc) {
    return false;
  },
  download: function(userId) {
    return !!userId;
  }
});

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

// Returns newest bikes
Meteor.publish('newestBikes', function() {
	return Bikes.find({}, {sort: {submitted: -1}, limit: 8});
});

// Returns featured (high stat count) bikes
Meteor.publish('featuredBikes', function() {
	return Bikes.find({}, {sort: {votes: 1}, limit: 8});
});

Meteor.publish('comments', function(id) {
	check(id, String);
	return Comments.find({bikeId: id});
})