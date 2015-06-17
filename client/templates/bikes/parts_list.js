var arr = new ReactiveArray([
	{
		"name": "Frame",
		"placeholder": "Component"
	}
]);

Template.partsList.events({
	'click #btn-part-input-add': function() {
		console.log("button clicked");
	}
});

Template.partsList.helpers({
	inputs: function() {
		return arr.list();
	}
})