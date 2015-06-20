Template.bikeAdd.events({
	'click #btn-bike-create': function(e) {
		e.preventDefault();

		var bikeProperties = {
			name: $('#name').val(),
			brand: $('#brand').val(),
			frame: $('#frame').val(),
			derailleurs: $('#derailleurs').val(),
			crank: $('#crank').val(),
			wheels: $('#wheels').val(),
			tires: $('#tires').val()
		};

		Meteor.call('bikeInsert', bikeProperties, function(error, result) {
			if (error)
				console.log(error.reason);

			Router.go('bike', {_id: result._id});
		});
	}
});