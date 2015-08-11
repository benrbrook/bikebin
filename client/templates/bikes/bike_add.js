Template.bikeAdd.events({
	// Initate file upload
	'dropped #dropzone': function(event, template) {
		FS.Utility.eachFile(event, function(file) {
			var fsFile = new FS.File(file);
		    fsFile.metadata = {owner: Meteor.userId()};
		    Images.insert(fsFile, function (err, fileObj) {

		    });
			Images.insert(file, function(err, fileObj) {
				// New doc inserted
			});
		});
	},
	// Creates a new bike
	'click #btn-bike-create': function(e) {
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

			Router.go('bike', {_id: result._id});
		});
	}
});