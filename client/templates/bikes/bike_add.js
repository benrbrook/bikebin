Template.bikeAdd.events({
	'click #btn-bike-create': function(e) {
		e.preventDefault();

		var bikeProperties = {
			name: $('#bike-name').val()
		}

		Meteor.call('bikeInsert', bikeProperties, function(error, result) {
			if (error)
				console.log(error.reason);

			Router.go('bike', {_id: result._id});
		});
	}
});