Bikes = new Mongo.Collection('bikes');

validateBike = function(bike, files) {
	var errors = {};

	if (files.length == 0)
		errors.file = "Please upload a picture of your bike";

	if (!bike.name)
		errors.name = "Please give the bike a name";
  
	if (!bike.brand)
		errors.brand =  "Please fill in a brand";

	if (!bike.frame)
		errors.frame = "Please fill in a frame";

	// if (!bike.derailleurs)
	// 	errors.derailleurs = "Please fill in a derailleur";

	// if (!bike.crank)
	// 	errors.crank = "Please fill in a crank";

	// if (!bike.wheels)
	// 	errors.wheels = "Please fill in a wheel";

	// if (!bike.tires)
	// 	errors.tires = "Please fill in a tire";

	if (!bike.description)
		errors.description = "Please give the bike a description";

	return errors;
}

validateBikeEdit = function(bike) {
	var errors = {};

	if (!bike.name)
		errors.name = "Please give the bike a name";
  
	if (!bike.brand)
		errors.brand =  "Please fill in a brand";

	if (!bike.frame)
		errors.frame = "Please fill in a frame";

	// if (!bike.derailleurs)
	// 	errors.derailleurs = "Please fill in a derailleur";

	// if (!bike.crank)
	// 	errors.crank = "Please fill in a crank";

	// if (!bike.wheels)
	// 	errors.wheels = "Please fill in a wheel";

	// if (!bike.tires)
	// 	errors.tires = "Please fill in a tire";

	if (!bike.description)
		errors.description = "Please give the bike a description";

	return errors;
}

isEmpty = function(obj) {
	for (var prop in obj) {
		if (obj.hasOwnProperty(prop))
			return false;
	}
	return true;
}

Meteor.methods({
	bikeInsert: function(bikeProperties, files) {
		check(this.userId, String);
		check(bikeProperties, {
			name: String,
			brand: String,
			frame: String,
			derailleurs: String,
			crank: String,
			brakes: String,
			wheels: String,
			tires: String,
			description: String,
			front_suspension: String,
			rear_suspension: String
		});

		var user = Meteor.user();
		var bike = _.extend(bikeProperties, {
			userId: user._id,
			owner: user.emails[0].address, 
			submitted: new Date(),
			starUsers: [],
			votes: 0,
			commentCount: 0,
			secureUrl: ""
		});

		var bikeId = Bikes.insert(bike);

		return {
			_id: bikeId
		};
	},
	imageUrlUpdate: function(currentBikeId, secureUrl) {
		check(currentBikeId, String);
		check(secureUrl, String);
		Bikes.update({_id: currentBikeId}, {$set: {secureUrl: secureUrl}});
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
			brakes: String,
			wheels: String,
			tires: String,
			description: String,
			front_suspension: String,
			rear_suspension: String
		});

		currentUserId = Meteor.userId();

		Bikes.update({_id: currentBikeId, userId: currentUserId}, {$set: bikeProperties});

		return {
			_id: currentBikeId
		};
	},
	bikeDelete: function(currentBikeId) {
		check(currentBikeId, String);
		check(this.userId, String);
		currentUserId = Meteor.userId();
		bikeToDelete = Bikes.find({_id: currentBikeId});
		console.log(bikeToDelete);
		Bikes.remove({_id: currentBikeId, userId: currentUserId});
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