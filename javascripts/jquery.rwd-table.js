/* Scripts for the tables test page 
	Original author: Maggie Wachs, www.filamentgroup.com
	Rewrite: Stanislav Kurinec
   Date: January 2012
   Dependencies: jQuery, Foundation
*/


new function( $ ) {
	
	$.fn.table = function (options) {
		var defaults = {
			idprefix: null,// specify a prefix for the id/headers values
			persist: null,// specify a class assigned to column headers (th) that should always be present; the script not create a checkbox for these columns
			checkContainer: null // container element where the hide/show checkboxes will be inserted; if none specified, the script creates a menu
		};
		var options = $.extend({}, defaults, options);
 
		// Set up the widget
		return this.each(function () {
			var self = $(this),
			o = options,
			table = $(this),
			thead = $(this).find("thead"),
			tbody = $(this).find("tbody"),
			hdrCols = thead.find("th"),
			bodyRows = tbody.find("tr"),
			container = o.checkContainer ? $(o.checkContainer) : $('<ul class="flyout small right" />');         
			// add class for scoping styles - cells should be hidden only when JS is on
			table.addClass("enhanced");
      
			hdrCols.each(function(i){
				var th = $(this),
				id = th.attr("id"), 
				classes = th.attr("class");
         
				// assign an id to each header, if none is in the markup
				if (!id) {
					id = ( o.idprefix ? o.idprefix : "col-" ) + i;
					th.attr("id", id);
				}
         
				// assign matching "headers" attributes to the associated cells
				// TEMP - needs to be edited to accommodate colspans
				bodyRows.each(function(){
					var cell = $(this).find("th, td").eq(i);                        
					cell.attr("headers", id);	
					if (classes) {
						cell.addClass(classes);
					}
				});     
         
				// create the hide/show toggles
				if ( !th.is("." + o.persist) ) {
					var toggle = $('<li><input type="checkbox" name="toggle-cols" id="toggle-col-'+i+'" value="'+id+'" /> <label for="toggle-col-'+i+'">'+th.text()+'</label></li>');
	         
					container.append(toggle);         
	         
					toggle.find("input")
					.change(function(){
						var input = $(this), 
						val = input.val(), 
						cols = $("#" + val + ", [headers="+ val +"]");
						if (input.is(":checked")) {
							cols.show();
						}
						else {
							cols.hide();
						}		
					})
					.bind("updateCheck", function(){
						if ( th.css("display") ==  "table-cell") {
							$(this).attr("checked", true);
						}
						else {
							$(this).attr("checked", false);
						}
						return true;
					})
					.trigger("updateCheck");  
				}          
               
			}); // end hdrCols loop 
      
			// update the inputs' checked status
			$(window).bind("orientationchange resize", function(){
				container.find("input").trigger("updateCheck");
			});      
            
			// if no container specified for the checkboxes, create a "Display" menu      
			if (!o.checkContainer) {
				var menuWrapper = $('<div class="table-menu row"><ul class="nav-bar right"><li class="has-flyout"></li></ul></div>'),
				menuBtn = $('<a href="#" class="table-menu-btn">Display</a>');
				menuWrapper.find('.has-flyout').append(menuBtn).append(container);
				table.before(menuWrapper);
         
				// assign click-to-close event
				$(document).click(function(e){								
					if ( !$(e.target).is( container ) && !$(e.target).is( container.find("*") ) ) {			
						container.addClass("table-menu-hidden");
					}				
				});
			}   
              
		}) // end _create
	} 
}( jQuery );
