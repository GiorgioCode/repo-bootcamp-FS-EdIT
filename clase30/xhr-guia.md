# Guía Completa sobre XMLHttpRequest (XHR) en JavaScript

`XMLHttpRequest` (XHR) es una API incorporada en los navegadores que permite a los clientes de JavaScript realizar solicitudes HTTP a un servidor web sin necesidad de recargar la página. Aunque la API `Fetch` es más moderna y potente, entender XHR es fundamental para comprender las bases de la comunicación asíncrona en la web y para trabajar con código más antiguo.

Esta guía te mostrará cómo usar XHR paso a paso, con ejemplos detallados y comentados.

---

## 1. Pasos Fundamentales para una Solicitud XHR

El proceso para realizar una solicitud con XHR generalmente sigue estos cuatro pasos:

1.  **Crear una instancia de `XMLHttpRequest`**: El objeto que nos permitirá realizar la comunicación.
2.  **Configurar la solicitud**: Usando el método `.open()`, especificamos el método HTTP (GET, POST, etc.) y la URL del recurso.
3.  **Registrar un manejador de eventos**: Para saber cuándo la solicitud ha sido completada y procesar la respuesta del servidor.
4.  **Enviar la solicitud**: Usando el método `.send()`.

---

## 2. Entendiendo el Estado de la Operación

Para monitorear una solicitud XHR, dos propiedades son fundamentales: `readyState` y `status`.

### `xhr.readyState`

Esta propiedad indica el estado en el que se encuentra la solicitud. Pasa por 5 estados diferentes:

*   **0 (UNSENT)**: El cliente ha sido creado, pero el método `open()` aún no ha sido llamado.
*   **1 (OPENED)**: El método `open()` ha sido llamado. La solicitud está lista para ser enviada.
*   **2 (HEADERS_RECEIVED)**: El método `send()` ha sido llamado y las cabeceras y el estado de la respuesta ya están disponibles.
*   **3 (LOADING)**: La respuesta se está descargando; `responseText` contiene datos parciales.
*   **4 (DONE)**: La operación se ha completado. La respuesta completa del servidor ya está disponible.

### `xhr.status`

Esta propiedad contiene el código de estado HTTP de la respuesta del servidor. Solo está disponible cuando `readyState` es 3 o 4. Los códigos más comunes son:

*   **Respuestas Exitosas (2xx)**:
    *   `200 OK`: La solicitud fue exitosa. Es el código estándar para `GET`.
    *   `201 Created`: La solicitud fue exitosa y un nuevo recurso fue creado. Común para `POST`.
*   **Errores del Cliente (4xx)**:
    *   `400 Bad Request`: El servidor no pudo entender la solicitud.
    *   `403 Forbidden`: No tienes permiso para acceder a este recurso.
    *   `404 Not Found`: El recurso solicitado no fue encontrado en el servidor.
*   **Errores del Servidor (5xx)**:
    *   `500 Internal Server Error`: Ocurrió un error inesperado en el servidor.

### Ejemplo: Monitoreando el `readyState`

Este ejemplo te permite ver en la consola cómo cambia el `readyState` durante el ciclo de vida de la solicitud.

```javascript
const xhrMonitor = new XMLHttpRequest();

xhrMonitor.onreadystatechange = function() {
  // Este código se ejecutará cada vez que readyState cambie.
  console.log(`Estado cambiado: readyState = ${xhrMonitor.readyState}, status = ${xhrMonitor.status}`);

  // Cuando la operación finaliza, procesamos el resultado.
  if (xhrMonitor.readyState === 4) {
    if (xhrMonitor.status === 200) {
      console.log('Respuesta final recibida:', JSON.parse(xhrMonitor.responseText));
    } else {
      console.error('La solicitud finalizó con un error.');
    }
  }
};

// Iniciamos la configuración de la solicitud.
xhrMonitor.open('GET', 'https://jsonplaceholder.typicode.com/todos/1', true);

// Enviamos la solicitud para que comience el proceso.
xhrMonitor.send();
```

---

## 3. Ejemplo: Realizar una Solicitud `GET`

Una solicitud `GET` se utiliza para solicitar datos de un recurso específico. A continuación, vemos un ejemplo completo para obtener datos de un post de la API de pruebas [JSONPlaceholder](https://jsonplaceholder.typicode.com/).

### Código Completo (GET)

```javascript
// 1. Crear una nueva instancia del objeto XMLHttpRequest.
const xhr = new XMLHttpRequest();

// 2. Configurar la solicitud que queremos realizar.
// Parámetros de open():
//   - 'GET': El método HTTP que usaremos para la solicitud.
//   - URL: La dirección del recurso que queremos obtener.
//   - true: Indica que la solicitud será asíncrona (no bloqueará el resto del código).
xhr.open('GET', 'https://jsonplaceholder.typicode.com/posts/1', true);

// 3. Definir una función que se ejecutará cada vez que cambie el estado de la solicitud.
// El evento 'onreadystatechange' se dispara varias veces durante el ciclo de vida de la solicitud.
xhr.onreadystatechange = function () {
  // Verificamos si la solicitud se ha completado y ha sido exitosa.
  // readyState === 4 significa que la operación se ha completado.
  // status === 200 significa que la solicitud fue 'OK'.
  if (xhr.readyState === 4 && xhr.status === 200) {
    // La respuesta del servidor viene como un string en formato JSON.
    // Usamos JSON.parse() para convertir el string a un objeto de JavaScript.
    const data = JSON.parse(xhr.responseText);

    // Ahora podemos trabajar con los datos recibidos.
    console.log('Respuesta recibida (objeto):', data);
    console.log('Título del post:', data.title);
  } else if (xhr.readyState === 4) {
    // Si la solicitud se completó pero hubo un error (ej. status 404 o 500).
    console.error('Ocurrió un error con la solicitud. Estado:', xhr.status);
  }
};

// 4. Enviar la solicitud al servidor.
// Para las solicitudes GET, el método send() no lleva argumentos.
xhr.send();
```

---

## 4. Ejemplo: Realizar una Solicitud `POST`

Una solicitud `POST` se utiliza para enviar datos a un servidor para crear un nuevo recurso. En este ejemplo, enviaremos un nuevo post a la API.

### Código Completo (POST)

```javascript
// 1. Crear una nueva instancia del objeto XMLHttpRequest.
const xhrPost = new XMLHttpRequest();

// 2. Configurar la solicitud POST.
//   - 'POST': El método HTTP para enviar datos.
//   - URL: El endpoint donde se crearán los nuevos recursos.
//   - true: La solicitud es asíncrona.
xhrPost.open('POST', 'https://jsonplaceholder.typicode.com/posts', true);

// 3. Establecer la cabecera (header) de la solicitud.
// Esto es crucial para que el servidor sepa qué tipo de datos estamos enviando.
// En este caso, le decimos que enviaremos datos en formato JSON.
xhrPost.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');

// 4. Definir el objeto de JavaScript que queremos enviar.
const nuevoPost = {
  title: 'Mi Nuevo Post',
  body: 'Este es el contenido de mi post.',
  userId: 1,
};

// 5. Definir la función que manejará la respuesta del servidor.
xhrPost.onreadystatechange = function () {
  // Verificamos si la operación se completó.
  // Para una creación exitosa con POST, el status suele ser 201 (Created).
  if (xhrPost.readyState === 4 && xhrPost.status === 201) {
    // Convertimos la respuesta del servidor (que confirma la creación) a un objeto.
    const responseData = JSON.parse(xhrPost.responseText);

    // Mostramos la respuesta en la consola.
    console.log('Post creado exitosamente:', responseData);
  } else if (xhrPost.readyState === 4) {
    // Manejamos posibles errores.
    console.error('Error al crear el post. Estado:', xhrPost.status);
  }
};

// 6. Enviar la solicitud con los datos.
// Como estamos enviando datos, debemos pasarlos como argumento a send().
// Usamos JSON.stringify() para convertir nuestro objeto JavaScript a un string en formato JSON.
xhrPost.send(JSON.stringify(nuevoPost));
```

---

## 5. Alternativas Modernas: La API `Fetch`

Aunque XHR es funcional, la sintaxis puede ser verbosa. La **API `Fetch`** es la alternativa moderna, basada en Promesas, que simplifica enormemente la realización de solicitudes HTTP.

### Ejemplo `GET` con `Fetch`

```javascript
fetch('https://jsonplaceholder.typicode.com/posts/1')
  .then(response => response.json()) // Convierte la respuesta a JSON
  .then(data => console.log('Datos con Fetch:', data)) // Trabaja con los datos
  .catch(error => console.error('Error con Fetch:', error)); // Maneja errores
```

La API `Fetch` es más legible, flexible y es el estándar recomendado para nuevas aplicaciones web. Sin embargo, conocer XHR sigue siendo valioso para entender los fundamentos y para mantener código existente.
