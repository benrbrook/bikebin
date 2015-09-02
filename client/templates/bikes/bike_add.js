Template.bikeAdd.events({
	// Creates a new bike
	'click #btn-bike-create': function(e, t) {
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

		var errors = validateBike(bikeProperties, files);
		if (!isEmpty(errors)) {
			for (var key in errors) {
				toastr.error(errors[key]);
			}	
			return;
		}

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

				s3Upload(e, files, result._id);

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