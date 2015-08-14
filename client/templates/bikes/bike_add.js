// Template.bikeAdd.onCreated(function() {
// 	Session.set('bikeSubmitErrors', {});
// });

// Template.bikeAdd.helpers({
// 	errorMessage: function(field) {
// 		console.log(Session.get('bikeSubmitErrors')[field]);
// 		return Session.get('bikeSubmitErrors')[field];
// 	},
// 	errorClass: function(field) {
// 		return !!Session.get('bikeSubmitErrors')[field] ? 'has-error' : '';
// 	}
// });

Template.bikeAdd.events({
	// Creates a new bike
	'click #btn-bike-create': function(e, t) {
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

		// var errors = validateBike(bikeProperties);
		// console.log(errors);
		if (errors.name || errors.brand || errors.frame 
						|| errors.derailleurs || errors.crank 
						|| errors.wheels || errors.tires || errors.description)
			return Session.set('postSubmitErrors', errors);

		var validExtensions = ["jpg", "jpeg", "png"];
		var validExtension = 0;
		for (i = 0; i < validExtensions.length; ++i) {
			if (files[0].name.split('.').pop().localeCompare(validExtensions[i]) === 0) {
				validExtension = 1;
			}
		}
		if (validExtension) {
			// This calls bikeInsert on the server, where data 
			// and login gets validated
			Meteor.call('bikeInsert', bikeProperties, function(error, result) {
				if (error)
					console.log(error.reason);

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
						Meteor.call('imageUrlUpdate', result._id, image.secure_url, function(error, result) {
							if (error)
								console.log(error.reason)
						});
			            // Insert image
			            Images.insert(image);
		            }
				});

				Router.go('bike', {_id: result._id});
			});
		} else {
			 toastr.error("Bad file type", files[0].name);
		}
	}
});

Template.bikeAdd.helpers({
	files: function() {
		return Images.find();
	}
});