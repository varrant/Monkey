$(".dropdown").on('click', function() {
    var $dropdown = $(".dropdown");
    $dropdown.hasClass("open") ? $dropdown.removeClass("open") : $dropdown.addClass("open");
});


