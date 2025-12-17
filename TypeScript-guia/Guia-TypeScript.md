# Guía Definitiva de TypeScript para Desarrolladores JavaScript

Esta guía está diseñada meticulosamente para llevarte de saber JavaScript a dominar los fundamentos de TypeScript. TypeScript no es un lenguaje nuevo per se, sino un "superset" (superconjunto) de JavaScript. Esto significa que **todo código JavaScript válido es también código TypeScript válido**, pero TypeScript agrega una capa de "tipos" que nos ayuda a evitar errores antes de ejecutar el código.

---

## 1. Instalación y Configuración Inicial

Antes de escribir código, necesitamos instalar el compilador de TypeScript. Los navegadores no entienden TypeScript, entienden JavaScript. Por eso, necesitamos una herramienta que "traduzca" (compile/transpile) nuestro código TS a JS.

### Paso 1: Instalación Global

Abre tu terminal y ejecuta:

```bash
npm install -g typescript
```

### Paso 2: Inicializar un Proyecto

Crea una carpeta para practicar y dentro de ella ejecuta:

```bash
tsc --init
```

Esto creará un archivo `tsconfig.json`. Este archivo es el corazón de la configuración de TypeScript. Le dice al compilador qué tan estricto debe ser y cómo debe generar el JavaScript final.

> **Nota:** Busca la opción `"target": "es2016"` (o superior) en `tsconfig.json`. Esto define qué versión de JavaScript se generará. Si quieres usar funciones modernas de JS, asegúrate de que esto sea reciente (ej. `es6` o `es2020`).

---

## 2. Tipos Básicos (Primitivos)

En JavaScript, las variables pueden cambiar de tipo dinámicamente. En TypeScript, intentamos restringir esto para evitar sorpresas.

### Sintaxis Básica
La sintaxis es `nombreVariable: tipo`.

```typescript
// --- String (Texto) ---
// Declaramos explícitamente que 'nombre' solo puede contener texto.
let nombre: string = "Jorge"; 

// nombre = 10; // ❌ Error: TypeScript te gritará aquí. No puedes asignar un número a un string.

// --- Number (Números) ---
// Sirve para enteros y decimales.
let edad: number = 30;
let precio: number = 99.99;

// --- Boolean (Verdadero/Falso) ---
let esDesarrollador: boolean = true;

// --- Inferencia de Tipos (Type Inference) ---
// TypeScript es inteligente. Si inicializas una variable, él "adivina" el tipo.
let curso = "TypeScript"; // TypeScript sabe que esto es un 'string' automáticamente.
// curso = 10; // ❌ Error: Aunque no escribimos ': string', TS ya lo asumió.
```

---

## 3. Tipos Especiales y Colecciones

### Arrays (Arreglos)
Hay dos formas de definir arrays.

```typescript
// Forma 1: Tipo[]
let habilidades: string[] = ["JS", "CSS", "HTML"]; 
// Solo podemos agregar strings a este array.
// habilidades.push(100); // ❌ Error

// Forma 2: Array<Tipo> (Genéricos - veremos esto más adelante)
let edades: Array<number> = [25, 30, 19];
```

### Tuplas (Tuples)
Las tuplas son arrays con un número fijo de elementos y tipos conocidos en posiciones específicas. Son muy útiles para estructuras de datos estrictas.

```typescript
// Definimos una tupla: el primer elemento DEBE ser string, el segundo DEBE ser number.
let usuario: [string, number];

usuario = ["Jorge", 30]; // ✅ Correcto
// usuario = [30, "Jorge"]; // ❌ Error: El orden importa.
// usuario = ["Jorge", 30, true]; // ❌ Error: Solo definimos 2 elementos.
```

### Any (Cualquiera)
`any` desactiva el chequeo de tipos de TypeScript. Úsalo **solo cuando sea absolutamente necesario** (por ejemplo, al migrar código viejo de JS), ya que usarlo derrota el propósito de usar TypeScript.

```typescript
let variableLoca: any = "Hola";
variableLoca = 10; // ✅ TS no se queja
variableLoca = true; // ✅ TS sigue sin quejarse
// ⚠️ Peligro: Pierdes toda la seguridad que TS ofrece.
```

### Unknown
Es como una versión segura de `any`. Te obliga a verificar el tipo antes de usarlo.

```typescript
let valorDesconocido: unknown = 10;

// let numero: number = valorDesconocido; // ❌ Error: TS no sabe si es seguro.

// Debemos verificar primero:
if (typeof valorDesconocido === 'number') {
    let numero: number = valorDesconocido; // ✅ Ahora TS sabe que es un número en este bloque.
}
```

---

## 4. Interfaces y Tipos Personalizados (Objects)

Aquí es donde TypeScript brilla. Podemos definir la "forma" que deben tener nuestros objetos.

### Interfaces
Imagina una interfaz como un contrato. Si un objeto dice que cumple con la interfaz `Usuario`, **debe** tener las propiedades que la interfaz exige.

```typescript
// Definimos la estructura
interface Usuario {
    nombre: string;
    edad: number;
    email?: string; // El signo '?' indica que esta propiedad es OPCIONAL.
    readonly id: number; // 'readonly' impide que modifiquemos esto después de crearlo.
}

// Creamos un objeto que sigue esa estructura
let nuevoUsuario: Usuario = {
    id: 1,
    nombre: "Ana",
    edad: 28
    // email no es obligatorio, así que no da error si falta.
};

// nuevoUsuario.id = 2; // ❌ Error: 'id' es de solo lectura.
nuevoUsuario.edad = 29; // ✅ Correcto.
```

### Type Aliases (Alias de Tipo)
Son muy similares a las interfaces, pero pueden definir más cosas que solo objetos (como uniones).

```typescript
type ID = string | number; // Esto es un "Union Type". ID puede ser texto O número.

type Coordenada = {
    x: number;
    y: number;
};

let punto: Coordenada = { x: 10, y: 20 };
let miId: ID = "user-123";
miId = 55; // ✅ También válido.
```

> **¿Cuándo usar Interface vs Type?**
> - Usa `interface` para definir la forma de objetos y clases (se pueden extender fácilmente).
> - Usa `type` para uniones (`string | number`), tuplas o alias simples.

---

## 5. Funciones

En TS, tipamos los argumentos que entran y lo que la función devuelve.

```typescript
// (a: number, b: number): number  <-- El último ': number' es el tipo de retorno.
function sumar(a: number, b: number): number {
    return a + b;
}

// sumar("hola", 2); // ❌ Error: Argumento inválido.

// --- Funciones que no retornan nada (void) ---
function saludar(nombre: string): void {
    console.log(`Hola ${nombre}`);
    // No hay return, o return undefined.
}

// --- Argumentos Opcionales ---
function crearNombre(nombre: string, apellido?: string): string {
    if (apellido) {
        return `${nombre} ${apellido}`;
    }
    return nombre;
}
```

---

## 6. Clases

TypeScript lleva las clases de ES6 al siguiente nivel con modificadores de acceso (`public`, `private`, `protected`).

```typescript
class Coche {
    // Propiedades
    private marca: string; // Solo accesible DENTRO de esta clase.
    public modelo: string; // Accesible desde cualquier lugar (por defecto).
    protected anio: number; // Accesible en esta clase y en las que hereden de ella.

    // Constructor: se ejecuta al crear una instancia (new Coche)
    constructor(marca: string, modelo: string, anio: number) {
        this.marca = marca;
        this.modelo = modelo;
        this.anio = anio;
    }

    // Método público
    public obtenerInfo(): string {
        return `Coche: ${this.marca} ${this.modelo}`;
    }
}

const miCoche = new Coche("Toyota", "Corolla", 2020);
console.log(miCoche.modelo); // ✅ Acceso permitido.
// console.log(miCoche.marca); // ❌ Error: 'marca' es privada.
```

---

## 7. Genéricos (Generics)

Los genéricos permiten crear componentes reutilizables que funcionan con varios tipos, en lugar de uno solo. Es como pasar el tipo como un argumento.

Imagina una función que devuelve lo que le pasas. Sin genéricos, tendrías que usar `any` (malo) o definir una función para cada tipo.

```typescript
// <T> es una variable de tipo. T tomará el valor del tipo que usemos al llamar la función.
function identidad<T>(arg: T): T {
    return arg;
}

// Uso explícito: Le decimos que T es string
let salida1 = identidad<string>("miString"); 
// salida1 es de tipo 'string'

// Inferencia: TS se da cuenta que pasamos un número
let salida2 = identidad(100); 
// salida2 es de tipo 'number' automágicamente.
```

**Ejemplo práctico con Interfaces:**

```typescript
// Una respuesta de API que puede contener diferentes datos
interface RespuestaAPI<T> {
    codigo: number;
    mensaje: string;
    datos: T; // Aquí 'datos' será del tipo que definamos al usar la interfaz.
}

interface Usuario {
    nombre: string;
}

// Respuesta que contiene un Usuario
const respuestaUsuario: RespuestaAPI<Usuario> = {
    codigo: 200,
    mensaje: "Éxito",
    datos: { nombre: "Jorge" } // ✅ TS sabe que esto debe ser un Usuario
};

// Respuesta que contiene un string
const respuestaTexto: RespuestaAPI<string> = {
    codigo: 200,
    mensaje: "Éxito",
    datos: "Simplemente un texto" // ✅ Correcto
};
```

---

## 8. Enums (Enumeraciones)

Los Enums permiten definir un conjunto de constantes con nombre. Hacen el código mucho más legible.

```typescript
enum EstadoPedido {
    Pendiente,  // 0
    Enviado,    // 1
    Entregado   // 2
}

let estadoActual: EstadoPedido = EstadoPedido.Enviado;

if (estadoActual === EstadoPedido.Enviado) {
    console.log("El pedido va en camino");
}

// También puedes asignar valores personalizados
enum Colores {
    Rojo = "RED",
    Verde = "GREEN",
    Azul = "BLUE"
}
console.log(Colores.Rojo); // Imprime "RED"
```

---

## 9. Compilando tu código

Una vez que has escrito tu archivo, digamos `index.ts`, necesitas convertirlo a JavaScript para ejecutarlo con Node o en el navegador.

1.  Ejecuta en la terminal:
    ```bash
    tsc index.ts
    ```
2.  Esto generará un archivo `index.js` en la misma carpeta.
3.  Ese archivo `.js` es el que ejecutas o vinculas en tu HTML.

Para proyectos reales, simplemente ejecutas `tsc` (sin argumentos) y TypeScript buscará tu archivo `tsconfig.json` para compilar todo el proyecto según tus reglas.

---

## Resumen Final

1.  **Tipado Estático**: Define tipos (`string`, `number`, etc.) para atrapar errores al escribir, no al ejecutar.
2.  **Interfaces**: Úsalas para definir la forma de tus objetos y datos.
3.  **Inferencia**: Deja que TS adivine los tipos cuando sea obvio para escribir menos código.
4.  **No uses Any**: Evita `any` a toda costa; es volver a JavaScript sin seguridad.

¡Felicidades! Ahora tienes las bases sólidas para empezar a programar en TypeScript. La mejor forma de aprender es practicando, así que intenta migrar algún script pequeño de JS a TS.
