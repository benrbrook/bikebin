Accounts.onLogin(function() {
	Router.go('home');
});

Meteor.logout(function() {
	Router.go('home');
})