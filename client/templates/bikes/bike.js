Template.bike.helpers({
	// Creates the shareable link (currently the localhost url)
	shareLink: function() {
		return Router.current().route.path(this);
	},
	ownPost: function() {
		return this.userId === Meteor.userId();
	},
	loggedIn: function() {
		return Meteor.userId();
	},
	// Updates the class to change the star glyphcon
	starredGlyph: function() {
		var userId = Meteor.userId();
		if (userId && !_.include(this.starUsers, userId)) {
			return '-empty';
		} else {
			return '';
		}
	}//,
	// starredDisabled: function() {
	// 	var userId = Meteor.userId();
	// 	if (userId && !_.include(this.starUsers, userId)) {
	// 		return '';
	// 	} else {
	// 		return 'disabled';
	// 	}
	// }
});

Template.bike.events({
	'click #btn-bike-star': function(e) {
		e.preventDefault();
    	Meteor.call('star', this._id);
	}
})