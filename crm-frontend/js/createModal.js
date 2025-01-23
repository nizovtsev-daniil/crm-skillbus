// импорт svg иконок
import { iconCloseModal } from './svg/iconCloseModal.js';
import { iconAddContactModal } from './svg/iconAddContactModal.js';
// импорт массива объектов клиентов
import { clientsList } from './main.js';
// импорт тела таблицы
import { $tableBody } from './createElements.js';
// импорт функции отрисовки таблицы
import { renderClientsTable } from './renderClientsTable.js';
// импорт функции создания формы нового контакта в модальном окне
import { addNewContact } from './addNewContact.js';
// импорт функции создания нового клиента на сервере
import { serverAddClient } from './functionServer.js';
// импорт функции удаления клиента на сервере
import { serverDeleteClient } from './functionServer.js';
// импорт функции получения клиента из сервера
import { serverGetOneClient } from './functionServer.js';
// импорт функции изменения клиента на сервере
import { serverPatchClient } from './functionServer.js';
// импорт функции валидации формы
import { validation } from './validation.js';


// создаем массив из объектов заполненных контактов в модальном окне
function getContactsList() {
  let contactsArray = document.querySelectorAll('.wrapp-new-contact');
  let contactsList = [];
  for (const contact of contactsArray) {
    if (contact.querySelector('.input-contact').value) {
      let select = contact.querySelector('.select-contact').value

      let input = contact.querySelector('.input-contact').value

      contactsList.push({ type: select, value: input });
    }
  }
  return contactsList;
}

// функция блокировки кнопок и инпутов
function disabledTrue(form) {
  let allBtn = form.querySelectorAll('button');
  for (const btn of allBtn) {
    btn.disabled = true;
  }

  let allInput = form.querySelectorAll('input');
  for (const input of allInput) {
    input.disabled = true;
  }
}

// функция разблокировки кнопок и инпутов
function disabledFalse(form) {
  let allBtn = form.querySelectorAll('button');
  for (const btn of allBtn) {
    btn.disabled = false;
  }

  let allInput = form.querySelectorAll('input');
  for (const input of allInput) {
    input.disabled = false;
  }
}


// основная функция создания модального окна
export async function createModal(action, clientObj = null) {
  // модальное окно
  const $modalWrapp = document.createElement('div');
  $modalWrapp.classList.add('modal-wrapp');
  const $modalBox = document.createElement('div');
  $modalBox.classList.add('modal-box');
  const $btnCloseModal = document.createElement('button');
  $btnCloseModal.classList.add('modal-btn-close');
  $btnCloseModal.innerHTML = iconCloseModal;

  // функция закрытия окна
  function closeModal() {
    $modalBox.classList.add('modal-delete');
    setTimeout(() => {
      $modalWrapp.remove();
    }, 500);
  }

  // закрытие окна по кнопке в углу
  $btnCloseModal.addEventListener('click', () => {
    closeModal();
  });

  // закрытие окна по кнопке esc
  document.addEventListener('keydown', (e) => {
    if (e.key == 'Escape') {
      closeModal();
    }
  });

  // закрытие по клику вне модального окна
  $modalWrapp.addEventListener('click', (e) => {
    const withInModal = e.composedPath().includes($modalBox);

    if (!withInModal) {
      if (confirm('Закрыть окно?')) {
        closeModal();
      }
    }
  })

  $modalBox.append($btnCloseModal);
  $modalWrapp.append($modalBox);

  // заголовок
  const $titleModal = document.createElement('h3');
  $titleModal.classList.add('modal-title');
  // форма
  const $modalForm = document.createElement('form');
  $modalForm.classList.add('modal-form');

  // блок с инпутами
  const $inputBlock = document.createElement('div');
  $inputBlock.classList.add('input-block');
  // инпут с фамилией
  const $wrappInputSurename = document.createElement('div');
  $wrappInputSurename.classList.add('input-wrapp');
  const $inputSurename = document.createElement('input');
  $inputSurename.classList.add('input-text');
  $inputSurename.type = 'text';
  $inputSurename.dataset.requiredSurname = 'true';
  $inputSurename.placeholder = ' ';
  const $placeholderSurename = document.createElement('label');
  $placeholderSurename.classList.add('input-placeholder');
  $placeholderSurename.textContent = 'Фамилия';
  const $starSurename = document.createElement('span');
  $starSurename.classList.add('star');
  $starSurename.textContent = '*';

  // при вводе удаляем ошибку валидации
  $inputSurename.addEventListener('input', () => {
    if ($wrappInputSurename.classList.contains('error')) {
      $wrappInputSurename.classList.remove('error');
      $wrappInputSurename.classList.add('error-delete');
    }
  })

  // инпут с именем
  const $wrappInputName = document.createElement('div');
  $wrappInputName.classList.add('input-wrapp');
  const $inputName = document.createElement('input');
  $inputName.classList.add('input-text');
  $inputName.type = 'text';
  $inputName.dataset.requiredName = 'true';
  $inputName.placeholder = ' ';
  const $placeholderName = document.createElement('label');
  $placeholderName.classList.add('input-placeholder');
  $placeholderName.textContent = 'Имя';
  const $starName = document.createElement('span');
  $starName.classList.add('star');
  $starName.textContent = '*';

  // при вводе удаляем ошибку валидации
  $inputName.addEventListener('input', () => {
    if ($wrappInputName.classList.contains('error')) {
      $wrappInputName.classList.remove('error');
      $wrappInputName.classList.add('error-delete');
    }
  })

  // инпут с отчеством
  const $wrappInputLastName = document.createElement('div');
  $wrappInputLastName.classList.add('input-wrapp');
  const $inputLastName = document.createElement('input');
  $inputLastName.classList.add('input-text');
  $inputLastName.type = 'text';
  $inputLastName.placeholder = ' ';
  const $placeholderLastName = document.createElement('label');
  $placeholderLastName.classList.add('input-placeholder');
  $placeholderLastName.textContent = 'Отчество';

  $placeholderSurename.append($starSurename);
  $wrappInputSurename.append($inputSurename, $placeholderSurename);
  $placeholderName.append($starName);
  $wrappInputName.append($inputName, $placeholderName);
  $wrappInputLastName.append($inputLastName, $placeholderLastName);
  $inputBlock.append($wrappInputSurename, $wrappInputName, $wrappInputLastName);

  // блок с контактами
  const $contactBlock = document.createElement('div');
  $contactBlock.classList.add('contact-block');
  $contactBlock.id = 'contactBlock';

  // список ошибок
  const $errorList = document.createElement('ul');
  $errorList.id = 'errorList';
  $errorList.classList.add('error-list', 'list-reset');

  // кнопка добавления контакта
  const $btnAddContact = document.createElement('button');
  $btnAddContact.classList.add('btn', 'btn-add-contact');
  $btnAddContact.id = 'btnAddContact';
  $btnAddContact.type = 'button';
  $btnAddContact.innerHTML = iconAddContactModal + ' Добавить контакт';

  // добавление новых контактов
  const $wrappContacts = document.createElement('div');
  $wrappContacts.classList.add('wrapp-contacts');
  $wrappContacts.id = 'wrappContacts';

  $contactBlock.append($wrappContacts, $btnAddContact);

  // кнопки сохранить, отмена/удалить
  const $wrappModalBtn = document.createElement('div');
  $wrappModalBtn.classList.add('modal-wrapp-btn');
  const $modalBtnSave = document.createElement('button');
  $modalBtnSave.classList.add('btn', 'modal-btn-save');
  const $modalBtnCancel = document.createElement('button');
  $modalBtnCancel.classList.add('modal-btn-cancel');
  $modalBtnCancel.type = 'button';

  $wrappModalBtn.append($modalBtnSave, $modalBtnCancel);

  // событие на кнопку добавления нового контакта
  $btnAddContact.addEventListener('click', () => {
    // создание контакта
    addNewContact();
    // прокрутка страницы при добавлении контакта
    $modalBtnCancel.scrollIntoView({ block: "end", behavior: "smooth" });
  });


  // создание модального окна для добавления НОВОГО клиента
  if (action === 'addClient') {
    $titleModal.textContent = 'Новый клиент';

    $modalBtnSave.textContent = 'Сохранить';
    $modalBtnCancel.textContent = 'Отмена';

    // закрытие окна по кнопке "Отмена"
    $modalBtnCancel.addEventListener('click', () => {
      closeModal();
    });

    // сохранение нового студента
    $modalForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      // удаляем сообщения об ошибках с сервера если они были
      if ($errorList.querySelector('.error-message-server')) {
        $errorList.querySelector('.error-message-server').remove();
      }

      if (validation($modalForm) === true) {
        // блокируем кнопки и инпуты во время ожидания ответа с сервера
        disabledTrue($modalForm);

        // создаем массив заполненных контактов
        let contactsList = getContactsList();

        // новый клиент
        let newClient = {
          name: $inputName.value.trim(),
          surname: $inputSurename.value.trim(),
          lastName: $inputLastName.value.trim(),
          contacts: contactsList,
        }

        // добавляем на сервер нового клиента
        let serverDataObj = await serverAddClient(newClient);

        // проверяем наличие ошибок в ответе с сервера
        if (!serverDataObj.error) {
          // добавляем нового клиента из сервера в массив
          clientsList.push(serverDataObj);

          // закрываем модальное окно
          closeModal();
          // отрисовка таблицы
          await renderClientsTable(clientsList);

          // прокрутка страницы при добавлении контакта
          $tableBody.scrollIntoView({ block: "end", behavior: "smooth" });
        } else {
          // разблокируем кнопки и инпуты
          disabledFalse($modalForm);

          // делаем сообщение об ошибке с сервера
          const message = document.createElement('li');
          message.classList.add('error-message-server');
          if (serverDataObj.message) {
            message.textContent = serverDataObj.message;
          } else {
            message.textContent = 'Что-то пошло не так...';
          }
          $errorList.append(message);
        }
      }
    });

    $modalForm.append($inputBlock, $contactBlock, $errorList, $wrappModalBtn);
    $modalBox.append($titleModal, $modalForm);
    document.body.append($modalWrapp);
  }


  // создание модального окна для ИЗМЕНЕНИЯ клиента
  if (action === 'patchClient') {
    // получаем клиента из сервера
    let serverClient = await serverGetOneClient(clientObj.id);

    $titleModal.innerHTML = `Изменить данные  <span class="title-id">ID: ${serverClient.id}</span>`;
    // заполняем инпуты
    $inputSurename.value = serverClient.surname;
    $inputName.value = serverClient.name;
    $inputLastName.value = serverClient.lastName;

    $modalBtnSave.textContent = 'Сохранить';
    $modalBtnCancel.textContent = 'Удалить клиента';

    $modalBtnCancel.addEventListener('click', async () => {
      if (confirm('Вы действительно хотите удалить данного клиента?')) {
        // удаляем клиента с сервера
        await serverDeleteClient(clientObj.id);

        // закрываем модальное окно
        closeModal();
        // отрисовка таблицы
        renderClientsTable(clientsList);
      }
    });

    $modalForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      // удаляем сообщения об ошибках с сервера если они были
      if ($errorList.querySelector('.error-message-server')) {
        $errorList.querySelector('.error-message-server').remove();
      }

      if (validation($modalForm) === true) {
        // блокируем кнопки и инпуты во время ожидания ответа с сервера
        disabledTrue($modalForm);

        // создаем массив из контактов после изменения
        let contactsList = getContactsList();

        // изменение клиента на сервере
        let serverData = await serverPatchClient(serverClient.id, $inputName.value, $inputSurename.value, $inputLastName.value, contactsList);

        // проверяем наличие ошибок в ответе с сервера
        if (!serverData.error) {
          // закрываем модальное окно
          closeModal();
          // отрисовка таблицы
          renderClientsTable(clientsList);
        } else {
          // разблокируем кнопки и инпуты
          disabledFalse($modalForm);

          // делаем сообщение об ошибке с сервера
          const message = document.createElement('li');
          message.classList.add('error-message-server');
          if (serverData.message) {
            message.textContent = serverData.message;
          } else {
            message.textContent = 'Что-то пошло не так...';
          }
          $errorList.append(message);
        }
      }
    });

    $modalForm.append($inputBlock, $contactBlock, $errorList, $wrappModalBtn);
    $modalBox.append($titleModal, $modalForm);
    document.body.append($modalWrapp);

    // заполняем контакты
    for (const contact of serverClient.contacts) {
      addNewContact(contact.type, contact.value);
    }
  }


  // создание модального окна для УДАЛЕНИЯ клиента
  if (action === 'deleteClient') {
    $modalBox.classList.add('modal-box-delete');

    $titleModal.classList.add('modal-title-mb');
    $titleModal.textContent = 'Удалить клиента';

    const $textModalDelete = document.createElement('p');
    $textModalDelete.classList.add('text-modal-delete');
    $textModalDelete.textContent = 'Вы действительно хотите удалить данного клиента?';

    $modalBtnSave.textContent = 'Удалить';
    $modalBtnCancel.textContent = 'Отмена';

    // удаление клиента
    $modalForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      // удаляем клиента с сервера
      await serverDeleteClient(clientObj.id);

      // закрываем модальное окно
      closeModal();
      // отрисовка таблицы
      renderClientsTable(clientsList);
    });

    // закрытие окна по кнопке "Отмена"
    $modalBtnCancel.addEventListener('click', () => {
      closeModal();
    });

    $modalForm.append($wrappModalBtn);
    $modalBox.append($titleModal, $textModalDelete, $modalForm);
    document.body.append($modalWrapp);
  }
}
