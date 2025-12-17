# Guía: Proyecto ejemplo en Node.js usando TypeScript y Programación Orientada a Objetos

**Resumen**: esta guía paso a paso crea un pequeño proyecto Node.js escrito en TypeScript que muestra ventajas de TypeScript (tipado estático, interfaces, genéricos) y conceptos de Programación Orientada a Objetos (clases, herencia, encapsulación, polimorfismo). Incluye todos los archivos necesarios, comandos de consola y el código totalmente comentado.

---

## Estructura del proyecto (final)

```
ts-node-oop-example/
├─ package.json
├─ tsconfig.json
├─ README.md    <- (este archivo)
└─ src/
   ├─ index.ts
   ├─ models/
   │  ├─ Person.ts
   │  ├─ Student.ts
   │  └─ Teacher.ts
   ├─ repository/
   │  └─ Repository.ts
   └─ services/
      └─ SchoolService.ts
```

---

## Requisitos

-   Node.js (>=14 recomendado)
-   npm

---

## Paso 1 — Inicializar proyecto

Abre una terminal y ejecuta los siguientes comandos:

```bash
# Crear carpeta del proyecto y moverse a ella
mkdir ts-node-oop-example
cd ts-node-oop-example

# Inicializar package.json
npm init -y

# Instalar TypeScript y herramientas de desarrollo
npm install --save-dev typescript ts-node @types/node

# Instalamos también nodemon opcionalmente para desarrollo (opcional)
npm install --save-dev nodemon
```

---

## Paso 2 — Configurar TypeScript

Crea un archivo `tsconfig.json` en la raíz con este contenido:

```json
{
    "compilerOptions": {
        "target": "ES2020",
        "module": "commonjs",
        "rootDir": "src",
        "outDir": "dist",
        "strict": true,
        "esModuleInterop": true,
        "forceConsistentCasingInFileNames": true,
        "skipLibCheck": true
    }
}
```

Breve explicación de opciones importantes:

-   `strict: true` activa chequeos estrictos (muy recomendado para aprovechar TypeScript).
-   `rootDir` y `outDir` separan código fuente y compilado.

---

## Paso 3 — Scripts en package.json

Abre `package.json` y agrega los scripts para compilar y ejecutar:

```json
"scripts": {
  "build": "tsc",
  "start": "node dist/index.js",
  "dev": "ts-node src/index.ts",
  "watch": "nodemon --watch 'src/**/*.ts' --exec 'ts-node' src/index.ts"
}
```

-   `dev` ejecuta directamente con `ts-node` (útil mientras desarrollas).
-   `build` + `start` es el flujo de producción (compilar -> node).

---

## Paso 4 — Código fuente (con comentarios detallados)

A continuación se presentan los archivos con comentarios inline explicativos. Crea la carpeta `src` y sus subcarpetas `models`, `repository`, `services`.

### `src/models/Person.ts`

```ts
// Clase base Person: muestra encapsulación y uso de modificadores de acceso
export abstract class Person {
    // protected permite que las clases hijas accedan a la propiedad
    protected id: number;
    protected name: string;

    // El constructor inicializa los campos obligatorios
    constructor(id: number, name: string) {
        this.id = id;
        this.name = name;
    }

    // getter público para obtener el nombre (ejemplo de encapsulación)
    public getName(): string {
        return this.name;
    }

    // setter que valida antes de asignar
    public setName(newName: string): void {
        if (!newName || newName.trim().length === 0) {
            throw new Error("El nombre no puede estar vacío");
        }
        this.name = newName.trim();
    }

    // método abstracto: obliga a las subclases a implementarlo (polimorfismo)
    public abstract describe(): string;
}
```

### `src/models/Student.ts`

```ts
import { Person } from "./Person";

// Student extiende Person — ejemplo de herencia
export class Student extends Person {
    // propiedad pública con tipado explícito
    public grade: number;

    constructor(id: number, name: string, grade: number) {
        super(id, name); // llamar al constructor de la clase base
        this.grade = grade;
    }

    // Implementación del método abstracto
    public describe(): string {
        return `Estudiante: ${this.getName()} (ID: ${this.id}) - Nota: ${
            this.grade
        }`;
    }

    // método específico de Student
    public isPassing(): boolean {
        return this.grade >= 6; // ejemplo de regla de negocio
    }
}
```

> **Nota**: `this.id` es `protected` en la clase base, por lo que la clase derivada puede accederla.

### `src/models/Teacher.ts`

```ts
import { Person } from "./Person";

// Teacher extiende Person — otra subclase para mostrar polimorfismo
export class Teacher extends Person {
    private subject: string; // private: sólo accesible dentro de Teacher

    constructor(id: number, name: string, subject: string) {
        super(id, name);
        this.subject = subject;
    }

    public describe(): string {
        return `Profesor: ${this.getName()} (ID: ${this.id}) - Materia: ${
            this.subject
        }`;
    }

    public getSubject(): string {
        return this.subject;
    }
}
```

### `src/repository/Repository.ts`

```ts
// Un repositorio genérico con un tipo T que extienda un objeto con id:number
// demuestra genéricos y restricciones de tipos.

export class Repository<T extends { id: number }> {
    // Guardamos los elementos en memoria en un array
    private items: T[] = [];

    // Agrega un elemento al repositorio
    public add(item: T): void {
        // Validación simple: no permitir IDs duplicados
        if (this.items.some((i) => i.id === item.id)) {
            throw new Error(`Elemento con id ${item.id} ya existe`);
        }
        this.items.push(item);
    }

    // Obtener por ID
    public getById(id: number): T | undefined {
        return this.items.find((i) => i.id === id);
    }

    // Listar todos
    public getAll(): T[] {
        // retornamos una copia para evitar mutaciones desde afuera
        return [...this.items];
    }

    // Remover por ID
    public removeById(id: number): boolean {
        const originalLength = this.items.length;
        this.items = this.items.filter((i) => i.id !== id);
        return this.items.length !== originalLength; // true si algo se removió
    }
}
```

### `src/services/SchoolService.ts`

```ts
import { Repository } from "../repository/Repository";
import { Student } from "../models/Student";
import { Teacher } from "../models/Teacher";

// Servicio que compone repositorios. Ejemplo de composición y separación de responsabilidades
export class SchoolService {
    private studentRepo: Repository<Student>;
    private teacherRepo: Repository<Teacher>;

    constructor(
        studentRepo: Repository<Student>,
        teacherRepo: Repository<Teacher>
    ) {
        this.studentRepo = studentRepo;
        this.teacherRepo = teacherRepo;
    }

    // Agregar estudiante (delegación al repositorio)
    public enrollStudent(student: Student): void {
        this.studentRepo.add(student);
    }

    // Calcular promedio de estudiantes
    public averageGrade(): number {
        const students = this.studentRepo.getAll();
        if (students.length === 0) return 0;
        const sum = students.reduce((acc, s) => acc + s.grade, 0);
        return sum / students.length;
    }

    // Listar quiénes están aprobando
    public passingStudents(): Student[] {
        return this.studentRepo.getAll().filter((s) => s.isPassing());
    }

    // Registrar profesor
    public hireTeacher(teacher: Teacher): void {
        this.teacherRepo.add(teacher);
    }

    // Mostrar una descripción corta de todo el personal
    public describeAll(): string[] {
        const descriptions: string[] = [];
        for (const t of this.teacherRepo.getAll()) {
            descriptions.push(t.describe());
        }
        for (const s of this.studentRepo.getAll()) {
            descriptions.push(s.describe());
        }
        return descriptions;
    }
}
```

### `src/index.ts` (archivo principal)

```ts
import { Repository } from "./repository/Repository";
import { Student } from "./models/Student";
import { Teacher } from "./models/Teacher";
import { SchoolService } from "./services/SchoolService";

// Crear repositorios específicos para Student y Teacher
const studentRepo = new Repository<Student>();
const teacherRepo = new Repository<Teacher>();

// Instanciar el servicio que coordina la lógica
const school = new SchoolService(studentRepo, teacherRepo);

// Crear algunos objetos (tipado fuerte garantizado por TypeScript)
const s1 = new Student(1, "Ana Pérez", 8);
const s2 = new Student(2, "Carlos Gómez", 5);
const t1 = new Teacher(101, "Dr. Ramírez", "Matemáticas");

// Registrar en repositorios
school.enrollStudent(s1);
school.enrollStudent(s2);
school.hireTeacher(t1);

// Uso de métodos del servicio
console.log("--- Descripciones ---");
for (const d of school.describeAll()) {
    console.log(d);
}

console.log("\nPromedio de notas:", school.averageGrade());
console.log(
    "Alumnos aprobando:",
    school.passingStudents().map((s) => s.getName())
);

// Ejemplo de manejo de errores: intentar agregar un estudiante con ID duplicado
try {
    const duplicate = new Student(1, "Duplicado", 7);
    studentRepo.add(duplicate);
} catch (err) {
    // Gracias al tipado, err se asume any; imprimimos mensaje
    console.error("Error al agregar elemento:", (err as Error).message);
}
```

---

## Paso 5 — Ejecutar en modo desarrollo

En la terminal:

```bash
# Ejecutar con ts-node (sin compilar a disco)
npm run dev

# Alternativa: con watch (nodemon) - si instalaste nodemon
npm run watch
```

Verás en consola las descripciones, promedio y lista de alumnos aprobando.

---

## Paso 6 — Compilar y ejecutar en producción

```bash
# Compilar a JavaScript en la carpeta dist
npm run build

# Ejecutar el bundle compilado
npm run start
```

---

## ¿Qué conceptos de TypeScript y OOP muestra este ejemplo?

**TypeScript**

-   Tipado estático: clases, parámetros y retornos con tipos (`string`, `number`, `boolean`).
-   `strict` y chequeos en tiempo de compilación.
-   Genéricos: `Repository<T>` muestra cómo crear tipos reutilizables y seguros.
-   Modificadores de acceso (`private`, `protected`, `public`).
-   Inferencia y anotaciones: ayuda a detectar errores temprano.

**Programación Orientada a Objetos**

-   Clases y objetos: `Person`, `Student`, `Teacher`.
-   Herencia: `Student` y `Teacher` extienden `Person`.
-   Polimorfismo: `describe()` es abstracto en `Person` y se implementa distinto en cada subclase.
-   Encapsulamiento: accesos controlados a propiedades vía getters/setters.
-   Composición: `SchoolService` usa `Repository` para separar responsabilidades.

---
