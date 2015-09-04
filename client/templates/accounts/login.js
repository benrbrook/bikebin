Template.login.events({
	'submit #login-form': function(e, t) {
		e.preventDefault();

		// Get inputs
		var email = t.find('#login-email').value;
		var password = t.find('#login-password').value;

		// Trim and validation...

		// Send data to Meteor Accounts
		Meteor.loginWithPassword(email, password, function(err) {
			if (err) {
				// Do something
				toastr.error("Bad login something-or-other");
			} else {
				// User is logged in
				Router.go('home');
			}
		});

		return false;
	}
});