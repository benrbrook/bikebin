s3Upload = function(e, files, id) {
	S3.upload({
    	files: files,
    	path: "s3"
	}, function(e, image) {
		console.log("S3.upload");
        if (e) {
        	console.log(e);
        } else {
            // Go to bike
			console.log("Success");
			// Update the url
			Meteor.call('imageUrlUpdate', id, image.secure_url, function(error, result) {
				if (error)
					console.log(error.reason)
			});
            // Insert image
            Images.insert(image);
        }
	});
}