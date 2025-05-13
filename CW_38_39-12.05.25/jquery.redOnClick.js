(function ($) {
  $.fn.redOnClick = function () {
    return this.each(function () {
      $(this).on('click', function () {
        $(this).css('color', 'red');
      });
    });
  };
})(jQuery);
