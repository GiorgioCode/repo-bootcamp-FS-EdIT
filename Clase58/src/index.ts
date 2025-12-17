/**
 * ARCHIVO PRINCIPAL: index.ts
 * 
 * Este es el punto de entrada de la aplicación. Aquí orquestamos todas las piezas:
 * - Creamos instancias de repositorios
 * - Creamos el servicio escolar
 * - Creamos objetos de estudiantes y profesores
 * - Realizamos operaciones y mostramos resultados
 * - Demostramos el manejo de errores
 * 
 * Este archivo demuestra cómo se usa toda la arquitectura que creamos.
 */

/**
 * IMPORTACIONES
 * 
 * Importamos todas las clases que necesitamos para ejecutar nuestra aplicación.
 * TypeScript resolverá las rutas relativas y verificará que las importaciones sean correctas.
 */
import { Repository } from "./repository/Repository";
import { Student } from "./models/Student";
import { Teacher } from "./models/Teacher";
import { SchoolService } from "./services/SchoolService";

/**
 * CREACIÓN DE REPOSITORIOS
 * 
 * GENÉRICOS EN ACCIÓN:
 * - Repository<Student> crea un repositorio que solo puede contener objetos Student
 * - Repository<Teacher> crea un repositorio que solo puede contener objetos Teacher
 * 
 * SEGURIDAD DE TIPOS:
 * Si intentamos agregar un Teacher a studentRepo, TypeScript nos dará un error
 * en tiempo de compilación (antes de ejecutar el código).
 * 
 * VENTAJA: No necesitamos crear clases separadas StudentRepository y TeacherRepository,
 * reutilizamos la misma clase genérica Repository con diferentes tipos.
 */
const studentRepo = new Repository<Student>();
const teacherRepo = new Repository<Teacher>();

/**
 * CREACIÓN DEL SERVICIO
 * 
 * INYECCIÓN DE DEPENDENCIAS:
 * Pasamos los repositorios que acabamos de crear al constructor de SchoolService.
 * SchoolService no crea sus propios repositorios, usa los que le damos.
 * 
 * VENTAJAS:
 * - Podemos compartir estos repositorios con otros servicios si lo necesitamos
 * - En tests, podríamos pasar repositorios mock con datos de prueba
 * - Tenemos control total sobre qué repositorios usa el servicio
 */
const school = new SchoolService(studentRepo, teacherRepo);

/**
 * CREACIÓN DE OBJETOS
 * 
 * TIPADO FUERTE DE TYPESCRIPT:
 * - TypeScript verifica que los argumentos sean del tipo correcto
 * - Student requiere: (number, string, number)
 * - Teacher requiere: (number, string, string)
 * 
 * Si intentamos crear: new Student("1", "Ana", 8)
 * TypeScript nos daría error porque "1" es string, no number
 * 
 * DATOS DE EJEMPLO:
 * Creamos 2 estudiantes con diferentes notas y 1 profesor
 */
const s1 = new Student(1, "Ana Pérez", 8);      // Estudiante aprobado (8 >= 6)
const s2 = new Student(2, "Carlos Gómez", 5);   // Estudiante desaprobado (5 < 6)
const t1 = new Teacher(101, "Dr. Ramírez", "Matemáticas");

/**
 * REGISTRO EN REPOSITORIOS
 * 
 * DELEGACIÓN AL SERVICIO:
 * En lugar de llamar directamente a studentRepo.add() o teacherRepo.add(),
 * usamos los métodos del servicio (enrollStudent, hireTeacher).
 * 
 * VENTAJAS:
 * - API más semántica y fácil de entender
 * - Si en el futuro enrollStudent necesita hacer más cosas (enviar emails, etc.),
 *   no tenemos que cambiar este código
 * - Abstracción: No necesitamos saber que existe un Repository
 */
school.enrollStudent(s1);
school.enrollStudent(s2);
school.hireTeacher(t1);

/**
 * USO DE MÉTODOS DEL SERVICIO - Descripciones
 * 
 * DEMOSTRACIÓN DE POLIMORFISMO:
 * describeAll() retorna un array de strings, cada uno generado por
 * el método describe() de cada objeto (Teacher o Student).
 * 
 * Cada clase implementa describe() de manera diferente, pero
 * podemos tratarlos uniformemente en el loop.
 */
console.log("--- Descripciones ---");

/**
 * FOR...OF LOOP
 * 
 * SINTAXIS: for (const variable of iterable)
 * - Itera sobre cada elemento del array retornado por describeAll()
 * - En cada iteración, 'd' contiene un string (una descripción)
 * 
 * EJEMPLO DE SALIDA:
 * --- Descripciones ---
 * Profesor: Dr. Ramírez (ID: 101) - Materia: Matemáticas
 * Estudiante: Ana Pérez (ID: 1) - Nota: 8
 * Estudiante: Carlos Gómez (ID: 2) - Nota: 5
 */
for (const d of school.describeAll()) {
    console.log(d);
}

/**
 * CÁLCULO DE PROMEDIO
 * 
 * LÓGICA DE NEGOCIO EN EL SERVICIO:
 * averageGrade() encapsula toda la lógica de calcular el promedio.
 * No necesitamos saber cómo lo hace, solo lo usamos.
 * 
 * RESULTADO ESPERADO: (8 + 5) / 2 = 6.5
 */
console.log("\nPromedio de notas:", school.averageGrade());

/**
 * FILTRADO DE ESTUDIANTES APROBADOS
 * 
 * ENCADENAMIENTO DE MÉTODOS:
 * 1. school.passingStudents() retorna Student[]
 * 2. .map() transforma cada Student en su nombre (string)
 * 3. El resultado final es string[]
 * 
 * MÉTODO MAP():
 * - Array.map() transforma cada elemento de un array
 * - Arrow function: (s) => s.getName()
 * - Convierte [Student, Student] en ["nombre1", "nombre2"]
 * 
 * EJEMPLO PASO A PASO:
 * passingStudents() retorna: [Student(id:1, name:"Ana Pérez", grade:8)]
 * (Carlos no está porque 5 < 6)
 * 
 * map((s) => s.getName()) transforma:
 * [Student(1, "Ana Pérez", 8)] → ["Ana Pérez"]
 * 
 * SALIDA ESPERADA: Alumnos aprobando: [ 'Ana Pérez' ]
 */
console.log(
    "Alumnos aprobando:",
    school.passingStudents().map((s) => s.getName())
);

/**
 * MANEJO DE ERRORES CON TRY-CATCH
 * 
 * DEMOSTRACIÓN DE VALIDACIÓN:
 * Intentamos agregar un estudiante con ID duplicado (ID: 1)
 * Ya existe s1 con ID 1, por lo que Repository.add() lanzará un error
 * 
 * BLOQUES TRY-CATCH:
 * - try: Contiene código que podría lanzar errores
 * - catch: Se ejecuta solo si ocurre un error en el bloque try
 * 
 * FLUJO:
 * 1. Creamos un Student con ID duplicado (1)
 * 2. Intentamos agregarlo directamente al repositorio
 * 3. Repository.add() detecta que ya existe ID 1
 * 4. Repository.add() lanza un Error
 * 5. El control salta al bloque catch
 * 6. Imprimimos el mensaje de error
 */
try {
    /**
     * Creamos un estudiante con ID 1 (duplicado)
     * Esto es válido en sí mismo, el problema es al intentar agregarlo
     */
    const duplicate = new Student(1, "Duplicado", 7);

    /**
     * NOTA: Aquí llamamos directamente a studentRepo.add()
     * En lugar de school.enrollStudent() para demostrar el acceso directo
     * al repositorio y su validación de IDs duplicados
     */
    studentRepo.add(duplicate);

    /**
     * Esta línea NUNCA se ejecutará porque add() lanzará un error antes
     */
} catch (err) {
    /**
     * MANEJO DEL ERROR
     * 
     * TYPE ASSERTION: (err as Error)
     * - En JavaScript/TypeScript, catch recibe un parámetro de tipo 'unknown' (o 'any')
     * - Podría ser un Error, un string, un número, o cualquier cosa
     * - Usamos 'as Error' para decirle a TypeScript que trate err como Error
     * - Esto nos permite acceder a err.message
     * 
     * MEJORA POSIBLE:
     * Podríamos verificar si err es una instancia de Error:
     * if (err instanceof Error) {
     *     console.error("Error:", err.message);
     * } else {
     *     console.error("Error desconocido:", err);
     * }
     * 
     * SALIDA ESPERADA:
     * Error al agregar elemento: Elemento con id 1 ya existe
     */
    console.error("Error al agregar elemento:", (err as Error).message);
}

/**
 * RESUMEN DE CONCEPTOS DEMOSTRADOS EN ESTE ARCHIVO:
 * 
 * 1. IMPORTACIONES: Organización modular del código
 * 2. GENÉRICOS: Repository<Student> vs Repository<Teacher>
 * 3. INYECCIÓN DE DEPENDENCIAS: Pasar repositorios al servicio
 * 4. TIPADO FUERTE: TypeScript verifica tipos en tiempo de compilación
 * 5. ENCAPSULACIÓN: Usar métodos del servicio en lugar de repositorios directos
 * 6. POLIMORFISMO: describe() implementado diferente en cada clase
 * 7. MÉTODOS DE ARRAYS: map(), filter() (usado dentro de passingStudents)
 * 8. TEMPLATE LITERALS: Usados en los console.log con \n
 * 9. MANEJO DE ERRORES: try-catch para capturar excepciones
 * 10. TYPE ASSERTION: (err as Error) para acceder a propiedades específicas
 * 
 * ARQUITECTURA DEL PROYECTO:
 * 
 * index.ts (este archivo) ← Orquestación / Punto de entrada
 *     ↓ usa
 * SchoolService ← Lógica de negocio / Coordinación
 *     ↓ delega a
 * Repository<T> ← Gestión de datos / CRUD
 *     ↓ almacena
 * Student, Teacher ← Modelos de dominio / Entidades
 *     ↓ heredan de
 * Person ← Clase base abstracta / Comportamiento común
 */
