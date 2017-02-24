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

// $(function() {
// 	var xhr;
// 	var select_state, $select_state;
// 	var select_city, $select_city;

// 	$select_state = $('#selector').selectize({
// 	    onChange: function(value) {
// 	        if (!value.length) return;
// 	        select_city.disable();
// 	        select_city.clearOptions();
// 	        select_city.load(function(callback) {
// 	            xhr && xhr.abort();
// 	            xhr = $.ajax({
// 	                url: 'https://jsonp.afeld.me/?url=http://api.sba.gov/geodata/primary_city_links_for_state_of/' + value + '.json',
// 	                success: function(results) {
// 	                    select_city.enable();
// 	                    callback(results);
// 	                },
// 	                error: function() {
// 	                    callback();
// 	                }
// 	            })
// 	        });
// 	    }
// 	});

// 	$select_city = $('#select-cities-city').selectize({
// 	    valueField: 'name',
// 	    labelField: 'name',
// 	    searchField: ['name']
// 	});

// 	select_city  = $select_city[0].selectize;
// 	select_state = $select_state[0].selectize;

// 	select_city.disable();
// });
