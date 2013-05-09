$(document).ready(function() {

	/* Disable caching of AJAX responses */
	$.ajaxSetup ({cache: false});

	/* Default front page */
	$('#dyn-content').load('profile.htm #content', function() {
		$(this).fadeIn('slow');
		Init();

		$('body').scrollspy('refresh');
	}).hide();

	/* Click nav buttons and pages are changed correspondingly */
	$('.nav-page-btn').click(function(event) {
		event.preventDefault();

		if($(this).hasClass('disabled'))
			return;

		if($(this).hasClass('active'))
			return;

		/* Switch navbar active status */
		$('.nav-page-btn, li.active').removeClass('active');
		$(this).addClass('active');

		/* Ajax for loding pages */
		var page = $(this).attr('id').toString();
		if($(this).hasClass('research'))
			var load_content = 'research/' + page + '.htm #content';
		else
			var load_content = $(this).attr('id').toString() + '.htm #content';

		$('#dyn-content').fadeOut('fast', function(){
			$(this).load(load_content, function(){ 			
				$(this).fadeIn('fast');
				Init();

				$('body').scrollspy('refresh');
			});			
		});	

	});

});

var response_div_top = '<div class="response-top-tag" style="padding-top:20px; text-align: right;"><a href="">Top</a></div>';
var contact_gap = 20;

function Init()
{
	/* Functions to be initialised every time when the new content load in */
	$('body a').attr('target', '_blanket');	
	$('section').css('margin-bottom', $(window).height());
	
	$('a[data-toggle=tooltip]').tooltip();	

	$('.dummy-link').on('click', function(event) {
		event.preventDefault();
	});

	$('.contact').offset({ top: ($('.affix').offset().top + $('.affix').height() + contact_gap) });
	$('.contact').css('width', $('.contact').parent().width());

	/* Firefox scrollspy fixing */					
	scrollHeight = $(document).height();

	$('html, body').animate({
		scrollTop: $( $('#nav-side li.active a').attr('href') ).offset().top
	}, 500);

	$('#nav-side li a').click(function(){
		$('html, body').animate({
			scrollTop: $( $.attr(this, 'href') ).offset().top
		}, 500);
		return false;
	});

	if($(window).width() <= 979) // response mode
	{		
		$('#nav-side li.active').removeClass('active');

		$('section .response-top-tag').remove();
		$('section').append(response_div_top);
		$('.response-top-tag').click(function(){
			$('html, body').animate({
				scrollTop: $('#nav-side').offset().top
			}, 500);
			return false;
		});
	}
	else{	// normal mode		
		$('section .response-top-tag').remove();
	}	
}

/* When window is resized, dynamic components have to be adjusted accordingly */
$(window).resize(function() {
	if($(window).width() <= 979)	// response model
	{		
		$('#nav-side li.active').removeClass('active');		
		
		$('section .response-top-tag').remove();
		$('section').append(response_div_top);
		$('.response-top-tag').click(function(){
			$('html, body').animate({
				scrollTop: $('#nav-side').offset().top
			}, 500);
			return false;
		});
	}
	else{	// normal mode		
		$('section .response-top-tag').remove();
	}

	$('.contact').offset({ top: ($('.affix').offset().top + $('.affix').height() + contact_gap) });
	$('.contact').css('width', $('.contact').parent().width());
	$('section').css('margin-bottom', $(window).height());

	$('body').scrollspy('refresh');

});

$(window).scroll(function() {

	if($(window).width() <= 979)
		$('#nav-side li.active').removeClass('active');	

	$('.contact').offset({ top: ($('.affix').offset().top + $('.affix').height() + contact_gap) });
	$('.contact').css('width', $('.contact').parent().width());
	$('section').css('margin-bottom', $(window).height());

});