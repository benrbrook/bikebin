Router.configure({
	layoutTemplate: 'layout'
});

Router.route('home', {
	path: '/'
});

Router.route('addBike', {
	path: '/add_bike'
});

Router.route('bike', {
	path: '/bike'
})

Router.route('bikeEdit', {
	path: '/bike/edit'
})