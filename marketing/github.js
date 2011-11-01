$(document).ready(function() {
  $.ajax({
    url: "http://github.com/api/v2/json/commits/list/zurb/foundation/master",
    dataType: 'jsonp',
    success: function(json) {
			var latest = json.commits[0],
			    stamp = new Date(latest.committed_date),
          stampString = month[stamp.getMonth()] + ' ' + stamp.getDate() + ', ' + stamp.getFullYear();
			$('#latestCommitMessage').text(latest.message);
			$('#latestCommitTime').text(stampString);
			$('#latestCommitURL').html('Commit ' + latest.id + ' &raquo;');
			$('#latestCommitURL').attr('href', "https://github.com" + latest.url);
    } 
  });
  $.ajax({
    url: "http://github.com/api/v2/json/repos/show/zurb/foundation/tags",
    dataType: 'jsonp',
    success: function(json) {
			var tags = [];
			for ( var key in json.tags ) {
				tags.push(key)
			}
			$('#latestVersion').text(tags[tags.length - 1]);
    } 
  });
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
