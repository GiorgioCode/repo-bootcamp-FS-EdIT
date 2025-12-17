# 04. Funciones y Verdad

Las funciones son los ciudadanos de primera clase en JavaScript. En TypeScript, son ciudadanos con pasaporte, visa y antecedentes penales verificados.

## Tipado Básico

Ya vimos lo básico:

```typescript
function sumar(a: number, b: number): number {
    return a + b;
}
```

Pero las funciones en JS son mucho más flexibles que eso.

## Parámetros Opcionales y por Defecto

En JS, puedes llamar a una función con menos argumentos de los declarados. En TS, eso es un error, a menos que lo explicites.

```typescript
// '?' hace el parámetro opcional.
// 'apellido' será string | undefined.
function saludar(nombre: string, apellido?: string) {
    if (apellido) {
        return `Hola ${nombre} ${apellido}`;
    }
    return `Hola ${nombre}`;
}

// Parámetros por defecto (automáticamente infiere que es opcional para el llamador, pero string dentro de la función)
function gritar(frase: string, volumen: number = 10) {
    // volumen es number, nunca undefined.
    return `${frase} a volumen ${volumen}`;
}
```

## Rest Parameters

Cuando no sabes cuántos argumentos recibirás.

```typescript
function sumarTodo(...numeros: number[]): number {
    return numeros.reduce((total, n) => total + n, 0);
}

sumarTodo(1, 2, 3, 4, 5); // ✅
```

## Function Overloading (Sobrecarga)

Aquí es donde TS se pone interesante. A veces una función retorna cosas diferentes según qué argumentos recibe.

Imagina una función que:
- Si recibe un timestamp (number), devuelve una Date.
- Si recibe una fecha (string), devuelve una Date.

```typescript
// 1. Firmas de sobrecarga (Overload Signatures)
// Estas no tienen cuerpo, solo definen las formas válidas de llamar a la función.
function crearFecha(timestamp: number): Date;
function crearFecha(fechaString: string): Date;
function crearFecha(dia: number, mes: number, anio: number): Date;

// 2. Implementación (Implementation Signature)
// Esta firma debe ser compatible con TODAS las anteriores, pero NO es visible desde fuera.
function crearFecha(a: number | string, b?: number, c?: number): Date {
    if (typeof a === 'number' && b === undefined && c === undefined) {
        return new Date(a);
    } else if (typeof a === 'string') {
        return new Date(a);
    } else if (typeof a === 'number' && typeof b === 'number' && typeof c === 'number') {
        return new Date(c, b, a);
    }
    throw new Error("Argumentos inválidos");
}

const d1 = crearFecha(123456789);      // ✅ Usa la firma 1
const d2 = crearFecha("2023-01-01");   // ✅ Usa la firma 2
// const d3 = crearFecha(true);        // ❌ Error: Ninguna firma coincide.
```

La sobrecarga es vital para tipar librerías de JS dinámicas, pero en tu propio código, a veces es mejor usar Union Types simples si la lógica no es tan compleja.

## Tipando `this`

`this` en JS es una fuente inagotable de confusión. TS te permite tiparlo explícitamente como un "falso" primer parámetro.

```typescript
interface Usuario {
    id: number;
    admin: boolean;
}

function borrarUsuario(this: Usuario) {
    // TS sabe que 'this' es de tipo Usuario aquí.
    if (!this.admin) {
        throw new Error("No tienes poder aquí");
    }
    console.log("Usuario borrado");
}

const user: Usuario = { id: 1, admin: false };
// borrarUsuario(); // ❌ Error: El contexto 'this' no es correcto.

// Hay que usar call, apply o bind, o llamarlo como método si fuera parte del objeto.
borrarUsuario.call(user); // ✅ TS verifica que 'user' cumple con 'Usuario'.
```

## Conclusión

Las funciones en TS buscan eliminar la ambigüedad. Si una función puede devolver `string` o `null`, TS te obligará a chequear ese `null` antes de usar el string. Es estricto, sí, pero es justo.
