Template.layout.events({
	'click #logout': function(e) {
		e.preventDefault();

		Meteor.logout();
		Router.go('home');
	},
	'click #account': function(e) {
		e.preventDefault();

		Router.go('accountPage', {userId: Meteor.userId()});
	}
});

Template.layout.helpers({
	currentYear: function() {
		var d = new Date();
		return d.getFullYear();
	}
});