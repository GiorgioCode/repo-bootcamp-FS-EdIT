/**
 * IMPORTACIÓN de la clase Person
 * 
 * Usamos destructuring para importar solo la clase Person desde el archivo Person.ts
 * La extensión .ts se omite en las importaciones de TypeScript
 */
import { Person } from "./Person";

/**
 * Clase Student (Estudiante)
 * 
 * CONCEPTO DE HERENCIA: Student HEREDA de Person usando la palabra clave 'extends'
 * 
 * Esto significa que Student:
 * - Obtiene todas las propiedades de Person (id, name)
 * - Obtiene todos los métodos de Person (getName, setName)
 * - DEBE implementar todos los métodos abstractos de Person (describe)
 * - Puede agregar sus propias propiedades y métodos adicionales (grade, isPassing)
 * 
 * VENTAJA DE LA HERENCIA: No tenemos que repetir el código de id y name,
 * lo reutilizamos de la clase padre (Person).
 */
export class Student extends Person {
    /**
     * PROPIEDAD ESPECÍFICA: grade (nota/calificación)
     * 
     * Esta propiedad es específica de Student, no existe en Person.
     * - public: Accesible desde cualquier lugar
     * - type number: Solo acepta valores numéricos
     * 
     * Cada clase hija puede tener sus propias propiedades adicionales
     * además de las que hereda de la clase padre.
     */
    public grade: number;

    /**
     * CONSTRUCTOR de Student
     * 
     * @param id - Identificador único del estudiante (heredado de Person)
     * @param name - Nombre del estudiante (heredado de Person)
     * @param grade - Calificación/nota del estudiante (específico de Student)
     * 
     * IMPORTANTE: El constructor recibe 3 parámetros, pero Person solo necesita 2.
     * Por eso usamos 'super' para pasarle los primeros 2 a Person.
     */
    constructor(id: number, name: string, grade: number) {
        /**
         * SUPER: Llama al constructor de la clase padre (Person)
         * 
         * REGLA IMPORTANTE: En una clase que hereda, SIEMPRE debemos llamar
         * a super() ANTES de usar 'this'. Esto inicializa la parte de Person
         * del objeto antes de agregar las partes específicas de Student.
         * 
         * super(id, name) ejecuta: Person.constructor(id, name)
         * Esto inicializa this.id y this.name
         */
        super(id, name);

        /**
         * Después de llamar a super(), inicializamos las propiedades
         * específicas de Student
         */
        this.grade = grade;
    }

    /**
     * IMPLEMENTACIÓN del método abstracto describe()
     * 
     * Este método era 'abstract' en Person, por lo que DEBEMOS implementarlo aquí.
     * Si no lo implementamos, TypeScript nos dará un error de compilación.
     * 
     * @returns {string} Descripción formateada del estudiante
     * 
     * TEMPLATE LITERALS (backticks `):
     * - Permiten crear strings multi-línea
     * - Permiten interpolar variables usando ${expresión}
     * - Son más legibles que la concatenación con +
     * 
     * EJEMPLO:
     * Si tenemos: id=1, name="Ana", grade=8
     * Retorna: "Estudiante: Ana (ID: 1) - Nota: 8"
     */
    public describe(): string {
        // this.getName() - llamamos al método heredado de Person
        // this.id - accedemos a la propiedad pública heredada de Person
        // this.grade - accedemos a la propiedad específica de Student
        return `Estudiante: ${this.getName()} (ID: ${this.id}) - Nota: ${this.grade
            }`;
    }

    /**
     * MÉTODO ESPECÍFICO: isPassing()
     * 
     * Este método es específico de Student, no existe en Person ni en otras subclases.
     * Implementa LÓGICA DE NEGOCIO específica del dominio escolar.
     * 
     * @returns {boolean} true si el estudiante está aprobando, false si no
     * 
     * REGLA DE NEGOCIO: Un estudiante aprueba si su nota es >= 6
     * 
     * Esta regla puede variar según el sistema educativo:
     * - En algunos países se aprueba con 5
     * - En otros con 7 o más
     * - Centralizarla en un método facilita cambiarla en el futuro
     * 
     * VENTAJA: En lugar de escribir "student.grade >= 6" en múltiples lugares,
     * escribimos "student.isPassing()", lo que es más legible y mantenible.
     */
    public isPassing(): boolean {
        // Retorna true o false según la comparación
        return this.grade >= 6;
    }
}
