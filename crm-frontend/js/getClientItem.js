// импорт svg
import { iconPatchBtn } from './svg/iconPatchBtn.js';
import { iconDeleteBtn } from './svg/iconDeleteBtn.js';
import { iconPhone } from './svg/contacts/iconPhone.js';
import { iconEmail } from './svg/contacts/iconEmail.js';
import { iconFB } from './svg/contacts/iconFB.js';
import { iconVK } from './svg/contacts/iconVK.js';
import { iconOther } from './svg/contacts/iconOther.js';
import { iconSpinnerBtn } from './svg/iconSpinnerBtn.js';
// импорт функции создания модального окна
import { createModal } from './createModal.js';

// создаем и возвращаем список контактов
function createContactsList(contactsArray) {
  const $contactsList = document.createElement('ul');
  $contactsList.classList.add('contacts-list', 'list-reset');

  const $btnMoreContacts = document.createElement('btn');
  $btnMoreContacts.classList.add('btn-more-contacts');

  // массив для дополнительных контактов
  let arrayContactsItem = [];

  for (const contact of contactsArray) {
    const $contactsItem = document.createElement('li');
    $contactsItem.classList.add('contacts-item');

    const $contactLink = document.createElement('button');
    $contactLink.classList.add('contacts-link');

    // подсказки
    const tippyinst = tippy($contactLink, {
      content: `<span class="tippy-name">${contact.type}:
      <a class="tippy-link" href="#">${contact.value}</a></span>`,
      allowHTML: true,
      interactive: true,
    })

    // скрыть подсказку при переходе по tab
    tippyinst.popper.querySelector('a').addEventListener('blur', ()=>tippyinst.hide())

    switch (contact.type) {
      case 'Телефон':
        $contactLink.innerHTML = iconPhone;
        break;

      case 'Email':
        $contactLink.innerHTML = iconEmail;
        break;

      case 'Facebook':
        $contactLink.innerHTML = iconFB;
        break;

      case 'VK':
        $contactLink.innerHTML = iconVK;
        break;

      case 'Другое':
        $contactLink.innerHTML = iconOther;
        break;
    }

    if ($contactsList.querySelectorAll('.contacts-item').length < 4) {
      $contactsItem.append($contactLink);
      $contactsList.append($contactsItem);
    } else {
      $contactsItem.append($contactLink);
      arrayContactsItem.push($contactsItem);
    }
  }

  // кнопка с дополнительными контактами
  if (arrayContactsItem.length !== 0) {
    $btnMoreContacts.textContent = `+${arrayContactsItem.length}`;
    $contactsList.append($btnMoreContacts);

    $btnMoreContacts.addEventListener('click', () => {
      for (const contactItem of arrayContactsItem) {
        $contactsList.append(contactItem);
      }
      $btnMoreContacts.remove();
    });
  }

  return $contactsList;
}

// создаем и возвращаем одного клиента
export function getClientItem(clientObj) {
  const $clientTR = document.createElement('tr');
  $clientTR.classList.add('tr-body');
  const $idTD = document.createElement('td');
  $idTD.classList.add('td-body', 'td-id');
  const $fioTD = document.createElement('td');
  $fioTD.classList.add('td-body', 'td-fio');
  const $postTD = document.createElement('td');
  $postTD.classList.add('td-body', 'td-date');
  const $patchTD = document.createElement('td');
  $patchTD.classList.add('td-body', 'td-date');
  const $contactsTD = document.createElement('td');
  $contactsTD.classList.add('td-body', 'td-contacts');
  const $actionTD = document.createElement('td');
  $actionTD.classList.add('td-body', 'td-action');
  const $wrappAction = document.createElement('div');
  $wrappAction.classList.add('td-action-wrapp');
  const $btnPatch = document.createElement('button');
  $btnPatch.classList.add('td-btn', 'btn-patch-td');
  $btnPatch.innerHTML = iconPatchBtn + ' Изменить';
  const $btnDelete = document.createElement('button');
  $btnDelete.classList.add('td-btn', 'btn-delete-td');
  $btnDelete.innerHTML = iconDeleteBtn + ' Удалить';

  $idTD.textContent = clientObj.id;
  $fioTD.textContent = clientObj.fio;
  $postTD.innerHTML = clientObj.createdDate;
  $patchTD.innerHTML = clientObj.updatedDate;
  $contactsTD.append(createContactsList(clientObj.contacts));

  // событие на удаление контакта
  $btnPatch.addEventListener('click', async () => {
    $btnPatch.innerHTML = iconSpinnerBtn + ' Изменить';
    await createModal('patchClient', clientObj);
    $btnPatch.innerHTML = iconPatchBtn + ' Изменить';
  });

  // событие на удаление контакта
  $btnDelete.addEventListener('click', () => {
    createModal('deleteClient', clientObj);
  });

  $wrappAction.append($btnPatch, $btnDelete);
  $actionTD.append($wrappAction);
  $clientTR.append($idTD, $fioTD, $postTD, $patchTD, $contactsTD, $actionTD);
  return $clientTR;
}
