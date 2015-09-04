Template.registerHelper('ownPost', function() {
	return this.userId === Meteor.userId();
});

Template.registerHelper('loggedIn', function() {
	return Meteor.userId();
});

Template.registerHelper('currentUsername', function() {
	if (Meteor.loggingIn()) {
		return "Loading..."
	} else {
		return Meteor.user().emails[0].address;
	}
});

Template.registerHelper('authenticated', function() {
    return Meteor.user() || Meteor.loggingIn();
});