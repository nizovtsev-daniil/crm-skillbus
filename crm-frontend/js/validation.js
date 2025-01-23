// валидация
export function validation(form) {
  // находим и удаляем ошибки
  function removeError(input) {
    const parent = input.parentNode;
    if (parent.classList.contains('error') || parent.classList.contains('error-delete')) {
      parent.classList.remove('error');
      parent.classList.remove('error-delete');
      document.getElementById('errorList').querySelector('.error-message').remove();
    }
  }

  // добавление ошибки
  function createError(input, text) {
    const parent = input.parentNode;
    parent.classList.add('error');
    const errorMessage = document.createElement('li');
    errorMessage.classList.add('error-message');
    errorMessage.textContent = text;

    document.getElementById('errorList').append(errorMessage);
  }

  let result = true;

  // проверка инпутов на условия
  form.querySelectorAll('input').forEach(input => {
    // вначале очищаем от ошибок
    removeError(input);

    // проверяем фамилию на пустоту
    if (input.dataset.requiredSurname === 'true') {
      if (input.value.trim() === '') {
        removeError(input);
        createError(input, 'Поле "Фамилия" не заполнено');
        result = false;
      }
    }

    // проверяем имя на пустоту
    if (input.dataset.requiredName === 'true') {
      if (input.value.trim() === '') {
        removeError(input);
        createError(input, 'Поле "Имя" не заполнено');
        result = false;
      }
    }

    // проверяем контакт на пустоту
    if (input.dataset.requiredContact === 'true') {
      let selectValue = input.parentNode.querySelector('select').value;

      if (input.value.trim() === '') {
        removeError(input);
        createError(input, `Поле "Данные контакта - ${selectValue}" не заполнено`);
        result = false;
        return
      }
    }
  });

  return result;
}
