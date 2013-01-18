/** ==================================================================
 * available options:
 * - validate: true/false as to whether or not form 
 *    input can allow blank/whitespace only
 *    default is false (allow blank/whitespace)
================================================================== */

try {
	(function($){

		function flashMessage( wid , message){
			$('#widget_messages_'+wid)
				.text(message)
				.show( "slow" )
				.append( 
					$('<a/>' , {
						href: 'javascript:;'
						, text: '(close)'
						, title: 'close'
					})
					.addClass('small')
					.addClass('right')
					.click(function(ev){ $(this).parent().hide("fast"); })
				);
		}




		/* ============================================================ */
		/** !!! EDIT ME !!!
		 * what should the widget do when button-clicked? 
		 * - params:
		 * -- wid (id of widget to pull from
		 * -- val (content passed from widget text box)
		 */
		function widgetHandler( wid , val ){
			var msg = ">> SUBMIT (" + wid + ") -- '" + val + "' <<";
			//console.log(msg);
			flashMessage(wid,msg,3);
		}
		/* ============================================================ */




		// "Global" vars and util functions
		var uid = 1;	
		var util = { 
			mkid: function(){ return uid++; } 
		};
		// plugin architecture:
		$.fn.Widget = function(options) {
		
			// set up some defaults for the plugin options
			var options = $.extend({
							validate : false
						} , options);
						
			return this.each(function(){
				var $this = $(this);
				var wid=util.mkid();
				$this
					.addClass('Widget')
					.append(
						$('<form/>' , {
							id: 'widget_form_'+wid
							, name: 'widget_form_'+wid
						})
							.addClass('widget_form')
							.submit(function(ev){ 
								var val = $('#widget_input_'+wid).val();
								// if we are supposed to validate input and there is a blank:
								if( options.validate && !val) {
									flashMessage(wid,"Please check your input.");
									return false;
								} 
								else
									widgetHandler( wid , val ); 
								return false; 
							})
							.append( $('<input/>' , {
									title:'Input Search'
									, type: 'text'
									, placeholder: 'search'
									, id: 'widget_input_'+wid
									, name: 'widget_input_'+wid }) )
									.addClass('widget_input')
							.append( $('<input/>' , {
									type: 'submit'
									, value: 'Search'
									, id: 'widget_button_'+wid
									, name: 'widget_button_'+wid }) )
									.addClass('widget_button')
							.append( $("<br/>") )
							.append( 
								$("<div/>" , { 
									id:"widget_messages_"+wid 
									, name:"widget_messages_"+wid } )
									.addClass("widget_messages")
									.css("display","none")
							)
					)
					.show();
			});
		};
	})(jQuery);
} catch(err) { console.error( err ); }