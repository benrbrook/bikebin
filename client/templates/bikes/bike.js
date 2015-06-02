Template.bike.helpers({
	shareLink: function() {
		return Router.current().route.path(this);
	},
	ownPost: function() {
		return this.userId === Meteor.userId();
	}
});