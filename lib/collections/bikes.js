Bikes = new Mongo.Collection('bikes');

Meteor.methods({
	bikeInsert: function(bikeProperties) {
		check(this.userId, String);
		check(bikeProperties, {
			name: String
		});

		var user = Meteor.user();
		var bike = _.extend(bikeProperties, {
			userId: user._id,
			owner: user.username, 
			submitted: new Date()
		});

		var bikeId = Bikes.insert(bike);

		return {
			_id: bikeId
		};
	},
	bikeEdit: function(currentBikeId, bikeProperties) {
		check(currentBikeId, String);
		check(bikeProperties, {
			name: String
		});

		currentUserId = Meteor.userId();

		Bikes.update({_id: currentBikeId, userId: currentUserId}, {$set: bikeProperties});

		return {
			_id: currentBikeId
		};
	}
});