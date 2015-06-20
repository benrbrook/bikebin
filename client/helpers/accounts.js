Accounts.onLogin(function() {
	if (Meteor.user()) {
		Router.go('home');
		pause();
	}
});
