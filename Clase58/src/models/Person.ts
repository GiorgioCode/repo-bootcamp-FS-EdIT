/**
 * Clase abstracta Person (Persona)
 * 
 * CONCEPTO CLAVE: Una clase abstracta es una clase que NO se puede instanciar directamente.
 * Sirve como "plantilla" o "base" para otras clases que heredarán de ella.
 * 
 * En este caso, Person define la estructura común que comparten todos los tipos de personas
 * en nuestro sistema escolar (estudiantes, profesores, etc.).
 * 
 * La palabra clave 'export' permite que esta clase sea importada en otros archivos.
 * La palabra clave 'abstract' indica que esta clase no se puede instanciar directamente.
 */
export abstract class Person {
    /**
     * PROPIEDAD: id (identificador único)
     * 
     * - public: Puede ser accedida desde cualquier lugar (dentro y fuera de la clase)
     * - type number: TypeScript garantiza que solo se asignen valores numéricos
     * 
     * La hacemos pública porque otros componentes del sistema necesitan
     * acceder al ID para identificar a las personas.
     */
    public id: number;

    /**
     * PROPIEDAD: name (nombre de la persona)
     * 
     * - protected: Solo accesible dentro de esta clase y sus clases hijas
     * - NO es accesible desde fuera de la clase (a diferencia de public)
     * - SÍ es accesible en subclases como Student o Teacher
     * 
     * Usamos 'protected' en lugar de 'private' para que las clases hijas
     * puedan acceder al nombre si lo necesitan, pero seguimos controlando
     * cómo se modifica mediante el setter.
     */
    protected name: string;

    /**
     * CONSTRUCTOR
     * 
     * El constructor es un método especial que se ejecuta automáticamente
     * cuando creamos una nueva instancia de la clase (o de sus subclases).
     * 
     * @param id - Identificador único de la persona (tipo number)
     * @param name - Nombre de la persona (tipo string)
     * 
     * IMPORTANTE: Como esta clase es abstracta, este constructor solo se llamará
     * desde los constructores de las clases hijas usando 'super(id, name)'.
     */
    constructor(id: number, name: string) {
        // 'this' hace referencia a la instancia actual que se está creando
        // Asignamos los parámetros recibidos a las propiedades de la instancia
        this.id = id;
        this.name = name;
    }

    /**
     * GETTER: getName()
     * 
     * CONCEPTO DE ENCAPSULACIÓN: Aunque 'name' es protected, proporcionamos
     * un método público para LEER su valor. Esto nos da control sobre cómo
     * se accede a los datos privados/protegidos.
     * 
     * @returns {string} El nombre de la persona
     * 
     * VENTAJAS de usar un getter en lugar de hacer la propiedad pública:
     * - Podemos agregar lógica adicional en el futuro (ej: logs, transformaciones)
     * - Mantenemos el control sobre el acceso a los datos
     * - Es una buena práctica de programación orientada a objetos
     */
    public getName(): string {
        return this.name;
    }

    /**
     * SETTER: setName()
     * 
     * CONCEPTO DE VALIDACIÓN: Este método permite modificar el nombre,
     * pero VALIDA los datos antes de asignarlos. Esto previene que se
     * guarden datos inválidos.
     * 
     * @param newName - El nuevo nombre que se quiere asignar
     * @throws {Error} Si el nombre está vacío o solo contiene espacios
     * 
     * FLUJO DE VALIDACIÓN:
     * 1. Verifica si newName es null, undefined o una cadena vacía
     * 2. Verifica si después de eliminar espacios queda algo
     * 3. Si no pasa la validación, lanza un error
     * 4. Si pasa, asigna el nombre eliminando espacios al inicio/final
     */
    public setName(newName: string): void {
        // Validación: verificamos que el nombre no esté vacío
        // !newName es true si newName es: null, undefined, "" (string vacío)
        // newName.trim().length === 0 es true si solo hay espacios en blanco
        if (!newName || newName.trim().length === 0) {
            // throw detiene la ejecución y lanza un error que puede ser capturado
            // con un bloque try-catch
            throw new Error("El nombre no puede estar vacío");
        }

        // Si pasó la validación, asignamos el nombre
        // .trim() elimina espacios al inicio y al final del string
        this.name = newName.trim();
    }

    /**
     * MÉTODO ABSTRACTO: describe()
     * 
     * CONCEPTO DE POLIMORFISMO: Este método DEBE ser implementado por todas
     * las clases que hereden de Person, pero cada una lo implementará de
     * manera diferente.
     * 
     * Por ejemplo:
     * - Student.describe() mostrará información del estudiante y su nota
     * - Teacher.describe() mostrará información del profesor y su materia
     * 
     * La palabra clave 'abstract' indica que:
     * 1. Este método NO tiene implementación en esta clase
     * 2. TODAS las clases hijas DEBEN implementarlo
     * 3. TypeScript generará un error si una clase hija no lo implementa
     * 
     * @returns {string} Una descripción formateada de la persona
     * 
     * VENTAJA: Garantiza que todas las personas tengan un método describe(),
     * pero permite que cada tipo de persona se describa de manera apropiada.
     */
    public abstract describe(): string;
}
