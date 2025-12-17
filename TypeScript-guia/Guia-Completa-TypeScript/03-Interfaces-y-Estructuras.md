# 03. Interfaces y Estructuras

En lenguajes como Java o C#, los tipos son **Nominales**. Si tienes una clase `Persona` y una clase `Usuario` con los mismos campos, son cosas diferentes.
En TypeScript, el tipado es **Estructural** (Duck Typing). Si camina como pato y grazna como pato, es un pato.

## Interfaces: El Contrato

Una interfaz define la forma de un objeto. No genera código JS, desaparece al compilar.

```typescript
interface Producto {
    id: number;
    nombre: string;
    precio: number;
    descripcion?: string; // ? = Opcional. Puede estar o no.
    readonly sku: string; // readonly = No se puede modificar tras la creación.
}

const laptop: Producto = {
    id: 1,
    nombre: "MacBook Pro",
    precio: 2000,
    sku: "MBP-2023"
};

// laptop.sku = "OTRO-SKU"; // ❌ Error: Propiedad de solo lectura.
laptop.descripcion = "Potente"; // ✅ Propiedad opcional.
```

## Tipado Estructural en Acción

Observa esto con atención:

```typescript
interface Ballena {
    nadar(): void;
}

interface Pez {
    nadar(): void;
}

let willy: Ballena = { nadar: () => console.log("Nadando") };
let nemo: Pez = willy; // ✅ ¡Funciona!

// Para TS, Ballena y Pez son idénticos estructuralmente.
// No importa el NOMBRE de la interfaz, importa su CONTENIDO.
```

## Interfaces vs Type Aliases

Esta es la pregunta del millón. ¿Cuándo usar `interface` y cuándo `type`?

```typescript
// Interface
interface Animal {
    nombre: string;
}

// Type
type Mascota = {
    nombre: string;
};
```

### Diferencias Clave:

1.  **Extensibilidad (Declaration Merging):** Las interfaces están "abiertas".

    ```typescript
    interface Ventana {
        titulo: string;
    }
    
    // En otro archivo o librería...
    interface Ventana {
        ancho: number;
    }
    
    // TS fusiona ambas declaraciones. Ventana ahora tiene titulo Y ancho.
    ```
    Los `type` no pueden hacer esto. Si intentas redefinirlo, error.

2.  **Capacidades:**
    - `type` puede definir uniones, primitivos, tuplas. `interface` solo objetos.
    
    ```typescript
    type ID = string | number; // Interface no puede hacer esto.
    ```

**Veredicto Experto:**
- Usa `interface` para definir objetos, especialmente si estás escribiendo una librería pública (para que otros puedan extender tus interfaces).
- Usa `type` para uniones, intersecciones complejas, funciones o alias de primitivos.
- En aplicaciones (no librerías), la diferencia es mínima. Sé consistente.

## Extensión de Interfaces

Al igual que las clases heredan, las interfaces pueden extenderse.

```typescript
interface Vehiculo {
    ruedas: number;
}

interface Auto extends Vehiculo {
    puertas: number;
}

const miAuto: Auto = {
    ruedas: 4,
    puertas: 5
};
```

Esto fomenta la composición y el principio DRY (Don't Repeat Yourself).

## Index Signatures

A veces no sabes los nombres de las propiedades, pero sí su forma.

```typescript
interface DiccionarioDeErrores {
    [codigo: string]: string;
}

const errores: DiccionarioDeErrores = {
    "404": "No encontrado",
    "500": "Error interno",
    "AUTH_01": "No autorizado"
};
// Puedes agregar cualquier clave string, siempre que el valor sea string.
```

## Conclusión

Las interfaces son la columna vertebral de tus modelos de datos. Úsalas para definir claramente qué espera tu código y qué devuelve. Recuerda: `readonly` y `?` (opcional) son tus mejores herramientas para describir la realidad de tus datos con precisión.
