$("#more-menu-icon").click(function() {
	$('.menu.extra').css('display', 'inline-block');
});

$('#hamburger-menu-button').click(function() {
	$(".mobile-categories-menu").toggleClass('mobile-menu-show');
});

$('#mobile-cat-menu-close').click(function() {
	$(".mobile-categories-menu").toggleClass('mobile-menu-show');
});

$('#mobile-menu-profile-button').click(function() {
	$('#mobile-member-menu').toggleClass('mobile-menu-show');
});

$('#mobile-menu-profile-close').click(function() {
	$('#mobile-member-menu').toggleClass('mobile-menu-show');
});

$('#trial').collapse('toggle');
