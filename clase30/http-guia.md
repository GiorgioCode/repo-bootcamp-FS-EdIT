# Guía Fundamental sobre el Protocolo HTTP

**HTTP (Hypertext Transfer Protocol)** es el protocolo de comunicación que forma la base de la World Wide Web. Define un conjunto de reglas para que los clientes (como los navegadores web) y los servidores se comuniquen entre sí, permitiendo la transferencia de datos como documentos HTML, imágenes, APIs y otros recursos.

---

## 1. El Modelo Cliente-Servidor

HTTP funciona siguiendo un modelo de **solicitud-respuesta** (request-response) entre dos entidades:

*   **Cliente**: Es quien inicia la comunicación. Generalmente es un navegador web (Chrome, Firefox, etc.), pero puede ser cualquier programa que necesite obtener un recurso de un servidor (como una app móvil o un script).
*   **Servidor**: Es quien espera y responde a las solicitudes del cliente. Generalmente es una máquina que aloja sitios web, aplicaciones o APIs.

El flujo es simple:
1.  El cliente envía una **solicitud HTTP** al servidor.
2.  El servidor procesa la solicitud.
3.  El servidor devuelve una **respuesta HTTP** al cliente.

HTTP es un protocolo **sin estado** (*stateless*), lo que significa que cada solicitud es independiente y el servidor no guarda información sobre las solicitudes anteriores del mismo cliente. Para mantener sesiones de usuario (por ejemplo, para saber si un usuario ha iniciado sesión), se utilizan técnicas como las cookies.

---

## 2. Métodos HTTP (Verbos)

Los métodos HTTP, a menudo llamados "verbos", indican la acción que el cliente desea realizar sobre un recurso específico. Los más comunes son:

*   **`GET`**: **Obtener datos**. Se utiliza para solicitar un recurso del servidor. Es la operación más común en la web. No debe modificar datos en el servidor.
    *   *Ejemplo*: Cargar una página web, obtener una lista de productos.

*   **`POST`**: **Enviar datos para crear un recurso**. Se utiliza para enviar datos al servidor, generalmente para crear una nueva entidad.
    *   *Ejemplo*: Enviar un formulario de registro, publicar un nuevo artículo en un blog.

*   **`PUT`**: **Actualizar un recurso existente**. Se utiliza para reemplazar completamente un recurso en el servidor con los datos enviados.
    *   *Ejemplo*: Editar el perfil completo de un usuario.

*   **`PATCH`**: **Actualizar parcialmente un recurso**. Similar a `PUT`, pero solo modifica una parte del recurso, no lo reemplaza por completo.
    *   *Ejemplo*: Cambiar solo el nombre de un usuario sin afectar su correo electrónico.

*   **`DELETE`**: **Eliminar un recurso**. Se utiliza para borrar un recurso específico en el servidor.
    *   *Ejemplo*: Borrar una foto o un comentario.

*   **`HEAD`**: Similar a `GET`, pero solo solicita las **cabeceras** de la respuesta, sin el cuerpo. Es útil para verificar si un recurso existe o para obtener metadatos sin descargar el contenido completo.

*   **`OPTIONS`**: Describe las opciones de comunicación para el recurso de destino. Se usa a menudo en el contexto de **CORS** (Cross-Origin Resource Sharing) para que el navegador pregunte al servidor qué métodos y cabeceras están permitidos.

---

## 3. Estructura de un Mensaje HTTP

Tanto las solicitudes como las respuestas comparten una estructura similar.

### Estructura de una Solicitud HTTP

```http
GET /posts/1 HTTP/1.1
Host: jsonplaceholder.typicode.com
User-Agent: Mozilla/5.0
Accept: application/json

```
1.  **Línea de Inicio (Start-Line)**: Contiene:
    *   El método HTTP (`GET`).
    *   La ruta del recurso (`/posts/1`).
    *   La versión de HTTP (`HTTP/1.1`).

2.  **Cabeceras (Headers)**: Pares clave-valor que proporcionan información adicional sobre la solicitud. `Host` es la única cabecera obligatoria en HTTP/1.1.

3.  **Cuerpo (Body)**: Es opcional y contiene los datos que se envían al servidor (por ejemplo, con `POST` o `PUT`). En una solicitud `GET`, el cuerpo está vacío.

### Estructura de una Respuesta HTTP

```http
HTTP/1.1 200 OK
Content-Type: application/json; charset=utf-8
Content-Length: 292

{
  "userId": 1,
  "id": 1,
  "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
  "body": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum..."
}
```
1.  **Línea de Estado (Status-Line)**: Contiene:
    *   La versión de HTTP (`HTTP/1.1`).
    *   El código de estado (`200`).
    *   El mensaje de estado (`OK`).

2.  **Cabeceras (Headers)**: Pares clave-valor que describen la respuesta. `Content-Type` indica el tipo de dato del cuerpo.

3.  **Cuerpo (Body)**: Contiene el recurso solicitado (HTML, JSON, imagen, etc.).

---

## 4. Códigos de Estado HTTP

Los códigos de estado son números de 3 dígitos que indican el resultado de la solicitud. Se agrupan en cinco clases:

*   **`1xx` (Respuestas informativas)**: La solicitud fue recibida y el proceso continúa.
*   **`2xx` (Respuestas exitosas)**: La solicitud fue recibida, entendida y aceptada con éxito.
    *   `200 OK`: Éxito estándar.
    *   `201 Created`: Recurso creado.
    *   `204 No Content`: Éxito, pero no hay contenido para devolver.
*   **`3xx` (Redirecciones)**: Se necesita tomar una acción adicional para completar la solicitud.
    *   `301 Moved Permanently`: El recurso se ha movido a una nueva URL permanente.
    *   `302 Found`: El recurso se encuentra temporalmente en otra URL.
*   **`4xx` (Errores del cliente)**: La solicitud contiene una sintaxis incorrecta o no puede ser procesada.
    *   `400 Bad Request`: Solicitud malformada.
    *   `401 Unauthorized`: Se requiere autenticación.
    *   `403 Forbidden`: El cliente no tiene permiso para acceder al contenido.
    *   `404 Not Found`: El servidor no pudo encontrar el recurso solicitado.
*   **`5xx` (Errores del servidor)**: El servidor falló al intentar cumplir una solicitud aparentemente válida.
    *   `500 Internal Server Error`: Un error genérico del servidor.
    *   `503 Service Unavailable`: El servidor no está listo para manejar la solicitud (por sobrecarga o mantenimiento).