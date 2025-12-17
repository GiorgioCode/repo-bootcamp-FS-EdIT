# Guía detallada: uso de `super` en TypeScript

**Resumen**
Esta guía explica en detalle el operador `super` dentro del contexto de clases en TypeScript. Contiene teoría, buenas prácticas, ejemplos comentados paso a paso y soluciones a errores comunes. Está pensada para desarrolladores que ya conocen los conceptos básicos de TypeScript y clases, pero quieren dominar cómo y cuándo usar `super`.

---

## Tabla de contenidos

1. Introducción: qué es `super`
2. Herencia básica y `super()` en constructores
3. Llamar a métodos heredados con `super.method()`
4. Acceso a propiedades del prototipo padre
5. `super` y modificadores (`private`, `protected`, `public`)
6. `this` vs `super` — orden de inicialización y errores frecuentes
7. `super` con métodos estáticos
8. `super` en clases abstractas y genéricas
9. Mixins y patrones avanzados con `super`
10. Compatibilidad de compilación: target ES5 vs ES2015+
11. Ejemplos completos y prácticas recomendadas
12. Resumen y checklist rápido

---

## 1. Introducción: qué es `super`

En TypeScript (y JavaScript moderno), `super` es una referencia al prototipo o a la clase padre desde una clase hija. Sirve principalmente para dos cosas:

-   Invocar el constructor de la clase padre (`super(...)`) dentro del constructor de la subclase.
-   Invocar métodos o acceder a propiedades del prototipo padre usando `super.metodo()`.

TypeScript añade tipos y comprobaciones estáticas alrededor de estos usos.

---

## 2. Herencia básica y `super()` en constructores

**Regla principal:** si una clase `extends` de otra y defines un constructor en la subclase, debes llamar a `super(...)` antes de usar `this`. De lo contrario, TypeScript / JavaScript lanzarán un error.

Ejemplo mínimo con comentarios paso a paso:

```ts
// Clase padre (base)
class Animal {
    // propiedad pública
    name: string;

    // constructor de la clase padre
    constructor(name: string) {
        // asignamos la propiedad
        this.name = name; // OK: 'this' es accesible aquí (estamos en la clase base)
    }

    // método de instancia
    speak() {
        return `${this.name} hace un sonido.`;
    }
}

// Clase hija que extiende Animal
class Dog extends Animal {
    breed: string;

    // constructor de la subclase
    constructor(name: string, breed: string) {
        // Antes de usar 'this', ES OBLIGATORIO llamar a super(...)
        super(name); // llama al constructor de Animal

        // ahora podemos usar 'this' sin problemas
        this.breed = breed; // asignamos la propiedad propia
    }

    // sobreescribimos speak
    speak() {
        // podemos llamar al método del padre si queremos su comportamiento
        const parent = super.speak(); // invoca Animal.prototype.speak
        return `${parent} Es un ${this.breed}.`;
    }
}

const d = new Dog("Rex", "Labrador");
console.log(d.speak()); // "Rex hace un sonido. Es un Labrador."
```

**Puntos importantes:**

-   `super(name)` ejecuta `Animal`'s constructor. Si la clase padre necesita parámetros, pásalos.
-   No puedes usar `this` antes de `super(...)` en la subclase con constructor propio.

---

## 3. Llamar a métodos heredados con `super.method()`

`super` puede invocar métodos definidos en la clase padre. Esto es útil para extender comportamiento sin duplicar lógica.

```ts
class Logger {
    log(message: string) {
        console.log("[LOG]", message);
    }
}

class TimestampLogger extends Logger {
    log(message: string) {
        // añadimos marca de tiempo y delegamos al padre
        const ts = new Date().toISOString();
        super.log(`${ts} - ${message}`); // llama Logger.log
    }
}

const lg = new TimestampLogger();
lg.log("Hola"); // imprime: [LOG] 2025-... - Hola
```

**Nota:** `super.log(...)` llama exactamente al método del prototipo padre, no a la implementación que pudiera venir de la misma clase.

---

## 4. Acceso a propiedades del prototipo padre

TypeScript no permite usar `super.prop` para acceder directamente a propiedades de instancia definidas en el constructor padre (porque `super` se refiere al prototipo, no a la instancia). Sin embargo, `super` se usa principalmente para métodos. Para propiedades, normalmente accedes a través de `this` (ya que la propiedad fue inicializada por `super(...)`).

Ejemplo ilustrativo:

```ts
class Parent {
    value = 42; // propiedad de instancia

    getValue() {
        return this.value;
    }
}

class Child extends Parent {
    getParentValueViaThis() {
        return this.getValue(); // resolve -> Parent.getValue usa this.value
    }

    // intentos con `super.value` no obtendrán la propiedad de instancia
    // porque `super` apunta al prototipo, no al objeto instancia.
}
```

Si quieres leer directamente una propiedad del prototipo (por ejemplo un getter definido en la clase padre), puedes usar `super.miGetter` desde un método:

```ts
class A {
    get x() {
        return 1;
    }
}
class B extends A {
    getParentX() {
        return super.x; // lee getter de A
    }
}
```

---

## 5. `super` y modificadores (`private`, `protected`, `public`)

-   `private`: miembros `private` no son accesibles en subclases directamente. Incluso `super` no permite saltar el encapsulamiento.
-   `protected`: accesible desde subclases.
-   `public`: accesible desde cualquier lado.

```ts
class Base {
    private secret = "no visible en subclase";
    protected protectedValue = "visible en subclase";
}

class Sub extends Base {
    // no puedo usar this.secret -> error
    readProtected() {
        return this.protectedValue; // OK
    }
}
```

`super` no cambia estas reglas: no permite acceder a `private`.

---

## 6. `this` vs `super` — orden de inicialización y errores frecuentes

Errores frecuentes:

-   **Usar `this` antes de `super(...)` en constructor de subclase** => `ReferenceError` en tiempo de ejecución.
-   **Olvidar llamar `super(...)` cuando la clase padre necesita inicialización** => mala inicialización o error.

Ejemplo de error:

```ts
class A {
    constructor(public n: number) {}
}
class B extends A {
    constructor() {
        // console.log(this.n); // ERROR: 'this' antes de super
        super(5);
    }
}
```

TypeScript suele advertir este error en compilación.

---

## 7. `super` con métodos estáticos

También puedes usar `super` para referirte a métodos estáticos del padre desde una subclase estática.

```ts
class ParentStatic {
    static create() {
        return new ParentStatic();
    }
}

class ChildStatic extends ParentStatic {
    static create() {
        // Llamamos a create del padre y luego lo extendemos
        const p = super.create(); // invoca ParentStatic.create
        // hacemos algo con p si hace falta
        return p;
    }
}
```

`super` en contexto estático hace referencia a la clase padre (función constructora) y no al prototipo de instancias.

---

## 8. `super` en clases abstractas y genéricas

`super` funciona igual con `abstract` y `generic`.

```ts
abstract class Repository<T> {
    constructor(protected source: string) {}
    abstract findById(id: string): T | null;
}

class UserRepo extends Repository<User> {
    constructor(source: string) {
        super(source); // obligatorio
    }
    findById(id: string) {
        /* ... */ return null;
    }
}
```

No hay comportamientos especiales; asegúrate de pasar argumentos al constructor base.

---

## 9. Mixins y patrones avanzados con `super`

En patrones con mixins (funciones que devuelven clases extendidas), `super` puede seguir funcionando si la jerarquía prototípica está montada correctamente.

Ejemplo de mixin simple:

```ts
type Constructor<T = {}> = new (...args: any[]) => T;

function Timestamped<TBase extends Constructor>(Base: TBase) {
    return class extends Base {
        createdAt = new Date();

        getCreation() {
            // si la clase Base tiene el mismo método, podemos llamarlo
            // super['getCreation']?.(); // uso condicional si existe
            return this.createdAt;
        }
    };
}

class Model {
    id = Math.random();
}

const TimestampedModel = Timestamped(Model);
const m = new TimestampedModel();
console.log(m.getCreation());
```

Ten presente las reglas de TypeScript y del runtime: `super` siempre refiere al prototipo padre dinámico.

---

## 10. Compatibilidad de compilación: target ES5 vs ES2015+

TypeScript transpila `class` y `super` a diferentes formas dependiendo del `target` en `tsconfig.json`:

-   `target: "es5"` -> TypeScript emula herencia y `super` usando helpers (`__extends`) y llamadas explícitas.
-   `target: "es2015"` o superior -> se preserva gran parte del código de clase nativo y `super` se mantiene como tal.

**Consejo:** si necesitas `super` con comportamiento de prototipos nativo (por ejemplo para edge cases avanzados), apunta a `es2015`+.

---

## 11. Ejemplos completos y prácticas recomendadas

### Ejemplo 1 — Extensión y sobre-escritura segura

```ts
// Clase base con validaciones
class Validator {
    validate(value: any) {
        return value != null;
    }
}

// Clase hija que extiende la lógica
class NumberValidator extends Validator {
    validate(value: any) {
        // primero reutilizamos la validación del padre
        if (!super.validate(value)) return false; // llama Validator.validate

        // luego añadimos más reglas
        return typeof value === "number";
    }
}
```

### Ejemplo 2 — `super` en métodos estáticos y uso combinado

```ts
class Factory {
    static make(type: string) {
        return { type };
    }
}

class ExtendedFactory extends Factory {
    static make(type: string) {
        const base = super.make(type); // invoca Factory.make
        return { ...base, createdAt: new Date() };
    }
}
```

### Buenas prácticas rápidas

-   Siempre llama a `super(...)` en el constructor de la subclase antes de usar `this`.
-   Usa `super.method()` para extender, no para reemplazar sin motivo.
-   Prefiere `protected` para miembros que deben estar disponibles en subclases.
-   Ten cuidado con mixins: comprueba la jerarquía prototípica.

---

## 12. Resumen y checklist rápido

-   ¿La subclase define constructor? -> llamar `super(...)` primero.
-   ¿Necesitas reutilizar lógica del padre? -> `super.metodo(...)`.
-   ¿Accedes a propiedades del padre? -> normalmente `this.prop`, o `super.getter` si se trata de un getter.
-   ¿Constructor del padre acepta parámetros? -> pásalos en `super(...)`.
-   ¿Error "Must call super constructor in derived class before accessing 'this'"? -> revisa el orden.

---

### Código de referencia completo (archivo) — ejemplo final

```ts
// Ejemplo final que combina conceptos
class Person {
    constructor(public name: string) {}
    greet() {
        return `Hola, soy ${this.name}`;
    }
}

class Employee extends Person {
    constructor(name: string, public role: string) {
        // 1) Llamamos al constructor del padre con 'name'
        super(name);
        // 2) Inicializamos propiedades propias
        this.role = role;
    }

    // 3) Extender el comportamiento del método 'greet'
    greet() {
        // llamamos la version del padre
        const base = super.greet();
        return `${base} y trabajo como ${this.role}`;
    }
}

const e = new Employee("Ana", "Ingeniera");
console.log(e.greet()); // "Hola, soy Ana y trabajo como Ingeniera"
```

---
