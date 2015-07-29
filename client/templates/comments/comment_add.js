Template.commentAdd.events({
	'submit form': function(e, template) {
		e.preventDefault();

		var $body = $(e.target).find('[name=body]');
		var comment = {
			body: $body.val(),
			bikeId: template.data._id
		};

		Meteor.call('commentInsert', comment, function(error, commentId) {
			if (error)
				throwError(error.reason);
			else
				$body.val('');
		});
	}
});