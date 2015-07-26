Template.bikeEdit.events({
	// Submits an edited bike
	'click #btn-bike-submit': function(e) {
		e.preventDefault();

		var currentBikeId = this._id;

		// Pull info from text input fields
		var bikeProperties = {
			name: $('#name').val(),
			brand: $('#brand').val(),
			frame: $('#frame').val(),
			derailleurs: $('#derailleurs').val(),
			crank: $('#crank').val(),
			wheels: $('#wheels').val(),
			tires: $('#tires').val(),
			description: $('#description').val()
		}; 

		// This calls bikeEdit on the server, where data 
		// and login gets validated
		Meteor.call('bikeEdit', currentBikeId, bikeProperties, function(error, result) {
			if (error)
				console.log(error.reason);

			Router.go('bike', {_id: result._id});
		});
	},
	// Deletes a bike
	'click #btn-bike-delete': function(e) {
		e.preventDefault();

		if (confirm("Delete this bike?")) {
			var currentBikeId = this._id;
			// This calls bikeDelete on the server, where data 
			// and login gets validated
			Meteor.call('bikeDelete', currentBikeId, function(error, result) {
				if (error)
					console.log(error);

				Router.go('home');
			});
		}
	}
});