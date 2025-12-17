/**
 * Clase Genérica Repository<T> (Repositorio)
 * 
 * CONCEPTO DE GENÉRICOS (GENERICS):
 * Los genéricos permiten crear componentes reutilizables que funcionan con
 * diferentes tipos de datos sin perder la seguridad de tipos de TypeScript.
 * 
 * SINTAXIS: Repository<T extends { id: number }>
 * - T: Es un "tipo genérico" (puede ser cualquier nombre, por convención se usa T)
 * - extends { id: number }: RESTRICCIÓN (constraint) - T debe tener una propiedad 'id' de tipo number
 * 
 * EJEMPLOS DE USO:
 * - Repository<Student> - Repositorio de estudiantes
 * - Repository<Teacher> - Repositorio de profesores
 * - Repository<cualquier-clase-con-id> - Funciona con cualquier clase que tenga id
 * 
 * VENTAJAS:
 * 1. Reutilización de código: El mismo Repository funciona para múltiples tipos
 * 2. Seguridad de tipos: TypeScript sabe exactamente qué tipo estamos guardando
 * 3. No necesitamos crear StudentRepository, TeacherRepository, etc.
 * 
 * PATRÓN REPOSITORY:
 * Este patrón separa la lógica de acceso a datos del resto de la aplicación.
 * Actúa como una "colección en memoria" con operaciones CRUD básicas.
 */
export class Repository<T extends { id: number }> {
    /**
     * ALMACENAMIENTO INTERNO: items
     * 
     * - private: Solo accesible dentro de esta clase
     * - items: T[]: Array de elementos de tipo T
     * - T[]: Gracias a los genéricos, este array contendrá el tipo específico
     *        que pasemos al crear la instancia
     * 
     * EJEMPLOS:
     * - Si hacemos new Repository<Student>(), items será Student[]
     * - Si hacemos new Repository<Teacher>(), items será Teacher[]
     * 
     * INICIALIZACIÓN: = [] - Comenzamos con un array vacío
     */
    private items: T[] = [];

    /**
     * MÉTODO: add() - Agregar un elemento
     * 
     * Operación CREATE del patrón CRUD (Create, Read, Update, Delete)
     * 
     * @param item - El elemento a agregar (de tipo T)
     * @throws {Error} Si ya existe un elemento con el mismo ID
     * 
     * VALIDACIÓN DE DUPLICADOS:
     * Antes de agregar, verificamos que no exista otro elemento con el mismo ID
     * Esto mantiene la integridad de los datos (IDs únicos)
     */
    public add(item: T): void {
        /**
         * MÉTODO SOME():
         * - Array.some() retorna true si AL MENOS UN elemento cumple la condición
         * - Arrow function: (i) => i.id === item.id
         * - Compara el ID de cada elemento existente con el ID del nuevo elemento
         * 
         * EJEMPLO:
         * items = [Student(id:1), Student(id:2)]
         * Intentamos agregar Student(id:1)
         * some verifica: 1===1? ✓ (retorna true)
         * Resultado: Lanza error porque ya existe
         */
        if (this.items.some((i) => i.id === item.id)) {
            // Template literal para mensaje de error dinámico
            throw new Error(`Elemento con id ${item.id} ya existe`);
        }

        /**
         * Si no existe duplicado, agregamos al array
         * push() agrega el elemento al final del array
         */
        this.items.push(item);
    }

    /**
     * MÉTODO: getById() - Obtener elemento por ID
     * 
     * Operación READ del patrón CRUD
     * 
     * @param id - El ID del elemento que buscamos
     * @returns {T | undefined} El elemento encontrado o undefined si no existe
     * 
     * TIPO DE RETORNO: T | undefined
     * - T: Si encuentra el elemento, retorna el elemento completo
     * - undefined: Si no lo encuentra
     * - El símbolo | significa "OR" (uno u otro)
     * 
     * SEGURIDAD DE TIPOS:
     * Si hacemos studentRepo.getById(1), TypeScript sabe que retorna Student | undefined
     */
    public getById(id: number): T | undefined {
        /**
         * MÉTODO FIND():
         * - Array.find() retorna el PRIMER elemento que cumple la condición
         * - Si no encuentra ninguno, retorna undefined
         * - Arrow function: (i) => i.id === id
         * 
         * EJEMPLO:
         * items = [Student(id:1, name:"Ana"), Student(id:2, name:"Carlos")]
         * getById(1) → retorna Student(id:1, name:"Ana")
         * getById(3) → retorna undefined
         */
        return this.items.find((i) => i.id === id);
    }

    /**
     * MÉTODO: getAll() - Obtener todos los elementos
     * 
     * Operación READ del patrón CRUD (obtener colección completa)
     * 
     * @returns {T[]} Array con todos los elementos
     * 
     * IMPORTANTE - RETORNAMOS UNA COPIA:
     * Usamos el spread operator (...) para crear una copia del array
     * en lugar de retornar la referencia directa a this.items
     * 
     * ¿POR QUÉ COPIAR?
     * Si retornáramos this.items directamente, el código externo podría
     * modificar el array (agregar, eliminar elementos) sin pasar por
     * nuestros métodos de validación.
     * 
     * EJEMPLO DEL PROBLEMA QUE EVITAMOS:
     * const students = repo.getAll(); // Sin copiar
     * students.push(new Student(-1, "Hacker", 10)); // ¡Burla nuestras validaciones!
     * 
     * Con la copia, cualquier modificación al array retornado no afecta
     * nuestro array interno.
     */
    public getAll(): T[] {
        /**
         * SPREAD OPERATOR (...):
         * [...this.items] crea un nuevo array con los mismos elementos
         * Es equivalente a: this.items.slice() o this.items.concat([])
         * pero más moderno y legible
         */
        return [...this.items];
    }

    /**
     * MÉTODO: removeById() - Eliminar elemento por ID
     * 
     * Operación DELETE del patrón CRUD
     * 
     * @param id - El ID del elemento a eliminar
     * @returns {boolean} true si se eliminó algo, false si no se encontró el ID
     * 
     * ESTRATEGIA:
     * En lugar de buscar el elemento y eliminarlo, creamos un nuevo array
     * sin el elemento que queremos eliminar. Esto es un enfoque funcional.
     */
    public removeById(id: number): boolean {
        /**
         * Guardamos la longitud original para compararla después
         * Esto nos permite saber si realmente se eliminó algo
         */
        const originalLength = this.items.length;

        /**
         * MÉTODO FILTER():
         * - Array.filter() crea un NUEVO array con los elementos que cumplen la condición
         * - Arrow function: (i) => i.id !== id
         * - MANTIENE todos los elementos cuyo id SEA DIFERENTE al que queremos eliminar
         * 
         * EJEMPLO:
         * items = [Student(1), Student(2), Student(3)]
         * removeById(2)
         * filter mantiene: 1!==2? ✓, 2!==2? ✗, 3!==2? ✓
         * Resultado: [Student(1), Student(3)]
         * 
         * ENFOQUE FUNCIONAL vs IMPERATIVO:
         * - Imperativo: Buscar índice, usar splice() para eliminar
         * - Funcional (esto): Crear nuevo array sin el elemento
         * - El enfoque funcional es más seguro y predecible
         */
        this.items = this.items.filter((i) => i.id !== id);

        /**
         * RETORNO BOOLEANO:
         * Comparamos la longitud nueva con la original
         * - Si cambió: true (se eliminó algo)
         * - Si no cambió: false (no se encontró el ID)
         * 
         * EJEMPLO:
         * originalLength = 3, new length = 2 → 2 !== 3 → true ✓
         * originalLength = 3, new length = 3 → 3 !== 3 → false (no se eliminó nada)
         */
        return this.items.length !== originalLength;
    }
}
