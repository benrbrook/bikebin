Template.bike.helpers({
	// Creates the shareable link (currently the localhost url)
	shareLink: function() {
		return Router.current().route.path(this);
	},
	// Updates the class to change the star glyphcon
	starredGlyph: function() {
		var userId = Meteor.userId();
		if (userId && !_.include(this.starUsers, userId)) {
			return '-empty';
		} else {
			return '';
		}
	},
	// Returns the comments on the bike
	comments: function() {
		return Comments.find({bikeId: this._id});
	}
});

Template.bike.events({
	'click #btn-bike-star': function(e) {
		e.preventDefault();
    	Meteor.call('star', this._id);
	}
});