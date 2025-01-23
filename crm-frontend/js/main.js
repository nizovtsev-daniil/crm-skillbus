// импорт кнопок сортировки, кнопки добавления клиента
import { $btnSortID, $btnSortFIO, $btnSortPostDate, $btnSortPatchDate, $btnAddClient } from './createElements.js';
// импорт функции создания модального окна
import { createModal } from './createModal.js';
// импорт функции отрисовки таблицы
import { renderClientsTable } from './renderClientsTable.js';
// импорт функции сортировки списка клиентов
import { sortEvent } from './sortClientsList.js';
// импорт функции фильтрации списка клиентов
import { filterClientsList } from './filterClientsList.js';

// массив объектов клиентов
export let clientsList = [];

// запуск страницы
document.addEventListener('DOMContentLoaded', () => {
  // отрисовка таблицы клиентов
  renderClientsTable(clientsList);

  // добавляем фильтрацию
  filterClientsList();

  // добавляем событие по клику для сортировки
  sortEvent($btnSortID, 'id');
  sortEvent($btnSortFIO, 'fio');
  sortEvent($btnSortPostDate, 'createdAt');
  sortEvent($btnSortPatchDate, 'updatedAt');

  // событие на кнопку добавления нового клиента
  $btnAddClient.addEventListener('click', () => {
    createModal('addClient');
  });
});
