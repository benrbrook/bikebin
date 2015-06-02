Template.bikeEdit.events({
	'submit form': function(e) {
		e.preventDefault();

		var currentBikeId = this._id;

		var bikeProperties = {
			name: $(e.target).find('[name=name]').val()
		}; 

		Meteor.call('bikeEdit', bikeProperties, currentBikeId, function(error, result) {
			if (error)
				console.log(error.reason);

			Router.go('bike', {_id: result._id});
		});
	}
});