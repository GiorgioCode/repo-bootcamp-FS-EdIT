/**
 * IMPORTACIÓN de la clase Person
 */
import { Person } from "./Person";

/**
 * Clase Teacher (Profesor)
 * 
 * CONCEPTO DE HERENCIA: Al igual que Student, Teacher hereda de Person
 * 
 * POLIMORFISMO EN ACCIÓN: Aunque Student y Teacher heredan de la misma
 * clase padre (Person), cada una:
 * - Tiene propiedades diferentes (Student tiene grade, Teacher tiene subject)
 * - Implementa describe() de manera diferente
 * - Tiene métodos específicos diferentes (isPassing vs getSubject)
 * 
 * Esto demuestra que múltiples clases pueden heredar de la misma clase base
 * pero comportarse de manera completamente diferente.
 */
export class Teacher extends Person {
    /**
     * PROPIEDAD ESPECÍFICA: subject (materia que enseña)
     * 
     * MODIFICADOR PRIVATE vs PROTECTED:
     * - private: SOLO accesible dentro de esta clase Teacher
     * - protected: Accesible en esta clase Y en sus clases hijas
     * 
     * Usamos 'private' aquí porque:
     * 1. No planeamos crear subclases de Teacher
     * 2. Si alguien necesita el valor, usará getSubject()
     * 3. Es más restrictivo = más seguro y encapsulado
     * 
     * COMPARACIÓN:
     * - En Person usamos 'protected name' porque queremos que Student/Teacher accedan a name
     * - Aquí usamos 'private subject' porque solo Teacher necesita acceder directamente a subject
     */
    private subject: string;

    /**
     * CONSTRUCTOR de Teacher
     * 
     * @param id - Identificador único del profesor
     * @param name - Nombre del profesor
     * @param subject - Materia que enseña el profesor
     * 
     * Estructura similar a Student pero con parámetros diferentes
     */
    constructor(id: number, name: string, subject: string) {
        /**
         * Llamamos al constructor de Person con id y name
         * Esto inicializa this.id y this.name
         */
        super(id, name);

        /**
         * Inicializamos la propiedad específica de Teacher
         */
        this.subject = subject;
    }

    /**
     * IMPLEMENTACIÓN del método abstracto describe()
     * 
     * POLIMORFISMO: Aunque Student y Teacher implementan el mismo método
     * (describe), cada uno lo hace de manera diferente:
     * 
     * Student retorna: "Estudiante: Ana (ID: 1) - Nota: 8"
     * Teacher retorna: "Profesor: Dr. Ramírez (ID: 101) - Materia: Matemáticas"
     * 
     * VENTAJA: Podemos tener un array de Person[] que contenga tanto
     * estudiantes como profesores, y llamar a .describe() en cada uno,
     * obteniendo la descripción apropiada para cada tipo.
     * 
     * @returns {string} Descripción formateada del profesor
     */
    public describe(): string {
        // Formato específico para profesores, diferente al de estudiantes
        return `Profesor: ${this.getName()} (ID: ${this.id}) - Materia: ${this.subject
            }`;
    }

    /**
     * GETTER: getSubject()
     * 
     * Como 'subject' es private, proporcionamos este método público
     * para que código externo pueda leer su valor.
     * 
     * @returns {string} La materia que enseña el profesor
     * 
     * ENCAPSULACIÓN: Mantenemos subject como private pero permitimos
     * lectura controlada a través de este método. Si en el futuro
     * necesitamos agregar lógica (ej: logs, transformaciones), solo
     * modificamos este método sin cambiar el código que lo usa.
     * 
     * PREGUNTA: ¿Por qué no hacer subject public directamente?
     * RESPUESTA: Porque queremos mantener el control. Si subject fuera
     * public, cualquiera podría modificarlo directamente. Con private +
     * getter, solo podemos leer, no modificar desde fuera.
     */
    public getSubject(): string {
        return this.subject;
    }
}
