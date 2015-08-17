Template.bikeEdit.events({
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
			crank: $('#crank').val(),
			wheels: $('#wheels').val(),
			tires: $('#tires').val(),
			description: $('#description').val()
		};

		var errors = validateBikeEdit(bikeProperties);
		if (isEmpty(errors)) {
			for (var key in errors) {
				toastr.error(errors[key]);
			}	
		} else {
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
				S3.upload({
		        	files: files,
		        	path: "s3"
		    	}, function(e, image) {
		    		console.log("S3.upload");
		            if (e) {
		            	console.log(e);
		            } else {
						console.log("Success");
						// Update the url
						Meteor.call('imageUrlUpdate', currentBikeId, image.secure_url, function(error, result) {
							if (error)
								console.log(error.reason)
						});
			            // Insert image
			            Images.insert(image);
		            }
				});
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