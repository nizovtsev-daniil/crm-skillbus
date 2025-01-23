import { iconDeleteContact } from './svg/iconDeleteContact.js';

// функция создания формы нового контакта в модальном окне
export function addNewContact(type = null, value = null) {
  // проверяем количество контактов
  if (document.getElementById('wrappContacts').querySelectorAll('.wrapp-new-contact').length === 9) {
    document.getElementById('btnAddContact').classList.add('btn-hide');
  }

  // создаем элементы
  const $wrappNewContact = document.createElement('div');
  $wrappNewContact.classList.add('wrapp-new-contact');
  // селект
  const $selectContact = document.createElement('select');
  $selectContact.classList.add('select-contact', 'js-choice');

  let arrayTypeContacts = ['Телефон', 'Email', 'Facebook', 'VK', 'Другое'];

  for (let i = 0; i < arrayTypeContacts.length; i++) {
    const $option = document.createElement('option');
    $option.classList.add('option-contact');
    $option.value = arrayTypeContacts[i];
    $option.textContent = arrayTypeContacts[i];

    if(arrayTypeContacts[i] === type) {
      $option.selected = true;
    }

    $selectContact.append($option);
  }

  // инпут
  const $inputContact = document.createElement('input');
  $inputContact.classList.add('input-contact');
  $inputContact.type = 'text';
  $inputContact.dataset.requiredContact = 'true';
  $inputContact.placeholder = 'Введите данные контакта';
  $inputContact.value = value;
  // кнопка удаления контакта
  const $btnDeleteContact = document.createElement('button');
  $btnDeleteContact.classList.add('btn-delete-contact');
  $btnDeleteContact.type = 'button';
  $btnDeleteContact.innerHTML = iconDeleteContact;

  // удаление контакта при нажатии на кнопку
  $btnDeleteContact.addEventListener('click', () => {
    $wrappNewContact.remove();
    // удаление отступов
    if (!document.getElementById('wrappContacts').querySelector('div')) {
      document.getElementById('wrappContacts').classList.remove('wrapp-contacts-mb');
      document.getElementById('contactBlock').classList.remove('contact-block-mb');
    }
    // проверяем количество контактов
    if (document.getElementById('wrappContacts').querySelectorAll('.wrapp-new-contact').length <= 9) {
      document.getElementById('btnAddContact').classList.remove('btn-hide');
    }
  });

  $wrappNewContact.append($selectContact, $inputContact);

  document.getElementById('wrappContacts').append($wrappNewContact);

  const choices = new Choices($selectContact, { allowHTML: true, searchEnabled: false, itemSelectText: '', shouldSort: false, position: 'bottom', });

  // добавление и удаление кнопки удаления контакта, удаление ошибки валидации при вводе
  $inputContact.addEventListener('input', () => {
    $wrappNewContact.append($btnDeleteContact);

    if ($inputContact.value === '') {
      $btnDeleteContact.remove();
    }

    if ($wrappNewContact.classList.contains('error')) {
      $wrappNewContact.classList.remove('error');
      $wrappNewContact.classList.add('error-delete');
    }
  });

  // добавление кнопки удаления контакта если инпут заполнен
  if ($inputContact.value !== '') {
    $wrappNewContact.append($btnDeleteContact);
  }

  // подсказка на кнопку удаления контакта
  const tippybtn = tippy($btnDeleteContact, {
    content: '<span class="tippy-btn">Удалить контакт</span>',
    allowHTML: true,
  })

  // добавление отступов
  if (document.getElementById('wrappContacts').querySelector('div')) {
    document.getElementById('wrappContacts').classList.add('wrapp-contacts-mb');
    document.getElementById('contactBlock').classList.add('contact-block-mb');
  }
}
