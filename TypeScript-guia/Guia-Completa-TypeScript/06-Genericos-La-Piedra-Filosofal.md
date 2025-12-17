# 06. Genéricos: La Piedra Filosofal

Hasta ahora, hemos sido muy específicos: `string`, `number`, `Usuario`. Pero el software real necesita ser reutilizable. ¿Cómo escribes una función que acepte *cualquier* tipo pero que no pierda la información del tipo (como pasa con `any`)?

Bienvenido a los **Genéricos**.

## El Problema de la Identidad

Imagina una función que devuelve lo que le pasas.

```typescript
function identidad(arg: any): any {
    return arg;
}

const resultado = identidad("hola"); 
// 'resultado' es 'any'. Hemos perdido el hecho de que era un string.
// TS ya no nos protegerá si hacemos resultado.toFixed().
```

## La Solución Genérica

Usamos una **variable de tipo**, convencionalmente llamada `T`.

```typescript
function identidad<T>(arg: T): T {
    return arg;
}

const resultado = identidad<string>("hola");
// Ahora 'resultado' es 'string'. ¡Magia!

// Mejor aún, TS suele inferirlo:
const numero = identidad(42); 
// TS ve el 42 y decide que T es 'number' automáticamente.
```

Léelo así: *"La función identidad toma un tipo T, recibe un argumento de ese tipo T, y devuelve algo de ese mismo tipo T"*.

## Genéricos en Interfaces

Muy común en respuestas de API.

```typescript
interface RespuestaAPI<Data> {
    codigo: number;
    mensaje: string;
    datos: Data;
}

interface Usuario { id: number; nombre: string; }
interface Producto { sku: string; precio: number; }

// Reutilizamos la misma estructura envolvente para distintos datos
const respuestaUser: RespuestaAPI<Usuario> = {
    codigo: 200,
    mensaje: "OK",
    datos: { id: 1, nombre: "Jorge" }
};

const respuestaProd: RespuestaAPI<Producto> = {
    codigo: 200,
    mensaje: "OK",
    datos: { sku: "ABC", precio: 99 }
};
```

## Constraints (Restricciones)

A veces quieres que `T` sea "cualquier cosa", pero "cualquier cosa que tenga cierta propiedad".

Imagina que quieres imprimir la propiedad `.length` de `arg`.

```typescript
function logitud<T>(arg: T): number {
    // return arg.length; // ❌ Error: T podría ser un número, y los números no tienen length.
    return 0;
}
```

Necesitamos restringir `T`.

```typescript
interface ConLongitud {
    length: number;
}

// "T debe extender (cumplir con) ConLongitud"
function longitud<T extends ConLongitud>(arg: T): number {
    return arg.length; // ✅ Ahora TS sabe que T tiene .length
}

longitud("hola"); // ✅ String tiene length
longitud([1, 2]); // ✅ Array tiene length
longitud({ length: 10, valor: "algo" }); // ✅ Objeto cumple la interfaz
// longitud(100); // ❌ Error: Number no tiene length
```

## Clases Genéricas

```typescript
class Caja<T> {
    contenido: T;
    
    constructor(valor: T) {
        this.contenido = valor;
    }

    sacar(): T {
        return this.contenido;
    }
}

const cajaDeZapatos = new Caja<string>("Nike");
const zapato = cajaDeZapatos.sacar(); // zapato es string
```

## Conclusión

Los genéricos son lo que separa a los aprendices de los maestros en TypeScript. Permiten crear librerías y utilidades flexibles, robustas y seguras. Si te encuentras escribiendo la misma función para `string`, luego para `number`, y luego para `Usuario`... detente. Necesitas un Genérico.
