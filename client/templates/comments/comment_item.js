Template.commentItem.helpers({
	submittedText: function() {
		var currDate = this.submitted.getDate();
		var currMonth = this.submitted.getMonth();
		var currYear = this.submitted.getFullYear();
		var currHour = this.submitted.getHours();
		var a_p = "";
		if (currHour < 12) {
			a_p = "AM";
		} else {
			a_p = "PM";
		} if (currHour == 0) {
			currHour = 12;
		}
		if (currHour > 12) {
			currHour = currHour - 12;
		}

		var currMin = this.submitted.getMinutes();

		currMin = currMin + "";

		if (currMin.length == 1) {
			currMin = "0" + currMin;
		}

		var formattedTimestamp = 
			currMonth + "/" + currDate + "/" + currYear
			+ " at " + currHour + ":" + currMin + " " + a_p;
		return formattedTimestamp;
	}
});