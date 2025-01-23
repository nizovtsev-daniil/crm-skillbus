// импорт формы и инпута поиска
import { $formFilter, $inputFilter } from './createElements.js';
// импорт функции отрисовки таблицы
import { renderClientsTable } from './renderClientsTable.js';
// импорт массива объектов клиентов
import { clientsList } from './main.js';

 // добавляем фильтрацию
 export function filterClientsList() {
   let timer = null;
   $formFilter.addEventListener('submit', (e) => {
     e.preventDefault();
   });
   $inputFilter.addEventListener('input', () => {
     clearTimeout(timer);
     timer = setTimeout(() => {
       renderClientsTable(clientsList);
     }, 300);
   });
 }
