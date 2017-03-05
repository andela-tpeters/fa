//turn to inline mode
$.fn.editable.defaults.mode = 'inline';

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

$(document).ready(function() {
    $('#bio-description').editable({inputclass: 'twelve columns', rows: 50});
    $('#profile-info-email').editable({inputclass: 'twelve columns'});
    $('#profile-info-budiness-name').editable({inputclass: 'twelve columns'});
    $('#profile-info-budiness-address').editable({inputclass: 'twelve columns'});
    $('#profile-info-budiness-tax').editable({inputclass: 'twelve columns'});
    $('#profile-name').editable({inputclass: 'eight columns'});
});

$('#profile-show-more-button').click(function() {
    $('#sellers-profile-bio').toggleClass('sellers-profile-bio-show');
});

tinymce.init({
    selector: "#post-a-job-description",
    height: 200,
    menubar: false,
    content_css: 'js/tinymce/skins/lightray/content.min.css'
});
