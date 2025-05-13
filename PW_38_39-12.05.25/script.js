$(document).ready(function () {
  // === 1. Получаем доступ к нужным элементам DOM ===
  const contactsList = $('#contacts-list');    // Список контактов (левая секция)
  const phoneInput = $('#phone-input');        // Поле ввода номера телефона (правая секция)
  const callBtn = $('#call-btn');              // Кнопка "Позвонить"
  const endBtn = $('#end-btn');                // Кнопка "Завершить"
  const timerDisplay = $('#timer-display');    // Отображение времени звонка (внизу центральной секции)
  const chatArea = $('#chat-area');            // Область сообщений от контактов (центральная секция)

  // === 2. Применение плагина InputMask ===
  // Маска заставляет пользователя вводить номер в формате: +7(XXX)XXX-XX-XX
  $('#phone-input').inputmask("+7(999)999-99-99");

  // === 3. Загрузка списка контактов с API jsonplaceholder ===
  // Используется jQuery.ajax для GET-запроса по URL с данными юзеров
  $.ajax({
    url: 'https://jsonplaceholder.typicode.com/users', // API
    method: 'GET',
    success: function (users) {
      // Обработка полученного массива пользователей
      users.forEach(user => {
        // Из имени создаем инициалы (первые буквы имён и фамилий)
        const initials = user.name
          .split(' ')           // Разбиваем имя на слова
          .map(w => w[0])       // Берём первую букву каждого
          .join('')             // Склеиваем
          .toUpperCase()        // Делаем заглавными
          .slice(0, 2);         // Только 2 символа (если их больше)

        // Создание элемента контакта — li с вложенными div
        const item = $(`
          <li class="contact-item" data-phone="${user.phone}">
            <div style="display: flex; align-items: center;">
              <div class="avatar">${initials}</div> <!-- Аватар с инициалами -->
              <div>
                <strong>${user.name}</strong><br>
                <small>${user.email}</small>
              </div>
            </div>
          </li>
        `);

        // Добавляем в DOM — в UL
        contactsList.append(item);
      });
    },
    error: function () {
      // Если не получилось получить данные — выводим уведомление Toast
      toastr.error("❌ Не удалось загрузить контакты.");
    }
  });

  // === 4. При нажатии на контакт ===
  // - Берётся номер телефона
  // - Вставляется в input
  // - Отображаются сообщения в центральной секции
  contactsList.on('click', '.contact-item', function () {
    const number = $(this).data('phone');             // Номер из data-phone
    const name = $(this).find('strong').text();       // Имя контакта

    phoneInput.val(number);      // Вставляем номер в поле ввода
    chatArea.empty();            // Очищаем "чат"

    // Добавляем два фиктивных "сообщения", будто бы от контакта
    chatArea.append(`<div class="message-other">Привет, я ${name}</div>`);
    setTimeout(() => {
      chatArea.append(`<div class="message-other">Как дела?</div>`);
    }, 1000); // второе сообщение появляется с задержкой 1 секунду
  });

  // === 5. Создаём экземпляр таймера с помощью EasyTimer ===
  const timer = new easytimer.Timer();

  // === 6. Запуск звонка ===
  // - Проверка, что номер не пустой
  // - Уведомление через Toast
  // - Старт таймера и обновление экрана
  callBtn.on('click', function () {
    const number = phoneInput.val().trim(); // Убираем пробелы

    if (!number) {
      toastr.warning('⚠️ Введите номер телефона!');
      return;
    }

    toastr.success(`📞 Звонок на ${number}`); // Уведомление

    timer.reset(); // Сброс предыдущего времени
    timer.start(); // Запуск нового таймера

    // Обновление текста таймера при каждом обновлении секунд
    timer.addEventListener('secondsUpdated', function () {
      timerDisplay.text(timer.getTimeValues().toString());
    });
  });

  // === 7. Завершение звонка ===
  endBtn.on('click', function () {
    timer.stop(); // Остановка таймера
    timerDisplay.text("00:00"); // Сброс отображения
    toastr.info("❌ Звонок завершён"); // Уведомление
  });

  // === 8. Набор цифр через кнопки ===
  // При клике на любую кнопку с классом `.key`
  // цифра добавляется в поле ввода номера
  $('.key').on('click', function () {
    const digit = $(this).text();         // Получаем цифру с кнопки
    const current = phoneInput.val();     // Текущий ввод
    phoneInput.val(current + digit);      // Добавляем цифру
  });
});


