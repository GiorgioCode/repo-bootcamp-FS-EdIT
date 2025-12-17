# 07. Manipulación Avanzada y Utility Types

TypeScript viene con una "caja de herramientas" de tipos predefinidos que transforman otros tipos. Son vitales para no repetir código.

## Utility Types Más Comunes

Supongamos que tenemos este modelo:

```typescript
interface Todo {
    titulo: string;
    descripcion: string;
    completado: boolean;
    creadoEn: number;
}
```

### `Partial<T>`
Hace que todas las propiedades de T sean opcionales. Útil para actualizaciones (PATCH).

```typescript
function actualizarTodo(todo: Todo, camposAActualizar: Partial<Todo>) {
    return { ...todo, ...camposAActualizar };
}

// Solo paso descripción, y TS no se queja de que faltan los otros.
actualizarTodo(miTodo, { descripcion: "Nueva descripción" }); 
```

### `Required<T>`
Lo opuesto a Partial. Hace que todo sea obligatorio (elimina los `?`).

### `Readonly<T>`
Hace que todas las propiedades sean de solo lectura. Inmutabilidad instantánea.

```typescript
const todoInmutable: Readonly<Todo> = { ... };
// todoInmutable.titulo = "Cambio"; // ❌ Error
```

### `Pick<T, Keys>`
Crea un nuevo tipo seleccionando solo algunas propiedades de T.

```typescript
// Solo quiero mostrar un resumen en la lista
type TodoPreview = Pick<Todo, "titulo" | "completado">;

const preview: TodoPreview = {
    titulo: "Lavar platos",
    completado: false
    // descripcion: "..." // ❌ Error: No existe en TodoPreview
};
```

### `Omit<T, Keys>`
Lo opuesto a Pick. Crea un tipo eliminando ciertas propiedades.

```typescript
// Quiero todo MENOS la fecha de creación
type TodoSinFecha = Omit<Todo, "creadoEn">;
```

### `Record<Keys, Type>`
Para crear objetos diccionario/mapa de forma rápida.

```typescript
type NombrePagina = "home" | "about" | "contact";
interface InfoPagina { titulo: string; }

const navegacion: Record<NombrePagina, InfoPagina> = {
    home: { titulo: "Inicio" },
    about: { titulo: "Sobre Mí" },
    contact: { titulo: "Contacto" }
    // blog: { ... } // ❌ Error: 'blog' no es una clave válida.
};
```

## Operadores de Tipo

### `keyof`
Obtiene las claves de un tipo como una unión de strings literales.

```typescript
type ClavesDeTodo = keyof Todo; 
// Es equivalente a: "titulo" | "descripcion" | "completado" | "creadoEn"

function getPropiedad(obj: Todo, key: keyof Todo) {
    return obj[key];
}
```

### `typeof`
En JS, `typeof` devuelve un string ("string", "number"). En TS, usado en contexto de tipos, devuelve el **tipo** de una variable existente.

```typescript
const configuracion = {
    ancho: 100,
    alto: 200,
    tema: "oscuro"
};

// Quiero crear un tipo que sea igual a la estructura de esa variable
type Config = typeof configuracion;
// Config es { ancho: number; alto: number; tema: string; }
```

## Conclusión Final

Has llegado al final de esta guía maestra. TypeScript es profundo, y hay temas aún más oscuros (Conditional Types, Template Literal Types), pero con lo que has aprendido aquí, ya estás en el top tier de desarrolladores TS.

Recuerda:
1.  **Tipa con intención.**
2.  **Usa genéricos para reutilizar.**
3.  **Confía en el compilador.**

Ahora, ve y refactoriza ese archivo `.js` que te da miedo tocar. Tienes el poder.
