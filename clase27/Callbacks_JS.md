# 📘 Guía de Callbacks en JavaScript

En JavaScript, un **callback** es una función que se pasa como argumento a otra función y que se ejecuta después de que la función principal haya terminado su tarea.

👉 Son muy útiles para manejar la **asincronía** (operaciones que no se ejecutan de inmediato, como peticiones a un servidor o temporizadores).

---

## 🔹 1. Definición básica de Callback

Un callback no es más que una función que se pasa como **parámetro** y se ejecuta dentro de otra.

```javascript
// Definimos una función que recibe un callback
function procesarUsuario(nombre, callback) {
    console.log("Procesando usuario:", nombre);

    // Llamamos al callback con el nombre como parámetro
    callback(nombre);
}

// Definimos un callback
function saludar(usuario) {
    console.log(`¡Hola, ${usuario}! Bienvenido.`);
}

// Pasamos la función como callback
procesarUsuario("Juan", saludar);
```

📌 Salida en consola:

```
Procesando usuario: Juan
¡Hola, Juan! Bienvenido.
```

---

## 🔹 2. Callback como función anónima

Podemos definir el callback directamente como una **función anónima**:

```javascript
procesarUsuario("Ana", function (usuario) {
    console.log(`Creando registro para ${usuario}...`);
});
```

---

## 🔹 3. Callbacks y asincronía

Un uso común de los callbacks es trabajar con **temporizadores** o tareas que tardan en completarse.

```javascript
console.log("Inicio del programa");

// Usamos setTimeout con un callback
setTimeout(function () {
    console.log("Esto se ejecuta después de 2 segundos");
}, 2000);

console.log("Fin del programa");
```

📌 Salida:

```
Inicio del programa
Fin del programa
Esto se ejecuta después de 2 segundos
```

➡️ El callback dentro de `setTimeout` se ejecuta **después** de que pasan 2 segundos, sin detener el resto del código.

---

## 🔹 4. Ejemplo práctico: simulando una base de datos

Supongamos que queremos obtener datos de una “base de datos” (simulada con `setTimeout`):

```javascript
function obtenerUsuario(id, callback) {
    console.log("Buscando usuario en la base de datos...");

    setTimeout(function () {
        let usuario = { id: id, nombre: "María" };
        callback(usuario); // Se llama al callback cuando termina la operación
    }, 3000);
}

// Usamos el callback para manejar el resultado
obtenerUsuario(1, function (usuario) {
    console.log("Usuario encontrado:", usuario);
});
```

📌 El callback asegura que el código dentro de él solo se ejecute **cuando los datos estén listos**.

---

## 🔹 5. Problema de los callbacks: Callback Hell 😱

Cuando usamos muchos callbacks anidados, el código puede volverse difícil de leer y mantener. A esto se le llama **Callback Hell**:

```javascript
obtenerUsuario(1, function (usuario) {
    console.log("Usuario:", usuario);

    obtenerUsuario(2, function (usuario2) {
        console.log("Usuario:", usuario2);

        obtenerUsuario(3, function (usuario3) {
            console.log("Usuario:", usuario3);
            // Y así sucesivamente...
        });
    });
});
```

👉 Este problema se soluciona con **Promises** y `async/await`, pero es importante entender primero cómo funcionan los callbacks.

---

# ✅ Conclusión

-   Un **callback** es una función pasada como argumento que se ejecuta después de que otra función complete su tarea.
-   Se usan mucho en JavaScript para manejar **acciones asíncronas**.
-   Aunque son muy útiles, un uso excesivo puede llevar al **Callback Hell**, que hoy en día se resuelve con **Promises** y `async/await`.
