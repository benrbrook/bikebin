Template.bike.helpers({
	// Creates the shareable link (currently the localhost url)
	shareLink: function() {
		return Router.current().route.path(this);
	},
	ownPost: function() {
		return this.userId === Meteor.userId();
	}
});