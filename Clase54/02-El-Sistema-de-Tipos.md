# 02. El Sistema de Tipos

En JavaScript, los tipos son etiquetas que los valores llevan consigo en tiempo de ejecución. `5` es un number, `"hola"` es un string.
En TypeScript, los tipos son conjuntos de valores posibles.

## Tipos Primitivos: La Base

No nos detendremos mucho aquí, ya los conoces, pero observa la sintaxis explícita.

```typescript
// Sintaxis: let variable: Tipo = Valor;

const nombre: string = "Alan Turing";
const edad: number = 42;
const esGenio: boolean = true;

// null y undefined son tipos en sí mismos en modo estricto
const nada: undefined = undefined;
const vacio: null = null;
```

## Inferencia de Tipos: La Magia de no Escribir

TypeScript es inteligente. No necesitas decirle el tipo de todo.

```typescript
// TS infiere que 'pais' es string.
let pais = "Argentina"; 

// pais = 54; // ❌ Error: TS recuerda que 'pais' nació siendo string.
```

**Regla de Oro:** Deja que TS infiera el tipo siempre que sea posible. Solo anota tipos explícitamente cuando:
1. Declaras una variable sin inicializarla.
2. El tipo inferido es demasiado permisivo (ej. arrays vacíos).
3. Quieres asegurar un contrato específico (ej. retornos de función).

## El Peligro de `any`

`any` es el botón de "apagar TypeScript".

```typescript
let peligro: any;
peligro = "hola";
peligro = 100;
peligro.metodoQueNoExiste(); // ✅ TS no se queja, pero esto explotará en runtime.
```

Usar `any` es admitir la derrota. Úsalo solo para migraciones extremas o librerías de terceros mal tipadas.

## `unknown`: El Hermano Responsable de `any`

`unknown` también acepta cualquier valor, pero **no te deja usarlo** hasta que verifiques qué es.

```typescript
let cajaMisteriosa: unknown;
cajaMisteriosa = "Un string secreto";

// console.log(cajaMisteriosa.toUpperCase()); // ❌ Error: TS dice "No sé qué es esto, no puedes usar métodos de string".

// Narrowing (Estrechamiento de tipos)
if (typeof cajaMisteriosa === 'string') {
    // DENTRO de este bloque, TS sabe que es un string.
    console.log(cajaMisteriosa.toUpperCase()); // ✅ Correcto
}
```

Esto se llama **Type Narrowing**. Es fundamental en TS. Usamos guardas (`typeof`, `instanceof`) para reducir el conjunto de posibilidades de un tipo.

## Union Types (`|`)

A veces un valor puede ser más de una cosa.

```typescript
let id: string | number;

id = 101;      // ✅
id = "A-101";  // ✅
// id = true;  // ❌
```

Cuando usas una unión, TS solo te dejará usar las propiedades **comunes** a ambos tipos, a menos que hagas Narrowing.

```typescript
function imprimirId(id: string | number) {
    // console.log(id.toUpperCase()); // ❌ Error: 'number' no tiene toUpperCase.

    if (typeof id === 'string') {
        console.log(id.toUpperCase()); // ✅ Aquí es string seguro.
    } else {
        console.log(id.toFixed(2));    // ✅ TS sabe que si no es string, TIENE que ser number.
    }
}
```

## Intersection Types (`&`)

Mientras `|` es un "O" lógico, `&` es un "Y". Combina múltiples tipos en uno solo.

```typescript
type Draggable = { drag: () => void };
type Resizable = { resize: () => void };

// Un UIWidget debe tener AMBAS capacidades
type UIWidget = Draggable & Resizable;

let widget: UIWidget = {
    drag: () => {},
    resize: () => {}
};
```

## Conclusión

El sistema de tipos de TS es expresivo. No se trata solo de validar datos, se trata de modelar cómo fluye la información en tu aplicación. `unknown` y las uniones (`|`) son herramientas poderosas para manejar la incertidumbre del mundo real de forma segura.
