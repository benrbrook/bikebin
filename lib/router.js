Router.configure({
	layoutTemplate: 'layout',
	loadingTemplate: 'spinner',
	notFoundTemplate: 'notFound'
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
		return Meteor.subscribe('bike', this.params._id);
	},
	data: function() {
		return Bikes.findOne(this.params._id);
	}
});

Router.route('bikeEdit', {
	path: '/bike/:_id/edit',
	waitOn: function() {
		return Meteor.subscribe('bike', this.params._id);
	},
	data: function() {
		return Bikes.findOne(this.params._id);
	}
});

Router.route('bikesOwned', {
	path: '/your_bikes',
	waitOn: function() {
		return Meteor.subscribe('ownedBikes', Meteor.userId());
	},
	data: function() {
		Bikes.find({userId: Meteor.userId()});
	}
});

var requireLogin = function() {
  if (! Meteor.user()) {
    if (Meteor.loggingIn()) {
      this.render(this.loadingTemplate);
    } else {
      this.render('accessDenied');
    }
  } else {
    this.next();
  }
}

Router.onBeforeAction('dataNotFound', {only: 'bike'});
Router.onBeforeAction(requireLogin, {only: 'bikeAdd'});