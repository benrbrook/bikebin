Template.registerHelper('trimInput', function(val) {
	return val.replace(/^s*|\s*$/g, "");
});