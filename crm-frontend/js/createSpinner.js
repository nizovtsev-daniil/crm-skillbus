// импорт svg спиннера
import { iconSpinner } from "./svg/iconSpinner.js";
// импорт обертки тела таблицы
import { $wrapperTable, $tableBody } from "./createElements.js";

// // функция отрисовки спиннера
export function createSpinner() {
  $wrapperTable.classList.add('wrapper-table-height');
  $tableBody.classList.add('blur');

  const $blockSpinner = document.createElement('div');
  $blockSpinner.classList.add('block-spinner');
  $blockSpinner.id = 'spinner';
  $blockSpinner.innerHTML = iconSpinner;

  $wrapperTable.append($blockSpinner)
}

// // функция удаления спиннера
export function deleteSpinner() {
  $wrapperTable.classList.remove('wrapper-table-height');
  $tableBody.classList.remove('blur');
  document.getElementById('spinner').remove();
}
