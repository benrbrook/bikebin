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
	},
	commentDelete: function(commentId) {
		check(this.userId, String);
		check(commentId, String);

		var user = Meteor.user();
		var bikeId = Comments.findOne(commentId).bikeId;

		if (!bikeId)
	    	throw new Meteor.Error('invalid-comment-delete', "This bike doesn't exist anymore!");
	    
	    // Delete and decrement
	    Comments.remove({_id: commentId, userId: user._id});
	    Bikes.update(bikeId, {$inc: {commentsCount: -1}});
	}
});