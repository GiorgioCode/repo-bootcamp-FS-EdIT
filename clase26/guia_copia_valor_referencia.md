# Guía paso a paso: Copia por Referencia y por Valor en JavaScript

## 1. Introducción

En JavaScript, cuando asignamos variables o trabajamos con estructuras
de datos, es importante entender si lo que estamos copiando es el
**valor en sí** o una **referencia** al mismo objeto en memoria.\
Esto es crucial en frameworks como **React**, donde la inmutabilidad es
una práctica esencial.

------------------------------------------------------------------------

## 2. Tipos de datos en JavaScript

-   **Primitivos (copian por valor):**
    -   `string`, `number`, `boolean`, `null`, `undefined`, `symbol`,
        `bigint`\
-   **Complejos (copian por referencia):**
    -   `object`, `array`, `function`

------------------------------------------------------------------------

## 3. Copia por Valor

Cuando copiamos un **dato primitivo**, se crea un **nuevo espacio en
memoria**.\
Modificar la copia **no afecta al original**.

``` js
let a = 10;
let b = a;   // Se copia el valor de 'a'
b = 20;

console.log(a); // 10
console.log(b); // 20
```

✅ Cada variable mantiene su propio valor independiente.

------------------------------------------------------------------------

## 4. Copia por Referencia

Cuando copiamos un **objeto o array**, lo que se copia es la
**referencia en memoria**, no el valor en sí.\
Modificar la copia también modifica el original.

``` js
let original = { nombre: "Jorge" };
let copia = original; // Copia la referencia

copia.nombre = "Carlos";

console.log(original.nombre); // "Carlos"
console.log(copia.nombre);    // "Carlos"
```

⚠️ Esto puede causar errores inesperados si no se entiende bien.

------------------------------------------------------------------------

## 5. Cómo copiar arrays y objetos por valor

En React y en buenas prácticas modernas, se recomienda **crear nuevas
copias** en lugar de modificar referencias.\
Veamos varias formas de hacerlo:

### 5.1 Spread Operator (`...`)

Es la forma más popular y usada en **React**.

``` js
// Copia de array
const numeros = [1, 2, 3];
const copiaNumeros = [...numeros];

copiaNumeros.push(4);

console.log(numeros);       // [1, 2, 3]
console.log(copiaNumeros);  // [1, 2, 3, 4]

// Copia de objeto
const persona = { nombre: "Ana", edad: 30 };
const copiaPersona = { ...persona, edad: 31 };

console.log(persona);      // { nombre: "Ana", edad: 30 }
console.log(copiaPersona); // { nombre: "Ana", edad: 31 }
```

------------------------------------------------------------------------

### 5.2 `Object.assign()`

Otra forma de copiar objetos superficiales.

``` js
const persona = { nombre: "Luis", edad: 25 };
const copia = Object.assign({}, persona);

copia.nombre = "María";

console.log(persona); // { nombre: "Luis", edad: 25 }
console.log(copia);   // { nombre: "María", edad: 25 }
```

------------------------------------------------------------------------

### 5.3 Métodos de arrays (`slice`, `concat`)

``` js
const numeros = [1, 2, 3];

const copia1 = numeros.slice();
const copia2 = [].concat(numeros);

copia1.push(4);
copia2.push(5);

console.log(numeros); // [1, 2, 3]
console.log(copia1);  // [1, 2, 3, 4]
console.log(copia2);  // [1, 2, 3, 5]
```

------------------------------------------------------------------------

### 5.4 Copia profunda (deep copy)

Las técnicas anteriores solo hacen una **copia superficial** (shallow
copy).\
Si el objeto tiene **objetos anidados**, la referencia interna se
mantiene.

``` js
const persona = { nombre: "Laura", direccion: { ciudad: "Madrid" } };
const copia = { ...persona };

copia.direccion.ciudad = "Barcelona";

console.log(persona.direccion.ciudad); // "Barcelona" ⚠️
```

✅ Para una copia profunda podemos usar:

-   **`structuredClone()`** (moderno y recomendado):

``` js
const original = { nombre: "Pedro", direccion: { ciudad: "Roma" } };
const copia = structuredClone(original);

copia.direccion.ciudad = "París";

console.log(original.direccion.ciudad); // "Roma"
console.log(copia.direccion.ciudad);    // "París"
```

-   **JSON.parse + JSON.stringify** (menos eficiente, pero compatible):

``` js
const original = { nombre: "Sofía", direccion: { ciudad: "Lisboa" } };
const copia = JSON.parse(JSON.stringify(original));

copia.direccion.ciudad = "Porto";

console.log(original.direccion.ciudad); // "Lisboa"
console.log(copia.direccion.ciudad);    // "Porto"
```

------------------------------------------------------------------------

## 6. Buenas prácticas en React

-   **Nunca mutar directamente el estado** (`state`) de un componente.\
-   Siempre crear **nuevas copias** usando spread operator u otros
    métodos.\
-   Para estructuras anidadas, considerar **deep copy** o librerías como
    `immer`.

Ejemplo en React:

``` js
// ❌ Incorrecto (mutación directa)
setUser(prev => {
  prev.nombre = "Juan"; // mutación
  return prev;
});

// ✅ Correcto (copia inmutable)
setUser(prev => ({
  ...prev,
  nombre: "Juan"
}));
```

------------------------------------------------------------------------

## 7. Resumen visual

-   **Primitivos → Copia por valor.**
-   **Objetos/arrays → Copia por referencia.**
-   Para evitar problemas:
    -   Usa `...` (spread)\
    -   Usa `Object.assign`\
    -   Usa `slice`, `concat`\
    -   Para anidados → `structuredClone` o
        `JSON.parse(JSON.stringify(...))`

------------------------------------------------------------------------

## 8. Ejemplo completo

``` js
const original = {
  nombre: "Carlos",
  direccion: { ciudad: "Buenos Aires" },
  hobbies: ["fútbol", "ajedrez"]
};

// Copia superficial
const copia1 = { ...original };

// Copia profunda
const copia2 = structuredClone(original);

copia1.direccion.ciudad = "Rosario";
copia2.hobbies.push("programación");

console.log(original.direccion.ciudad); // "Rosario" (copia superficial afectó al original)
console.log(original.hobbies);          // ["fútbol", "ajedrez"]
console.log(copia2.hobbies);            // ["fútbol", "ajedrez", "programación"]
```
