/**
 * IMPORTACIONES
 * Importamos las clases necesarias para que el servicio funcione
 */
import { Repository } from "../repository/Repository";
import { Student } from "../models/Student";
import { Teacher } from "../models/Teacher";

/**
 * Clase SchoolService (Servicio Escolar)
 * 
 * PATRÓN SERVICE (CAPA DE SERVICIO):
 * Esta clase implementa el patrón "Service Layer" que coordina la lógica
 * de negocio y actúa como intermediario entre el código que usa la aplicación
 * (index.ts) y los repositorios de datos.
 * 
 * RESPONSABILIDADES:
 * - Coordinar operaciones que involucran múltiples repositorios
 * - Implementar lógica de negocio compleja (cálculos, filtros, validaciones)
 * - Proporcionar una API simple y clara para el resto de la aplicación
 * 
 * CONCEPTO DE COMPOSICIÓN:
 * En lugar de heredar funcionalidad, SchoolService COMPONE (contiene) instancias
 * de Repository. Esto es "Composición sobre Herencia", un principio de diseño.
 * 
 * VENTAJAS:
 * 1. Separación de Responsabilidades: Repository maneja datos, Service maneja lógica
 * 2. Reutilización: Podemos usar el mismo Repository en diferentes servicios
 * 3. Testabilidad: Fácil de probar pasando repositorios mock
 * 4. Flexibilidad: Podemos cambiar la implementación del Repository sin cambiar el Service
 */
export class SchoolService {
    /**
     * PROPIEDADES PRIVADAS: Repositorios
     * 
     * Guardamos referencias a repositorios específicos:
     * - studentRepo: Maneja la colección de estudiantes
     * - teacherRepo: Maneja la colección de profesores
     * 
     * Son private porque solo SchoolService necesita acceder a ellos directamente
     * El código externo interactúa con SchoolService, no con los repositorios
     */
    private studentRepo: Repository<Student>;
    private teacherRepo: Repository<Teacher>;

    /**
     * CONSTRUCTOR con Inyección de Dependencias
     * 
     * @param studentRepo - Repositorio de estudiantes a usar
     * @param teacherRepo - Repositorio de profesores a usar
     * 
     * PATRÓN: INYECCIÓN DE DEPENDENCIAS (Dependency Injection)
     * En lugar de crear los repositorios internamente (new Repository<Student>()),
     * los recibimos como parámetros. Esto tiene varias ventajas:
     * 
     * VENTAJAS:
     * 1. Flexibilidad: Podemos pasar diferentes implementaciones de repositorios
     * 2. Testabilidad: En tests, podemos pasar repositorios mock con datos de prueba
     * 3. Reutilización: Podemos compartir los mismos repositorios entre varios servicios
     * 4. Control: El código que crea SchoolService decide qué repositorios usar
     * 
     * EJEMPLO DE USO (en index.ts):
     * const studentRepo = new Repository<Student>();
     * const teacherRepo = new Repository<Teacher>();
     * const school = new SchoolService(studentRepo, teacherRepo);
     */
    constructor(
        studentRepo: Repository<Student>,
        teacherRepo: Repository<Teacher>
    ) {
        // Guardamos las referencias para usarlas en otros métodos
        this.studentRepo = studentRepo;
        this.teacherRepo = teacherRepo;
    }

    /**
     * MÉTODO: enrollStudent() - Inscribir estudiante
     * 
     * @param student - El estudiante a inscribir
     * 
     * PATRÓN: DELEGACIÓN
     * Este método NO implementa la lógica de agregar, simplemente DELEGA
     * esa responsabilidad al repositorio.
     * 
     * VENTAJAS:
     * 1. Abstracción: El código que llama a enrollStudent no necesita saber que existe un Repository
     * 2. Punto de extensión: Podemos agregar lógica adicional aquí en el futuro
     *    (ej: enviar email de bienvenida, validar cupos, etc.)
     * 3. API semántica: "enrollStudent" es más descriptivo que "add"
     * 
     * EJEMPLO DE EXTENSIÓN FUTURA:
     * public enrollStudent(student: Student): void {
     *     // Validar que hay cupos disponibles
     *     if (this.studentRepo.getAll().length >= 100) {
     *         throw new Error("No hay cupos disponibles");
     *     }
     *     // Enviar email de bienvenida
     *     emailService.sendWelcome(student);
     *     // Finalmente, agregar al repositorio
     *     this.studentRepo.add(student);
     * }
     */
    public enrollStudent(student: Student): void {
        // Delegamos al repositorio la tarea de agregar
        this.studentRepo.add(student);
    }

    /**
     * MÉTODO: averageGrade() - Calcular promedio de calificaciones
     * 
     * @returns {number} El promedio de todas las calificaciones, o 0 si no hay estudiantes
     * 
     * LÓGICA DE NEGOCIO:
     * Este método implementa lógica que no pertenece al Repository (que solo
     * guarda/recupera datos) ni a Student (que representa un estudiante individual).
     * El Service es el lugar apropiado para lógica que involucra MÚLTIPLES entidades.
     */
    public averageGrade(): number {
        // Obtenemos todos los estudiantes del repositorio
        const students = this.studentRepo.getAll();

        /**
         * VALIDACIÓN: Evitar división por cero
         * Si no hay estudiantes, retornamos 0 en lugar de calcular
         * 
         * Sin esta validación, obtendríamos NaN (Not a Number):
         * 0 / 0 = NaN en JavaScript
         */
        if (students.length === 0) return 0;

        /**
         * MÉTODO REDUCE():
         * reduce() es un método potente que "reduce" un array a un solo valor
         * 
         * SINTAXIS: array.reduce((acumulador, elementoActual) => nuevaAcumulacion, valorInicial)
         * 
         * PARÁMETROS:
         * - acc (acumulador): Valor que vamos acumulando, empieza en 0
         * - s (elemento actual): Cada Student en el array
         * - 0: Valor inicial del acumulador
         * 
         * FUNCIONAMIENTO PASO A PASO:
         * students = [Student(grade:8), Student(grade:5), Student(grade:7)]
         * 
         * Iteración 1: acc=0,  s.grade=8  →  return 0 + 8   →  acc=8
         * Iteración 2: acc=8,  s.grade=5  →  return 8 + 5   →  acc=13
         * Iteración 3: acc=13, s.grade=7  →  return 13 + 7  →  acc=20
         * 
         * Resultado final: sum = 20
         * 
         * ALTERNATIVA (menos elegante):
         * let sum = 0;
         * for (const s of students) {
         *     sum += s.grade;
         * }
         */
        const sum = students.reduce((acc, s) => acc + s.grade, 0);

        /**
         * CÁLCULO DEL PROMEDIO
         * Dividimos la suma total entre la cantidad de estudiantes
         * 
         * EJEMPLO:
         * sum = 20, students.length = 3
         * promedio = 20 / 3 = 6.666...
         */
        return sum / students.length;
    }

    /**
     * MÉTODO: passingStudents() - Obtener estudiantes que están aprobando
     * 
     * @returns {Student[]} Array con los estudiantes que tienen nota >= 6
     * 
     * LÓGICA DE NEGOCIO:
     * Filtra los estudiantes usando su método isPassing()
     * Esto demuestra cómo la lógica de negocio puede estar distribuida:
     * - Student.isPassing() define qué significa "aprobar" para un estudiante
     * - SchoolService.passingStudents() aplica ese criterio a todos los estudiantes
     */
    public passingStudents(): Student[] {
        /**
         * MÉTODO FILTER():
         * filter() crea un nuevo array solo con los elementos que cumplen la condición
         * 
         * SINTAXIS: array.filter((elemento) => condiciónBooleana)
         * 
         * EJEMPLO PASO A PASO:
         * students = [Student(grade:8), Student(grade:5), Student(grade:7)]
         * 
         * Student(grade:8).isPassing() → 8>=6 → true ✓ (se incluye)
         * Student(grade:5).isPassing() → 5>=6 → false ✗ (se excluye)
         * Student(grade:7).isPassing() → 7>=6 → true ✓ (se incluye)
         * 
         * Resultado: [Student(grade:8), Student(grade:7)]
         * 
         * VENTAJA DE USAR isPassing():
         * Si en el futuro cambia el criterio de aprobación (ej: >= 7),
         * solo modificamos Student.isPassing(), no este código.
         */
        return this.studentRepo.getAll().filter((s) => s.isPassing());
    }

    /**
     * MÉTODO: hireTeacher() - Contratar profesor
     * 
     * @param teacher - El profesor a contratar
     * 
     * Similar a enrollStudent(), pero para profesores
     * Delega al repositorio de profesores
     */
    public hireTeacher(teacher: Teacher): void {
        // Delegamos al repositorio la tarea de agregar
        this.teacherRepo.add(teacher);
    }

    /**
     * MÉTODO: describeAll() - Obtener descripciones de todos
     * 
     * @returns {string[]} Array de strings, cada uno describiendo una persona
     * 
     * POLIMORFISMO EN ACCIÓN:
     * Este método demuestra el poder del polimorfismo:
     * - Llamamos a describe() tanto en Teacher como en Student
     * - Cada uno retorna una descripción apropiada a su tipo
     * - No necesitamos saber si es Teacher o Student, solo que tiene describe()
     * 
     * COORDINACIÓN DE MÚLTIPLES REPOSITORIOS:
     * Este método combina datos de dos repositorios diferentes
     * Esto es típico de un Service: coordinar operaciones entre múltiples fuentes
     */
    public describeAll(): string[] {
        /**
         * Creamos un array vacío para acumular las descripciones
         * Especificamos el tipo string[] para claridad
         */
        const descriptions: string[] = [];

        /**
         * FOR...OF LOOP - Profesores
         * 
         * SINTAXIS: for (const elemento of array)
         * Itera sobre cada profesor en el repositorio
         * 
         * PASO A PASO:
         * 1. teacherRepo.getAll() retorna Teacher[]
         * 2. En cada iteración, t contiene un Teacher
         * 3. Llamamos t.describe() que retorna un string
         * 4. Agregamos ese string al array descriptions
         */
        for (const t of this.teacherRepo.getAll()) {
            // push() agrega al final del array
            descriptions.push(t.describe());
        }

        /**
         * FOR...OF LOOP - Estudiantes
         * 
         * Igual que con profesores, pero con estudiantes
         * Agregamos al mismo array, después de los profesores
         */
        for (const s of this.studentRepo.getAll()) {
            descriptions.push(s.describe());
        }

        /**
         * RESULTADO FINAL:
         * Un array que contiene primero las descripciones de todos los profesores,
         * y luego las descripciones de todos los estudiantes
         * 
         * EJEMPLO:
         * [
         *   "Profesor: Dr. Ramírez (ID: 101) - Materia: Matemáticas",
         *   "Estudiante: Ana Pérez (ID: 1) - Nota: 8",
         *   "Estudiante: Carlos Gómez (ID: 2) - Nota: 5"
         * ]
         */
        return descriptions;
    }
}
