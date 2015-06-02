Template.bikeAdd.events({
	'submit form': function(e) {
		e.preventDefault();

		var bikeProperties = {
			name: $(e.target).find('[name=name]').val()
		}

		Meteor.call('bikeInsert', bikeProperties, function(error, result) {
			if (error)
				console.log(error.reason);

			Router.go('bike', {_id: result._id});
		});
	}
});