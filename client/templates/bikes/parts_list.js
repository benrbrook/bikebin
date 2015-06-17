var arr = new ReactiveArray([
	{
		"name": "Frame",
		"type": "CAAD10"
	}
]);

Template.partsList.events({
	'click #btn-part-input-add': function() {
		arr.push({
			"name": $('#part-name').val(),
			"type": $('#part-type').val()
		});
	}
});

Template.partsList.helpers({
	inputs: function() {
		return arr.list();
	}
})