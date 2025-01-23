// импорт функции отрисовки таблицы
import { renderClientsTable } from './renderClientsTable.js';
// импорт массива объектов клиентов
import { clientsList } from './main.js';

// вспомогательные переменные для сортировки
let sortColumnFlag = ' ';
let sortDirFlag = true;

// сортировка по колонкам в обе стороны
export function sortClientsList(copyArr) {
  copyArr.sort(function (a, b) {
    let sort = a[sortColumnFlag] > b[sortColumnFlag];
    if (sortDirFlag === false) {
      sort = a[sortColumnFlag] < b[sortColumnFlag];
    }
    if (sort) {
      return -1;
    }
  })
}

// добавление события на кнопки сортировки
export function sortEvent(btn, prop) {
  btn.addEventListener('click', () => {
    sortColumnFlag = prop;
    sortDirFlag = !sortDirFlag;

    if (sortDirFlag === false) {
      btn.querySelector('.arrow').classList.add('rotate-arrow');
    } else {
      btn.querySelector('.arrow').classList.remove('rotate-arrow');
    }

    if (btn.querySelector('.letters-fio')) {
      if (sortDirFlag === false) {
        btn.querySelector('.letters-fio').innerHTML = 'А-Я';
      } else {
        btn.querySelector('.letters-fio').innerHTML = 'Я-А';
      }
    }

    renderClientsTable(clientsList);
  });
}
