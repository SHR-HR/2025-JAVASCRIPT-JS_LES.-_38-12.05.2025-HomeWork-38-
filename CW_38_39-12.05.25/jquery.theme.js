(function ($) {
  $.fn.theme = function (options) {
    const defaults = {
      color: 'red',
      fontSize: '16px',
      fontWeight: 'medium'
    };

    const settings = $.extend({}, defaults, options);

    return this.each(function () {
      $(this).css({
        color: settings.color,
        fontSize: settings.fontSize,
        fontWeight: settings.fontWeight
      });
    });
  };
})(jQuery);
