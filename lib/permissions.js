// Returns true if the user owns the doc, false otherwise
ownsDocuemnt = function(userId, doc) {
	return doc && doc.userId === userId;
}