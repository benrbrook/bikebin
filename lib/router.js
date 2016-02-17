// Router default templates
Router.configure({
	layoutTemplate: 'layout',
	loadingTemplate: 'spinner',
	notFoundTemplate: 'notFound'
});

// Home path and template
Router.route('home', {
	path: '/', 
	waitOn: function() {
		return [
			Meteor.subscribe('featuredBikes'),
			Meteor.subscribe('newestBikes')
		];
	},
	data: function() {
		return Bikes.find();
	}
});

// Explore
Router.route('explore', {
	path: '/explore',
	waitOn: function() {
		return Meteor.subscribe('allBikes')
	},
	data: function() {
		return Bikes.find()
	}
});

// Popular
Router.route('popular', {
	path: '/popular',
	waitOn: function() {
		return Meteor.subscribe('allBikes')
	},
	data: function() {
		return Bikes.find()
	}
});

// Login path
Router.route('login', {
	path: '/login'
});

// Registration path
Router.route('registration', {
	path: '/registration'
});

Router.route('accountPage', {
	path: '/account/:userId',
	waitOn: function() {
		return [
			Meteor.subscribe('ownedBikes', Meteor.userId()),
			Meteor.subscribe('account', Meteor.userId())
		];
	},
	data: function() {
		return Bikes.find({userId: Meteor.userId()});
	}
});

// Add path and tempalte
Router.route('bikeAdd', {
	path: '/add_bike'
});

// Specific bike path, template, and collection specificateions
Router.route('bike', {
	path: 'bike/:_id',
	waitOn: function() {
		return [
			Meteor.subscribe('bike', this.params._id),
			Meteor.subscribe('comments', this.params._id),
		];
	},
	data: function() {
		return Bikes.findOne(this.params._id);
	}
});

// Specific bike edit path, template, and collection specificateions
Router.route('bikeEdit', {
	path: '/bike/:_id/edit',
	waitOn: function() {
		return Meteor.subscribe('bike', this.params._id);
	},
	data: function() {
		return Bikes.findOne(this.params._id);
	}
});

// Specific bike owned path, template, and collection specificateions
Router.route('bikesOwned', {
	path: '/your_bikes',
	waitOn: function() {
		return Meteor.subscribe('ownedBikes', Meteor.userId());
	},
	data: function() {
		Bikes.find({userId: Meteor.userId()});
	}
});

// Login is checked and specific access template is returned
var requireLogin = function() {
  if (!Meteor.user()) {
    if (Meteor.loggingIn()) {
      this.render(this.loadingTemplate);
    } else {
      this.render('accessDenied');
    }
  } else {
    this.next();
  }
}

// Checks before render
Router.onBeforeAction('dataNotFound', {only: 'bike'});
Router.onBeforeAction(requireLogin, {only: ['bikeAdd', 'bikeEdit', 'bikesOwned']});