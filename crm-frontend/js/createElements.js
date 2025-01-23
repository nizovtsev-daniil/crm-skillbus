// svg файлы
import { arrowId } from './svg/arrowId.js';
import { arrowFio } from './svg/arrowFio.js';
import { arrowPostDate } from './svg/arrowPostDate.js';
import { arrowPatchDate } from './svg/arrowPatchDate.js';
import { addClient } from './svg/addClient.js';

// создание контейнера сайта
const $main = document.createElement('main');
$main.classList.add('main');

// создание контейнера шапки сайта
const $containerHeader = document.createElement('div');
$containerHeader.classList.add('container', 'container-header');
// создание логотипа
const $linkLogo = document.createElement('a');
$linkLogo.classList.add('link-logo');
$linkLogo.href = '#';
const $logoImg = document.createElement('img');
$logoImg.classList.add('logo-img');
$logoImg.src = 'img/logo.svg';
$logoImg.alt = 'Логотип компании Skillbus';
// создание формы с инпутом для поиска
export const $formFilter = document.createElement('form');
$formFilter.classList.add('form-filter');
export const $inputFilter = document.createElement('input');
$inputFilter.classList.add('input-filter');
$inputFilter.type = 'text';
$inputFilter.placeholder = 'Введите запрос';

$linkLogo.append($logoImg);
$formFilter.append($inputFilter);
$containerHeader.append($linkLogo, $formFilter);

// создание контейнера тела сайта
const $containerMain = document.createElement('div');
$containerMain.classList.add('container', 'container-main');
// создание заголовка таблицы
const $titleTable = document.createElement('h2');
$titleTable.classList.add('title-table');
$titleTable.textContent = 'Клиенты';

// создание обертки тела таблицы
export const $wrapperTable = document.createElement('div');
$wrapperTable.classList.add('wrapper-table');

// создание шапки таблицы
const $tableClients = document.createElement('table');
$tableClients.classList.add('table-clients');
const $tableHead = document.createElement('thead');
$tableHead.classList.add('table-head');

const $headTR = document.createElement('tr');
// ячейка id
const $idTH = document.createElement('th');
$idTH.classList.add('th-sort', 'th-id');
export const $btnSortID = document.createElement('button');
$btnSortID.classList.add('btn-sort');
$btnSortID.innerHTML = 'ID' + ' ' + arrowId;
// ячейка фио
const $fioTH = document.createElement('th');
$fioTH.classList.add('th-sort', 'th-fio');
const $lettersFIO = document.createElement('span');
$lettersFIO.classList.add('letters-fio');
$lettersFIO.textContent = 'А-Я';
export const $btnSortFIO = document.createElement('button');
$btnSortFIO.classList.add('btn-sort');
$btnSortFIO.innerHTML = 'Фамилия Имя Отчество' + ' ' + arrowFio + ' ';
$btnSortFIO.append($lettersFIO);
// ячейка даты создания
const $datePostTH = document.createElement('th');
$datePostTH.classList.add('th-sort', 'th-date');
export const $btnSortPostDate = document.createElement('button');
$btnSortPostDate.classList.add('btn-sort');
$btnSortPostDate.innerHTML = 'Дата и время создания' + ' ' + arrowPostDate;
// ячейка даты изменения
const $datePatchTH = document.createElement('th');
$datePatchTH.classList.add('th-sort', 'th-date');
export const $btnSortPatchDate = document.createElement('button');
$btnSortPatchDate.classList.add('btn-sort');
$btnSortPatchDate.innerHTML = 'Последние изменения' + ' ' + arrowPatchDate;
// ячейка контакты
const $contactsTH = document.createElement('th');
$contactsTH.classList.add('th-sort', 'th-contacts');
$contactsTH.textContent = 'Контакты';
// ячейка действия
const $actionTH = document.createElement('th');
$actionTH.classList.add('th-sort', 'th-action');
$actionTH.textContent = 'Действия';

$idTH.append($btnSortID);
$fioTH.append($btnSortFIO);
$datePostTH.append($btnSortPostDate);
$datePatchTH.append($btnSortPatchDate);
$headTR.append($idTH, $fioTH, $datePostTH, $datePatchTH, $contactsTH, $actionTH);
$tableHead.append($headTR);

// создание тела таблицы
export const $tableBody = document.createElement('tbody');
$tableBody.classList.add('table-body');

$tableClients.append($tableHead, $tableBody);
$wrapperTable.append($tableClients);

// создание кнопки для добавления клиента
const $wrapperBtn = document.createElement('div');
$wrapperBtn.classList.add('wrapper-btn');
const $textBtnAddClient = document.createElement('span');
$textBtnAddClient.textContent = 'Добавить клиента';
export const $btnAddClient = document.createElement('button');
$btnAddClient.classList.add('btn', 'btn-add-client');
$btnAddClient.innerHTML = addClient;

$btnAddClient.append($textBtnAddClient);
$wrapperBtn.append($btnAddClient);

$containerMain.append($titleTable, $wrapperTable, $wrapperBtn);
$main.append($containerHeader, $containerMain);
document.body.append($main);


