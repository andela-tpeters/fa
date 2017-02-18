$("#more-menu-icon").click(function() {
	$('.menu.extra').css('display', 'inline-block');
});

$('#hamburger-menu-button').click(function() {
	$(".menu-wrapper").toggleClass('hamburger-active');
});
