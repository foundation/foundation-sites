$(document).ready(function() {
  $.ajax({
    url: "https://api.github.com/repos/zurb/foundation/commits",
    dataType: 'jsonp',
    success: function(json) {
		var latest = json.data[0],
			stamp = new Date(latest.commit.committer.date),
          	stampString = month[stamp.getMonth()] + ' ' + stamp.getDate() + ', ' + stamp.getFullYear();
		$('#github .description').text(latest.commit.message);
		$('#github .date').text(stampString);
		$('#github .commit').html('Commit ' + latest.sha + ' &raquo;');
		$('#github .commit').attr('href', "https://github.com/zurb/foundation/commit/" + latest.sha);
    } 
  });
  // $.ajax({
  //   url: "http://github.com/api/v2/json/repos/show/zurb/foundation/tags",
  //   dataType: 'jsonp',
  //   success: function(json) {
		// 	var tags = [];
		// 	for ( var key in json.tags ) {
		// 		tags.push(key)
		// 	}
		// 	$('#latestVersion').text(tags[tags.length - 1]);
  //   } 
  // });
	var month = new Array(12);
	month[0]="Jan";
	month[1]="Feb";
	month[2]="Mar";
	month[3]="Apr";
	month[4]="May";
	month[5]="Jun";
	month[6]="Jul";
	month[7]="Aug";
	month[8]="Sep";
	month[9]="Oct";
	month[10]="Nov";
	month[11]="Dec";
});
