// сервер
const SERVER_URL = 'http://localhost:3000'

// создаем нового клиента на сервере
export async function serverAddClient(obj) {
  let response = await fetch(SERVER_URL + '/api/clients', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(obj),
  });

  if (response.ok) {
    let data = await response.json();
    return data;
  } else {
    let data = await response.json();
    return {
      error: response.status,
      errors: data.errors,
      message: data.message,
    };
  }
}

// получаем список клиентов из сервера
export async function serverGetClients() {
  let response = await fetch(SERVER_URL + '/api/clients', {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  })

  let data = await response.json();
  return data;
}

// получаем список клиентов из сервера по фильтру
export async function serverGetFilterClients(str) {
  let response = await fetch(SERVER_URL + '/api/clients?search=' + str, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  })

  let data = await response.json();
  return data;
}

// получаем клиента из сервера
export async function serverGetOneClient(id) {
  let response = await fetch(SERVER_URL + '/api/clients/' + id, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  })

  let data = await response.json();
  return data;
}

// изменяем клиента на сервере
export async function serverPatchClient(id, name, surename, lastName, contacts) {
  let response = await fetch(SERVER_URL + '/api/clients/' + id, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: name,
      surname: surename,
      lastName: lastName,
      contacts: contacts,
    }),
  })

  if (response.ok) {
    let data = await response.json();
    return data;
  } else {
    let data = await response.json();
    return {
      error: response.status,
      errors: data.errors,
      message: data.message,
    };
  }
}

// удаляем клиента на сервере
export async function serverDeleteClient(id) {
  let response = await fetch(SERVER_URL + '/api/clients/' + id, {
    method: 'DELETE',
  })

  let data = await response.json();
  return data;
}
