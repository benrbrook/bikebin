Comments = new Mongo.Collection('comments');

Meteor.methods({
	commentInsert: function(commentAttributes) {
		check(this.userId, String);
		check(commentAttributes, {
			bikeId: String,
			body: String
		});

		var user = Meteor.user();
	    var bike = Bikes.findOne(commentAttributes.bikeId);

	    if (!bike)
	    	throw new Meteor.Error('invalid-comment', 'You must comment on a post');
	    
	    comment = _.extend(commentAttributes, {
	    	userId: user._id,
	    	author: user.emails[0].address,
	    	submitted: new Date()
	    });
	    
	    // update the post with the number of comments
	    Bikes.update(comment.bikeId, {$inc: {commentsCount: 1}});
	    
	    comment._id = Comments.insert(comment);
	    return comment._id;
	}
});