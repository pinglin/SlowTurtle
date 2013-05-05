$(document).ready(function() {

	/* Disable caching of AJAX responses */
	$.ajaxSetup ({      
		cache: false  
	}); 

	/* Default front page */
	$('#dyn-content').load('profile.htm #content', function() {
		$(this).fadeIn('slow');
	}).hide();

	/* Click nav buttons and pages are changed correspondingly */
	$('.nav-page-btn').click(function(event) {
		event.preventDefault();

		/* Switch active status */
		$('.active').removeClass('active');
		$(this).addClass('active');

		if($(this).hasClass('dropdown') || $(this).hasClass('dropdown-toggle'))
			return;

		/* Ajax for loding pages */
		if($(this).hasClass('research'))
			var load_content = 'research/' + $(this).attr('id').toString() + '.htm #content';
		else
			var load_content = $(this).attr('id').toString() + '.htm #content';

		$('#dyn-content').fadeOut('fast', function(){
			$(this).load(load_content, function(){ 			
				$(this).fadeIn('fast');

				/* Functions to be initialised every time when the new content load in */
				$('body').scrollspy('refresh');
				$('a[data-toggle=tooltip]').tooltip();	
				$('.dummy-link').on('click', function(event) {
					event.preventDefault();
				});							

				/* Firefox scrollspy fixing */					
				scrollHeight = $(document).height();				

				$('a').click(function(){
				    $('html, body').animate({
				        scrollTop: $( $.attr(this, 'href') ).offset().top
				    }, 500);
				    return false;
				});

			});
		});	
	});

	/* Functions to be initialised every time when the new content load in */
	$('a[data-toggle=tooltip]').tooltip();	
	$('.dummy-link').on('click', function(event) {
		event.preventDefault();
	});	

	/* Firefox scrollspy fixing */								
	scrollHeight = $(document).height();

	$('a').click(function(){
	    $('html, body').animate({
	        scrollTop: $( $.attr(this, 'href') ).offset().top
	    }, 500);
	    return false;
	});

});