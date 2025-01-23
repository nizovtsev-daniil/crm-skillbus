// преобразуем и возвращаем ФИО
export function getFIO(client) {
  let name = client.name;
  client.name = name.substring(0, 1).toUpperCase() + name.substring(1).toLowerCase();
  let surname = client.surname;
  client.surname = surname.substring(0, 1).toUpperCase() + surname.substring(1).toLowerCase();
  let lastName = client.lastName;
  client.lastName = lastName.substring(0, 1).toUpperCase() + lastName.substring(1).toLowerCase();
  return client.surname + ' ' + client.name + ' ' + client.lastName;
}

// преобразуем и возвращаем дату
export function getDateString(clientDate) {
  let date = new Date(clientDate);
  const yyyy = date.getFullYear();
  let mm = date.getMonth() + 1;
  let dd = date.getDate();
  let hh = date.getHours();
  let min = date.getMinutes();

  if (mm < 10) {
    mm = '0' + mm;
  }
  if (dd < 10) {
    dd = '0' + dd;
  }

  if (hh < 10) {
    hh = '0' + hh;
  }
  if (min < 10) {
    min = '0' + min;
  }

  return `${dd}.${mm}.${yyyy}  <span class="td-time">${hh}:${min}</span>`;
}
