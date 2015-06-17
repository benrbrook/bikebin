Router.configure({
	layoutTemplate: 'layout'
});

Router.route('home', {
	path: '/'
});

Router.route('bikeAdd', {
	path: '/add_bike'
});

Router.route('bike', {
	path: 'bike/:_id',
	waitOn: function() {
		return Meteor.subscribe('bikes', this.params._id);
	},
	data: function() {
		return Bikes.findOne(this.params._id);
	}
});

Router.route('bikeEdit', {
	path: '/bike/:_id/edit',
	waitOn: function() {
		return Meteor.subscribe('bikes', this.params._id);
	},
	data: function() {
		return Bikes.findOne(this.params._id);
	}
});