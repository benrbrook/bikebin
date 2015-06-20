Template.bikeEdit.events({
	'click #btn-bike-submit': function(e) {
		e.preventDefault();

		var currentBikeId = this._id;

		var bikeProperties = {
			name: $('#name').val(),
			brand: $('#brand').val(),
			frame: $('#frame').val(),
			derailleurs: $('#derailleurs').val(),
			crank: $('#crank').val(),
			wheels: $('#wheels').val(),
			tires: $('#tires').val()
		}; 

		console.log(bikeProperties);

		Meteor.call('bikeEdit', currentBikeId, bikeProperties, function(error, result) {
			if (error)
				console.log(error.reason);

			Router.go('bike', {_id: result._id});
		});
	}
});