Template.bike.helpers({
	shareLink: function() {
		return Router.current().route.path(this);
	}
});