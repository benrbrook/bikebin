Template.accountPage.helpers({
	// Returns a collection containing all the bikes owned
	// by the logged in user
	bikes: function() {
		return Bikes.find({userId: Meteor.userId()});
	},
	user: function() {
		return Meteor.users.find({_id: Meteor.userId});
	},
	options: function() {
		return {
			type: 'text',
	    	async: true,
	    	position: 'top',
	    	value: Session.get('text'),
	    	emptyText: "Add your location",
	    	onsubmit: function(val, cb) {
        		Session.set('text', val);
        		cb();
	  		}
		};
	}
});
