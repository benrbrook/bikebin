Template.registration.events({
	'submit #registration-form': function(e, t) {
		e.preventDefault();

		var email = t.find('#account-email').value;
		var password = t.find('#account-password').value;

		// Trim and validate input

		// Create a user
		Accounts.createUser({email: email, password: password}, function(err) {
			if (err) {
				toastr.error("Bad creation something-or-other");
			} else {
				// Account created
				Router.go('home');
			}
		});

		return false;
	}
});