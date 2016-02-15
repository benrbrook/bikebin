Template.bikeEdit.events({
	'click #btn-bike-cancel': function(e) {
		var currentBikeId = this._id;
		Router.go('bike', {_id: currentBikeId});
	},
	// Submits an edited bike
	'click #btn-bike-submit': function(e, t) {
		var currentBikeId = this._id;
		toastr.clear();
		var files = t.$("input.file_bag")[0].files;

		e.preventDefault();

		// Pull info from text input fields
		var bikeProperties = {
			name: $('#name').val(),
			brand: $('#brand').val(),
			frame: $('#frame').val(),
			derailleurs: $('#derailleurs').val(),
			brakes: $('#brakes').val(),
			crank: $('#crank').val(),
			wheels: $('#wheels').val(),
			tires: $('#tires').val(),
			front_suspension: $('#front_suspension').val(),
			rear_suspension: $('#rear_suspension').val(),
			description: $('#description').val()
		};

		var errors = validateBikeEdit(bikeProperties);
		if (!isEmpty(errors)) {
			for (var key in errors) {
				toastr.error(errors[key]);
			}
			return;
		}

		var validExtension = 0;
		if (files.length) {
			var validExtensions = ["jpg", "jpeg", "png"];
			for (i = 0; i < validExtensions.length; ++i) {
				if (files[0].name.split('.').pop().localeCompare(validExtensions[i]) === 0) {
					validExtension = 1;
				}
			}
		}

		// This calls bikeEdit on the server, where data 
		// and login gets validated
		Meteor.call('bikeEdit', currentBikeId, bikeProperties, function(error, result) {
			if (error)
				console.log(error.reason);

			if (validExtension) {
				Meteor.call('imageUrlUpdate', currentBikeId, "", function(error, result) {
					if (error)
						console.log(error.reason)
				});

				s3Upload(e, files, currentBikeId);
			}

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