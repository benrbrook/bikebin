Bikes = new Mongo.Collection('bikes');

Meteor.methods({
	bikeInsert: function(bikeProperties) {
		check(this.userId, String);
		check(bikeProperties, {
			name: String,
			brand: String,
			frame: String,
			derailleurs: String,
			crank: String,
			wheels: String,
			tires: String,
			description: String,
		});

		var user = Meteor.user();
		var bike = _.extend(bikeProperties, {
			userId: user._id,
			owner: user.username, 
			submitted: new Date(),
			starUsers: [],
			votes: 0
		});

		var bikeId = Bikes.insert(bike);

		return {
			_id: bikeId
		};
	},
	bikeEdit: function(currentBikeId, bikeProperties) {
		check(currentBikeId, String);
		check(this.userId, String);
		check(bikeProperties, {
			name: String,
			brand: String,
			frame: String,
			derailleurs: String,
			crank: String,
			wheels: String,
			tires: String,
			description: String
		});

		currentUserId = Meteor.userId();

		Bikes.update({_id: currentBikeId, userId: currentUserId}, {$set: bikeProperties});

		return {
			_id: currentBikeId
		};
	},
	bikeDelete: function(currentBikeId) {
		check(currentBikeId, String);
		Bikes.remove(currentBikeId);
	},
	star: function(currentBikeId) {
		check(this.userId, String);
		check(currentBikeId, String);

		starUsers = Bikes.findOne({_id: currentBikeId}).starUsers;

		// We need a check to allow the user to 'unstar' a specific bike
		if (_.contains(starUsers, this.userId)) {
			Bikes.update({
				_id: currentBikeId
			}, {
				$pull: {starUsers: this.userId},
				$inc: {votes: -1}
			});
		} else {
			Bikes.update({
				_id: currentBikeId,
				starUsers: {$ne: this.userId}
			}, {
				$addToSet: {starUsers: this.userId},
				$inc: {votes: 1}
			});
		}
	}
});