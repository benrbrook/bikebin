Template.registerHelper('ownPost', function() {
	return this.userId === Meteor.userId();
});

Template.registerHelper('loggedIn', function() {
	return Meteor.userId();
});