var $ = require('jquery');
$(".dropdown").on('click', function() {
    var $dropdown = $(".dropdown");

    if ($dropdown.hasClass("open"))
	$dropdown.removeClass("open");
    else
	$dropdown.addClass("open");
});


