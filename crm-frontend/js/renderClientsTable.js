// импорт инпута поиска, тела таблицы
import { $inputFilter, $tableBody } from './createElements.js';
// импорт функции отрисовки спиннера
import { createSpinner } from './createSpinner.js';
// импорт функции удаления спиннера
import { deleteSpinner } from './createSpinner.js';
// импорт функций преобразования свойства клиента (фио и даты)
import { getFIO, getDateString } from './transformClientProperty.js';
// импорт функции создания одного клиента в таблице
import { getClientItem } from './getClientItem.js';
// импорт функции создания нового клиента на сервере
import { serverGetClients } from './functionServer.js';
// импорт функции получения списка клиентов из сервера по фильтру
import { serverGetFilterClients } from './functionServer.js';
// импорт функции сортировки списка клиентов
import { sortClientsList } from './sortClientsList.js';


// отрисовка всех клиентов из списка
export async function renderClientsTable(clientsArray) {
  // появление спиннера
  createSpinner();

  if ($inputFilter.value === '') {
    //массив объектов клиентов на сервере
    let serverData = await serverGetClients();
    // проверяем наличие данных на сервере
    if (serverData) {
      clientsArray = serverData;
    }
  } else {
    //фильтрованный массив объектов клиентов на сервере
    let serverDataFilter = await serverGetFilterClients($inputFilter.value.trim());
    // проверяем наличие данных на сервере
    if (serverDataFilter) {
      clientsArray = serverDataFilter;
    }
  }

  // создаем копию массива объектов клиентов
  let copyClientsList = [...clientsArray];

  // преобразуем свойства клиентов
  for (const client of copyClientsList) {
    client.fio = getFIO(client);
    client.createdDate = getDateString(client.createdAt);
    client.updatedDate = getDateString(client.updatedAt);
  }

  // сортировка списка в обе стороны
  sortClientsList(copyClientsList);

  // очищаем тело таблицы
  $tableBody.innerHTML = '';

  // добавляем клиентов в таблицу
  for (const client of copyClientsList) {
    $tableBody.append(getClientItem(client));
  }

  // удаление спиннера
  deleteSpinner();
}
