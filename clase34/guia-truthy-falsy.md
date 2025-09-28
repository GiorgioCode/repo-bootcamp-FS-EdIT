# Guía de Estudio: Truthy y Falsy en JavaScript

## Introducción

En JavaScript, todos los valores pueden ser evaluados como `true` o `false` en un contexto booleano. Esta característica es fundamental para entender cómo funcionan las condiciones, bucles y operadores lógicos en JavaScript.

## ¿Qué son los valores Truthy y Falsy?

- **Falsy**: Valores que se evalúan como `false` en un contexto booleano
- **Truthy**: Valores que se evalúan como `true` en un contexto booleano

## Valores Falsy en JavaScript

JavaScript tiene exactamente **8 valores falsy**:

### 1. `false`
```javascript
if (false) {
    console.log("No se ejecuta");
}
```

### 2. `0` (cero)
```javascript
if (0) {
    console.log("No se ejecuta");
}
```

### 3. `-0` (cero negativo)
```javascript
if (-0) {
    console.log("No se ejecuta");
}
```

### 4. `0n` (BigInt cero)
```javascript
if (0n) {
    console.log("No se ejecuta");
}
```

### 5. `""` (string vacío)
```javascript
if ("") {
    console.log("No se ejecuta");
}
```

### 6. `null`
```javascript
if (null) {
    console.log("No se ejecuta");
}
```

### 7. `undefined`
```javascript
if (undefined) {
    console.log("No se ejecuta");
}
```

### 8. `NaN` (Not a Number)
```javascript
if (NaN) {
    console.log("No se ejecuta");
}
```

## Valores Truthy

**Todos los demás valores** son truthy, incluyendo:

### Números diferentes de cero
```javascript
if (1) console.log("Truthy"); // ✓
if (-1) console.log("Truthy"); // ✓
if (3.14) console.log("Truthy"); // ✓
if (Infinity) console.log("Truthy"); // ✓
```

### Strings no vacíos
```javascript
if ("hello") console.log("Truthy"); // ✓
if ("0") console.log("Truthy"); // ✓ (string "0", no número 0)
if ("false") console.log("Truthy"); // ✓ (string "false", no booleano false)
if (" ") console.log("Truthy"); // ✓ (espacio en blanco)
```

### Objetos y Arrays
```javascript
if ({}) console.log("Truthy"); // ✓ (objeto vacío)
if ([]) console.log("Truthy"); // ✓ (array vacío)
if (new Date()) console.log("Truthy"); // ✓
```

### Funciones
```javascript
if (function() {}) console.log("Truthy"); // ✓
if (() => {}) console.log("Truthy"); // ✓
```

## Conversión Explícita a Booleano

### Usando `Boolean()`
La función `Boolean()` convierte cualquier valor a su equivalente booleano:

```javascript
console.log(Boolean(0)); // false - el número 0 es falsy
console.log(Boolean("")); // false - string vacío es falsy
console.log(Boolean("hello")); // true - string no vacío es truthy
console.log(Boolean([])); // true - array vacío es truthy (¡cuidado!)
console.log(Boolean({})); // true - objeto vacío es truthy (¡cuidado!)
console.log(Boolean(null)); // false - null es falsy
console.log(Boolean(undefined)); // false - undefined es falsy
```

### Usando el operador `!!` (doble negación)
El operador `!!` es una forma abreviada de convertir a booleano:
- El primer `!` convierte el valor a booleano y lo invierte
- El segundo `!` lo vuelve a invertir, obteniendo el valor booleano original

```javascript
console.log(!!0); // false - equivale a Boolean(0)
console.log(!!""); // false - equivale a Boolean("")
console.log(!!"hello"); // true - equivale a Boolean("hello")
console.log(!![]); // true - equivale a Boolean([])

// Paso a paso del operador !!:
console.log(!"hello"); // false (invierte el truthy)
console.log(!!"hello"); // true (vuelve a invertir)
```

## Operadores Lógicos y Truthy/Falsy

### Operador OR (`||`) - Valores por Defecto
El operador `||` devuelve el **primer valor truthy** que encuentra, o el último valor si todos son falsy:

```javascript
// Uso típico para valores por defecto
let nombre = "" || "Anónimo"; // "Anónimo" (porque "" es falsy)
let edad = 0 || 18; // 18 (porque 0 es falsy)
let activo = false || true; // true (porque false es falsy)

// Cadena de valores por defecto
let config = null || undefined || "" || "configuración por defecto";
console.log(config); // "configuración por defecto"

// ¡Cuidado con valores que pueden ser 0 o false válidos!
let puntuacion = 0 || 100; // 100 (pero tal vez 0 era válido)
```

### Operador AND (`&&`) - Ejecución Condicional
El operador `&&` devuelve el **primer valor falsy** que encuentra, o el último valor si todos son truthy:

```javascript
// Ejecución condicional
let usuario = { nombre: "Ana" };
usuario && console.log("Usuario existe"); // Se ejecuta

let usuarioNull = null;
usuarioNull && console.log("No se ejecuta"); // No se ejecuta

// Acceso seguro a propiedades
let datos = { perfil: { nombre: "Juan" } };
let nombre = datos && datos.perfil && datos.perfil.nombre; // "Juan"

// Si alguna parte es falsy, se detiene
let datosIncompletos = { perfil: null };
let nombreIncompleto = datosIncompletos && datosIncompletos.perfil && datosIncompletos.perfil.nombre; // null
```

### Operador Nullish Coalescing (`??`) - Solo para null/undefined

#### ¿Cuál es la diferencia fundamental?

- **`||` (OR)**: Considera **TODOS los valores falsy** como "vacíos" y los reemplaza
- **`??` (Nullish Coalescing)**: Solo considera `null` y `undefined` como "vacíos"

#### Tabla Comparativa

| Valor | `valor \|\| "default"` | `valor ?? "default"` | ¿Por qué? |
|-------|----------------------|---------------------|-----------|
| `null` | `"default"` | `"default"` | Ambos lo consideran "vacío" |
| `undefined` | `"default"` | `"default"` | Ambos lo consideran "vacío" |
| `0` | `"default"` | `0` | `\|\|` ve 0 como falsy, `??` no |
| `""` | `"default"` | `""` | `\|\|` ve string vacío como falsy, `??` no |
| `false` | `"default"` | `false` | `\|\|` ve false como falsy, `??` no |
| `NaN` | `"default"` | `NaN` | `\|\|` ve NaN como falsy, `??` no |

#### Ejemplos Prácticos

```javascript
// Ejemplo 1: Configuración de usuario
let configuracion = {
    mostrarNotificaciones: false, // Usuario NO quiere notificaciones
    volumen: 0,                   // Usuario quiere volumen en silencio
    tema: "",                     // Usuario quiere tema por defecto del sistema
    idioma: null                  // Usuario no ha seleccionado idioma
};

// ❌ PROBLEMÁTICO con || (ignora preferencias válidas del usuario)
let notificaciones = configuracion.mostrarNotificaciones || true; // true (¡mal!)
let vol = configuracion.volumen || 50; // 50 (¡mal!)
let temaUsuario = configuracion.tema || "claro"; // "claro" (¡mal!)
let lang = configuracion.idioma || "es"; // "es" (✓ correcto)

// ✅ CORRECTO con ?? (respeta preferencias válidas del usuario)
let notificaciones2 = configuracion.mostrarNotificaciones ?? true; // false (✓)
let vol2 = configuracion.volumen ?? 50; // 0 (✓)
let temaUsuario2 = configuracion.tema ?? "claro"; // "" (✓)
let lang2 = configuracion.idioma ?? "es"; // "es" (✓)
```

#### Cuándo usar cada uno

**Usa `||` cuando:**
- Quieres reemplazar **cualquier valor falsy**
- Estás trabajando con validación de formularios
- Necesitas valores por defecto para datos "vacíos"

```javascript
// Validación de formulario - cualquier valor falsy es inválido
function validarNombre(nombre) {
    return nombre || "Nombre requerido"; // "", null, undefined → "Nombre requerido"
}

// Búsqueda - cualquier valor falsy significa "sin filtro"
function buscar(termino) {
    return termino || "*"; // "", null, undefined, 0 → "*" (buscar todo)
}
```

**Usa `??` cuando:**
- Solo quieres reemplazar valores **realmente ausentes** (null/undefined)
- Trabajas con configuraciones donde 0, false, "" son valores válidos
- Necesitas preservar la intención explícita del usuario

```javascript
// Configuración de API - 0 y false son valores válidos
function configurarAPI(opciones) {
    return {
        timeout: opciones.timeout ?? 5000,        // 0 es válido (sin timeout)
        reintentos: opciones.reintentos ?? 3,     // 0 es válido (sin reintentos)
        debug: opciones.debug ?? false,           // false es válido
        apiKey: opciones.apiKey ?? "default-key"  // solo null/undefined son inválidos
    };
}

// Llamada con valores explícitos
configurarAPI({
    timeout: 0,      // Usuario quiere sin timeout
    reintentos: 0,   // Usuario no quiere reintentos
    debug: false,    // Usuario no quiere debug
    apiKey: null     // Usuario no proporcionó key
});
// Resultado: { timeout: 0, reintentos: 0, debug: false, apiKey: "default-key" }
```

#### Regla Práctica

> **"¿El valor 0, false o '' tiene significado en tu aplicación?"**
> - **SÍ** → Usa `??` para preservar esos valores
> - **NO** → Usa `||` para tratarlos como "vacíos"

### Operador NOT (`!`) - Inversión de Truthiness
El operador `!` convierte cualquier valor a booleano y lo invierte:

```javascript
console.log(!true); // false
console.log(!false); // true
console.log(!"hello"); // false (string no vacío es truthy)
console.log(!0); // true (0 es falsy)
console.log(![]); // false (array vacío es truthy)

// Uso común en condicionales
if (!usuario) {
    console.log("Usuario no existe");
}

if (!datos.length) {
    console.log("No hay datos");
}
```

## Casos Prácticos y Ejemplos

### 1. Validación de Formularios
```javascript
function validarFormulario(nombre, email) {
    if (!nombre) {
        console.log("El nombre es requerido");
        return false;
    }
    
    if (!email) {
        console.log("El email es requerido");
        return false;
    }
    
    return true;
}

// Ejemplos de uso
validarFormulario("", "test@email.com"); // "El nombre es requerido"
validarFormulario("Juan", ""); // "El email es requerido"
validarFormulario("Juan", "test@email.com"); // true
```

### 2. Valores por Defecto
```javascript
function saludar(nombre) {
    // Si nombre es falsy, usar "Invitado"
    nombre = nombre || "Invitado";
    console.log(`Hola, ${nombre}!`);
}

saludar("Ana"); // "Hola, Ana!"
saludar(""); // "Hola, Invitado!"
saludar(null); // "Hola, Invitado!"
saludar(); // "Hola, Invitado!"
```

### 3. Operador Nullish Coalescing (`??`)
```javascript
// Diferencia entre || y ??
let valor1 = 0 || "default"; // "default" (0 es falsy)
let valor2 = 0 ?? "default"; // 0 (0 no es null ni undefined)

let valor3 = null || "default"; // "default"
let valor4 = null ?? "default"; // "default"

let valor5 = "" || "default"; // "default" ("" es falsy)
let valor6 = "" ?? "default"; // "" ("" no es null ni undefined)
```

### 4. Filtrado de Arrays
```javascript
let numeros = [0, 1, 2, "", 3, null, 4, undefined, 5];

// Filtrar valores truthy
let soloTruthy = numeros.filter(Boolean);
console.log(soloTruthy); // [1, 2, 3, 4, 5]

// Filtrar valores falsy
let soloFalsy = numeros.filter(x => !x);
console.log(soloFalsy); // [0, "", null, undefined]
```

### 5. Condicionales Cortas
```javascript
// En lugar de:
if (usuario.esAdmin === true) {
    mostrarPanelAdmin();
}

// Puedes usar:
if (usuario.esAdmin) {
    mostrarPanelAdmin();
}

// Para verificar que existe y tiene valor:
if (usuario.nombre && usuario.nombre.length > 0) {
    console.log(`Bienvenido, ${usuario.nombre}`);
}
```

## Errores Comunes

### 1. Confundir string "0" con número 0
```javascript
console.log(Boolean("0")); // true (string no vacío)
console.log(Boolean(0)); // false (número cero)
```

### 2. Arrays y objetos vacíos son truthy
```javascript
if ([]) {
    console.log("Esto SÍ se ejecuta"); // Arrays vacíos son truthy
}

if ({}) {
    console.log("Esto SÍ se ejecuta"); // Objetos vacíos son truthy
}

// Para verificar si un array está vacío:
let arr = [];
if (arr.length) {
    console.log("Array tiene elementos");
} else {
    console.log("Array está vacío");
}
```

### 3. NaN es falsy pero typeof NaN es "number"
```javascript
console.log(Boolean(NaN)); // false
console.log(typeof NaN); // "number"
console.log(NaN === NaN); // false (¡NaN no es igual a sí mismo!)
```

## Ejercicios Prácticos

### Ejercicio 1: Identificar Truthy/Falsy
Predice el resultado de estas expresiones:

```javascript
console.log(Boolean([])); // ?
console.log(Boolean({})); // ?
console.log(Boolean("0")); // ?
console.log(Boolean(0)); // ?
console.log(Boolean(-0)); // ?
console.log(Boolean(null)); // ?
console.log(Boolean(undefined)); // ?
console.log(Boolean(NaN)); // ?
console.log(Boolean(Infinity)); // ?
console.log(Boolean(-Infinity)); // ?
```

### Ejercicio 2: Función de Validación
Crea una función que valide si todos los campos de un objeto están completos:

```javascript
function validarCampos(objeto) {
    // Tu código aquí
    // Debe retornar true si todos los valores son truthy
    // Debe retornar false si algún valor es falsy
}

// Casos de prueba:
console.log(validarCampos({nombre: "Juan", edad: 25})); // true
console.log(validarCampos({nombre: "", edad: 25})); // false
console.log(validarCampos({nombre: "Juan", edad: 0})); // false
```

### Ejercicio 3: Limpieza de Datos
Crea una función que elimine todos los valores falsy de un array:

```javascript
function limpiarArray(arr) {
    // Tu código aquí
}

// Caso de prueba:
let datos = [1, 0, "hello", "", null, "world", undefined, 42];
console.log(limpiarArray(datos)); // [1, "hello", "world", 42]
```

## Soluciones

### Solución Ejercicio 1:
```javascript
console.log(Boolean([])); // true
console.log(Boolean({})); // true
console.log(Boolean("0")); // true
console.log(Boolean(0)); // false
console.log(Boolean(-0)); // false
console.log(Boolean(null)); // false
console.log(Boolean(undefined)); // false
console.log(Boolean(NaN)); // false
console.log(Boolean(Infinity)); // true
console.log(Boolean(-Infinity)); // true
```

### Solución Ejercicio 2:
```javascript
function validarCampos(objeto) {
    return Object.values(objeto).every(Boolean);
}
```

### Solución Ejercicio 3:
```javascript
function limpiarArray(arr) {
    return arr.filter(Boolean);
}
```

## Resumen

- **8 valores falsy**: `false`, `0`, `-0`, `0n`, `""`, `null`, `undefined`, `NaN`
- **Todo lo demás es truthy**, incluyendo arrays y objetos vacíos
- Usa `Boolean()` o `!!` para conversión explícita
- Los valores truthy/falsy son fundamentales para condicionales y validaciones
- Cuidado con casos especiales como `"0"` (truthy) vs `0` (falsy)

## Recursos Adicionales

- [MDN: Truthy](https://developer.mozilla.org/es/docs/Glossary/Truthy)
- [MDN: Falsy](https://developer.mozilla.org/es/docs/Glossary/Falsy)
- [MDN: Boolean](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Boolean)
