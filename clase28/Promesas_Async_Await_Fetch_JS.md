# 📘 Guía de Promesas, Async/Await y Fetch en JavaScript

En JavaScript, muchas operaciones son **asíncronas**, es decir, no se ejecutan de inmediato (por ejemplo: esperar datos de un servidor, leer un archivo, usar temporizadores, etc.).

Inicialmente se usaban **callbacks**, pero podían causar el temido **Callback Hell**. Para solucionarlo, se introdujeron las **Promesas**, y luego `async/await`, que simplifican aún más el código.

---

## 🔹 1. ¿Qué es una Promesa?

Una **Promesa** es un objeto que representa el eventual resultado de una operación asíncrona.

Tiene tres estados:

1. **Pending** (pendiente) → la operación aún no terminó.
2. **Fulfilled** (resuelta) → la operación terminó con éxito.
3. **Rejected** (rechazada) → la operación falló.

### Ejemplo básico:

```javascript
// Creamos una promesa
const promesa = new Promise((resolve, reject) => {
    let exito = true;

    if (exito) {
        resolve("✅ Operación exitosa");
    } else {
        reject("❌ Ocurrió un error");
    }
});

// Consumimos la promesa
promesa
    .then((resultado) => console.log(resultado)) // si se resuelve
    .catch((error) => console.error(error)) // si se rechaza
    .finally(() => console.log("Proceso finalizado"));
```

📌 `.then()` maneja el éxito, `.catch()` los errores, y `.finally()` siempre se ejecuta.

---

## 🔹 2. Promesas con asincronía real

Simulemos una consulta a base de datos:

```javascript
function obtenerUsuario(id) {
    return new Promise((resolve, reject) => {
        console.log("Buscando usuario...");

        setTimeout(() => {
            if (id === 1) {
                resolve({ id: 1, nombre: "Ana" });
            } else {
                reject("Usuario no encontrado");
            }
        }, 2000);
    });
}

// Consumimos la promesa
obtenerUsuario(1)
    .then((usuario) => console.log("Usuario encontrado:", usuario))
    .catch((err) => console.error(err));
```

---

## 🔹 3. Async / Await

`async` y `await` son azúcar sintáctica para trabajar con promesas de forma más clara.

-   `async` convierte una función en asíncrona.
-   `await` detiene la ejecución hasta que la promesa se resuelva.

### Ejemplo:

```javascript
async function mostrarUsuario() {
    try {
        let usuario = await obtenerUsuario(1);
        console.log("Usuario:", usuario);
    } catch (error) {
        console.error("Error:", error);
    } finally {
        console.log("Consulta finalizada");
    }
}

mostrarUsuario();
```

📌 Esto hace lo mismo que `.then/.catch`, pero con un código más limpio y fácil de leer.

---

## 🔹 4. Fetch: obteniendo datos de una API

`fetch()` es una función nativa de JavaScript que devuelve una promesa y se usa para hacer **peticiones HTTP**.

### Ejemplo con `.then`:

```javascript
fetch("https://jsonplaceholder.typicode.com/users/1")
    .then((response) => response.json()) // convertimos la respuesta a JSON
    .then((data) => console.log("Usuario:", data))
    .catch((error) => console.error("Error en la petición:", error));
```

### Ejemplo con `async/await`:

```javascript
async function obtenerDatos() {
    try {
        let respuesta = await fetch(
            "https://jsonplaceholder.typicode.com/users/1"
        );
        let datos = await respuesta.json();
        console.log("Usuario:", datos);
    } catch (error) {
        console.error("Error en la petición:", error);
    }
}

obtenerDatos();
```

---

## 🔹 5. Encadenamiento de Promesas vs `async/await`

### Con `.then` (más difícil de leer):

```javascript
obtenerUsuario(1)
    .then((user) => {
        console.log("Usuario:", user);
        return fetch(
            "https://jsonplaceholder.typicode.com/posts?userId=" + user.id
        );
    })
    .then((res) => res.json())
    .then((posts) => console.log("Posts del usuario:", posts))
    .catch((err) => console.error(err));
```

### Con `async/await` (más legible):

```javascript
async function flujo() {
    try {
        let usuario = await obtenerUsuario(1);
        console.log("Usuario:", usuario);

        let res = await fetch(
            "https://jsonplaceholder.typicode.com/posts?userId=" + usuario.id
        );
        let posts = await res.json();

        console.log("Posts del usuario:", posts);
    } catch (error) {
        console.error("Error en el flujo:", error);
    }
}

flujo();
```

---

# ✅ Conclusión

-   **Promesas** permiten manejar la asincronía de forma más organizada que los callbacks.
-   **`async/await`** simplifica aún más el uso de promesas, haciendo el código más legible.
-   **`fetch`** es la herramienta nativa para obtener datos desde APIs en JavaScript.
-   Combinando estos conceptos podemos escribir código **asíncrono, limpio y fácil de mantener**.
