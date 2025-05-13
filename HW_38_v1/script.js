// Ждём полной загрузки DOM перед выполнением кода
$(document).ready(function () {

  // ============================
  // ИНИЦИАЛИЗАЦИЯ OWL CAROUSEL
  // ============================

  $('.owl-carousel').owlCarousel({
    items: 1,               // Показывать по одному изображению
    loop: true,             // Бесконечный цикл слайдов
    margin: 10,             // Отступ между элементами
    nav: true,              // Включить стрелки навигации
    dots: true,             // Включить точки-индикаторы
    autoplay: true,         // Автоматическая прокрутка
    autoplayTimeout: 4000,  // Интервал автопрокрутки (в мс)
    autoplayHoverPause: true, // Пауза при наведении на слайд
    navText: [
      '<span class="owl-prev">&#10094;</span>', // Символ «‹»
      '<span class="owl-next">&#10095;</span>'  // Символ «›»
    ],
    // ✅ Фикс: всегда только по 1 изображению
    responsive: {
      0: {
        items: 1
      },
      600: {
        items: 1
      },
      1000: {
        items: 1
      }
    }
  });

  // ============================
  // ИНИЦИАЛИЗАЦИЯ FANCYBOX 3
  // ============================

  // Подключаем FancyBox ко всем ссылкам с data-fancybox="gallery"
  $('[data-fancybox="gallery"]').fancybox({
    buttons: [
      "zoom",        // Кнопка увеличения
      "slideShow",   // Автосмена картинок
      "thumbs",      // Миниатюры
      "close"        // Закрыть
    ],
    animationEffect: "zoom",     // Эффект при открытии
    transitionEffect: "fade",    // Плавный переход между слайдами
    animationDuration: 400,      // Скорость анимации (мс)
    transitionDuration: 300      // Скорость переключения (мс)
  });

});

