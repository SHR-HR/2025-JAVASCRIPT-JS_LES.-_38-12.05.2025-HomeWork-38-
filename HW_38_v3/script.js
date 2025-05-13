$(document).ready(function () {
  $('.owl-carousel').owlCarousel({
    items: 1, // Показываем одну картинку
    loop: true,
    margin: 20,
    nav: true,
    dots: true,
    autoplay: true,
    autoplayTimeout: 4000,
    autoplayHoverPause: true
  });

  Fancybox.bind("[data-fancybox='gallery']", {
    Toolbar: {
      display: ['zoom', 'close']
    },
    Thumbs: {
      autoStart: true
    }
  });
});



