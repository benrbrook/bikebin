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
			tires: $('#tires').val(),
			description: $('#description').val()
		}; 

		Meteor.call('bikeEdit', currentBikeId, bikeProperties, function(error, result) {
			if (error)
				console.log(error.reason);

			Router.go('bike', {_id: result._id});
		});
	},
	'click #btn-bike-delete': function(e) {
		e.preventDefault();

		if (confirm("Delete this bike?")) {
			var currentBikeId = this._id;
			Meteor.call('bikeDelete', currentBikeId, function(error, result) {
				if (error)
					console.log(error);

				Router.go('home');
			});
		}
	}
});