$(document).ready(function () {
	var month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
	$.ajax({
		url: "https://api.github.com/repos/zurb/foundation/commits",
		dataType: 'jsonp',
		success: function (json) {
			var latest = json.data[0],
				stamp = new Date(latest.commit.committer.date),
		      	stampString = month[stamp.getMonth()] + ' ' + stamp.getDate() + ', ' + stamp.getFullYear();
			$('#github .description').text(latest.commit.message);
			$('#github .date').text(stampString);
			$('#github .commit').html('Commit ' + latest.sha + ' &raquo;');
			$('#github .commit').attr('href', "https://github.com/zurb/foundation/commit/" + latest.sha);
		} 
	});
	$.ajax({
		dataType: 'jsonp',
		url: 'https://api.github.com/repos/zurb/foundation?callback=foundationGithub',
		success: function (response) {
			var watchers = (Math.round((response.data.watchers / 100), 10) / 10).toFixed(1);
			$('.watchers').html(watchers + 'k<small></small>');
		}
	});
});
