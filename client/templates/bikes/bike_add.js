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

		// This calls bikeInsert on the server, where data 
		// and login gets validated
		Meteor.call('bikeInsert', bikeProperties, function(error, result) {
			if (error)
				console.log(error.reason);
			var files = t.$("input.file_bag")[0].files;
			console.log(files);
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
	}
});

Template.bikeAdd.helpers({
	files: function() {
		return Images.find();
	}
});