// Adds links to Building Blocks from the ZURB library to each component page

!function() {
  
$.ajax({
  url: 'http://zurb.com/library/api/building_blocks/type/buttons',
  dataType: 'jsonp',
  success: addBuildingBlocks
});

function addBuildingBlocks(data) {
  var html = '';

  $.each(data, function() {
    html += '<div class="column"><a href="http://zurb.com/building-blocks/'+this.slug+'"><p>'+this.name+'</p><img src="'+this.image_url+'"/></a></div>';
  });

  $('[data-building-blocks]').each(function() {
    $(this).html(html);
  });

  if ($('[data-building-blocks] .column').length === 0) {
    $('.docs-building-blocks').hide(0);
  }
}

}()