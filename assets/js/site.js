$(function() {
  // init smooth scrolling
  smoothScroll.init();

  // "to top" Button
  var evalToTop = function() {
    var offset = $(window).height() * 0.5;
    var buttons = $(".to-top");
    var duration = 200;

    if ($(this).scrollTop() > offset) {
      buttons.fadeIn(duration);
    } else {
      buttons.fadeOut(duration);
    }
  };
  $(window).scroll(evalToTop);
  evalToTop();
});
