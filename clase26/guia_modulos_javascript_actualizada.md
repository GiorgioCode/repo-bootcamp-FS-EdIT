# Guía paso a paso: Importación, Exportación y Uso de Módulos en JavaScript

## 1. ¿Qué son los módulos en JavaScript?

Un **módulo** es simplemente un archivo de JavaScript que exporta código
para que pueda ser reutilizado en otros archivos.\
Esto permite **organizar mejor el código**, hacerlo más legible y
mantenerlo escalable.

------------------------------------------------------------------------

## 2. Tipos de módulos

### 2.1 CommonJS (Node.js clásico)

-   Usa `require` y `module.exports`.
-   Se utiliza principalmente en **Node.js**.

Ejemplo:

``` js
// archivo math.js
const suma = (a, b) => a + b;
module.exports = suma;

// archivo app.js
const suma = require('./math');
console.log(suma(2, 3)); // 5
```

### 2.2 ES Modules (ESM)

-   Usa `import` y `export`.
-   Es el estándar moderno y funciona en navegadores y Node.js (con
    `"type": "module"` en package.json).

Ejemplo:

``` js
// archivo math.js
export function suma(a, b) {
  return a + b;
}

// archivo app.js
import { suma } from './math.js';
console.log(suma(2, 3)); // 5
```

------------------------------------------------------------------------

## 3. Exportaciones en ES Modules

### 3.1 Exportación Nombrada

Permite exportar varias funciones, variables o clases desde un módulo.

``` js
// archivo utils.js
export const PI = 3.1416;
export function areaCirculo(radio) {
  return PI * radio * radio;
}
```

Uso:

``` js
import { PI, areaCirculo } from './utils.js';
console.log(PI);
console.log(areaCirculo(10));
```

### 3.2 Exportación por Defecto

Un módulo puede tener **una sola exportación por defecto**.

``` js
// archivo saludo.js
export default function saludar(nombre) {
  return `Hola, ${nombre}!`;
}
```

Uso:

``` js
import saludar from './saludo.js';
console.log(saludar("Jorge"));
```

#### ¿Qué significa exportar por defecto?

-   Indica que el módulo **expone un valor principal**, el cual se
    considera la "exportación principal" del archivo.\
-   El importador no necesita usar llaves `{ }` para obtenerlo.\
-   El nombre que le asignes al import **puede ser cualquiera**, ya que
    no está vinculado a un nombre específico dentro del módulo.

Ejemplo:

``` js
// archivo calculadora.js
export default function (a, b) {
  return a + b;
}

// archivo app.js
import sumar from './calculadora.js';
console.log(sumar(5, 10)); // 15
```

Aquí la función fue exportada sin nombre (función anónima) y se puede
importar con cualquier nombre (`sumar`, `add`, etc.).

#### Diferencias con la exportación nombrada:

1.  **Cantidad:** Un módulo puede tener **múltiples exportaciones
    nombradas**, pero **solo una por defecto**.\
2.  **Sintaxis al importar:**
    -   Exportación nombrada → requiere llaves `{ }`.\
    -   Exportación por defecto → se importa sin llaves.\
3.  **Flexibilidad de nombres:**
    -   Exportación nombrada → el nombre debe coincidir exactamente.\
    -   Exportación por defecto → el nombre es libre al importar.

------------------------------------------------------------------------

## 4. Importaciones avanzadas

### 4.1 Importar todo el módulo

``` js
import * as Utils from './utils.js';
console.log(Utils.PI);
console.log(Utils.areaCirculo(5));
```

### 4.2 Importar con alias

``` js
import { areaCirculo as calcularArea } from './utils.js';
console.log(calcularArea(10));
```

### 4.3 Importaciones dinámicas (lazy loading)

Se utilizan para cargar módulos solo cuando son necesarios.

``` js
async function cargarModulo() {
  const modulo = await import('./utils.js');
  console.log(modulo.areaCirculo(5));
}
cargarModulo();
```

------------------------------------------------------------------------

## 5. Buenas prácticas

-   Usar **ES Modules** siempre que sea posible (estándar moderno).
-   Nombrar archivos y funciones de manera clara.
-   Agrupar exportaciones relacionadas en un mismo módulo.
-   Evitar dependencias circulares (cuando dos módulos se importan
    mutuamente).

------------------------------------------------------------------------

## 6. Resumen visual

1.  `export` → Se usa en el archivo que provee código.\
2.  `import` → Se usa en el archivo que consume código.\
3.  Tipos de exportación:
    -   Nombrada (`export function ...`).
    -   Por defecto (`export default ...`).\
4.  Importaciones avanzadas → alias, `import *`, dinámicas.

------------------------------------------------------------------------

## 7. Ejemplo completo

``` js
// archivo operaciones.js
export function suma(a, b) { return a + b; }
export function resta(a, b) { return a - b; }
export default function multiplicar(a, b) { return a * b; }

// archivo app.js
import multiplicar, { suma, resta } from './operaciones.js';

console.log(suma(2, 3));        // 5
console.log(resta(5, 2));       // 3
console.log(multiplicar(4, 6)); // 24
```
