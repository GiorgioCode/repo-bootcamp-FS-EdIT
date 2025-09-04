# El Call Stack en JavaScript y Conceptos Relacionados

## 1. ¿Qué es el Call Stack?

El **Call Stack** (pila de llamadas) es una estructura de datos
utilizada por el motor de JavaScript (como V8 en Chrome o Node.js) para
llevar un registro del punto en el que se encuentra la ejecución del
programa.\
Funciona como una **pila (stack)** bajo el principio **LIFO** (Last In,
First Out).

Cuando se invoca una función: 1. Se agrega un **frame** (marco de
ejecución) al stack. 2. Cuando la función termina, ese frame se elimina
del stack. 3. El motor continúa con la siguiente tarea pendiente.

---

## 2. Ejemplo Simple

```javascript
function saludar() {
    console.log("Hola!");
}

function despedir() {
    console.log("Chau!");
}

function main() {
    saludar();
    despedir();
}

main();
```

**Proceso en el Call Stack:** 1. Se invoca `main()` → se agrega al
stack. 2. Dentro de `main()`, se llama a `saludar()` → se agrega al
stack. 3. `saludar()` ejecuta `console.log("Hola!")` → al terminar, se
quita `saludar()`. 4. Se ejecuta `despedir()` → entra al stack y luego
sale al finalizar. 5. Termina `main()` → se elimina del stack.

---

## 3. Stack Overflow

Un **stack overflow** ocurre cuando el call stack se llena debido a
demasiadas funciones anidadas o llamadas recursivas sin fin.

```javascript
function recursiva() {
    recursiva(); // Llamada infinita
}

recursiva(); // Provocará "Maximum call stack size exceeded"
```

---

## 4. Relación con el Event Loop

El **Call Stack** trabaja junto al **Event Loop** y la **Callback
Queue**.

-   **Call Stack**: ejecuta funciones de forma **síncrona**.
-   **Callback Queue (cola de tareas)**: almacena funciones que se
    ejecutarán **después** de que el stack esté vacío.
-   **Event Loop**: verifica si el stack está vacío y, de ser así, mueve
    tareas desde la cola hacia el stack.

Ejemplo con `setTimeout`:

```javascript
console.log("Inicio");

setTimeout(() => {
    console.log("Dentro de setTimeout");
}, 0);

console.log("Fin");
```

**Orden de ejecución:** 1. `console.log("Inicio")` 2. `setTimeout(...)`
se envía a la cola de tareas, pero no se ejecuta aún. 3.
`console.log("Fin")` 4. Cuando el stack está vacío, el **Event Loop**
mueve la callback de `setTimeout` al stack. 5. Se ejecuta
`console.log("Dentro de setTimeout")`.

---

## 5. Web APIs

El navegador (o Node.js) proporciona APIs como: - `setTimeout` -
`fetch` - `addEventListener`

Estas no se ejecutan directamente en el **Call Stack**, sino en entornos
externos (Web APIs) y luego pasan sus callbacks a la **Callback Queue**.

---

## 6. Microtasks y Macrotasks

JavaScript diferencia entre: - **Macrotasks**: tareas grandes (ej:
`setTimeout`, `setInterval`). - **Microtasks**: tareas más inmediatas
(ej: `Promises.then`, `process.nextTick` en Node).

El **Event Loop** da prioridad a las **microtasks** antes de continuar
con otras macrotasks.

Ejemplo:

```javascript
console.log("Inicio");

setTimeout(() => console.log("Macrotask"), 0);

Promise.resolve().then(() => console.log("Microtask"));

console.log("Fin");
```

**Orden de ejecución:** 1. "Inicio" 2. "Fin" 3. "Microtask" 4.
"Macrotask"

---

## 7. Resumen Visual

1.  **Call Stack** → Ejecución síncrona (funciones que entran y salen).
2.  **Web APIs** → Ejecutan tareas externas (timers, fetch, eventos).
3.  **Callback Queue** → Cola de tareas pendientes (macrotasks).
4.  **Microtask Queue** → Cola de promesas y microtareas prioritarias.
5.  **Event Loop** → Coordina todo para mantener la ejecución fluida.

---

## 8. Conclusión

-   El **Call Stack** es el corazón de la ejecución en JavaScript.\
-   Sin embargo, para manejar la asincronía, entran en juego el **Event
    Loop**, **Web APIs**, **Callback Queue** y **Microtask Queue**.\
-   Comprender este ecosistema es esencial para escribir código
    eficiente y evitar bloqueos.

## 9. Simulador

-   para ver graficamente: https://www.jsv9000.app/ (JavaScript Visualizer 9000)
-   https://jsflow.info/?hl=es (JS Flow)
