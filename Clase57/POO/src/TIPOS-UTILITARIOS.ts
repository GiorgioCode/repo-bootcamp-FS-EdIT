//TIPOS UTILITARIOS (UTILITY TYPES)

//TS viene con una "caja de herramientas" de tipos predefinidos
//que transforman a otros tipos. Son utilizados para evitar repetir codigo.

//Supongamos que tenemos este modelo o interface:

interface Todo {
    titulo: string;
    descripcion: string;
    completado: boolean;
    creadoEn: number;
}

//Partial<T>
// Hace que todas las propiedades de T sean opcionales.
// MUY UTIL PARA ACTUALIZACIONES O PARCHES

function actualizarTodo(todo: Todo, camposAActaulizar: Partial<Todo>) {
    return { ...todo, ...camposAActaulizar };
}
// A continuacion solo pasamos descripcion y TS no se va a quejar ni a dar
//error porque falte una propiedad

//actualizarTodo(miTodo,{descripcion:"nueva descripcion"})

//Required<T>
//Exactamente lo opuesto a Partial. Hace que todo sea obligatorio (elimina los ?)

//Readonly<T>
//Hace que todas las propiedades sean de solo lectura. Inmutabilidad instantanea

//const todoInmutable: Readonly<Todo> = {...}
//todoInmutable.titulo = "Cambio"

//Pick<T,Keys>
//Crea un nuevo tipo seleccionando solo algunas propiedades de T

//solo quiero mostrar un resumen en la lista
type TodoPreview = Pick<Todo, "titulo" | "completado">;
const preview: TodoPreview = {
    titulo: "Lavar platos",
    completado: false,
};

//Omit<T,Keys>
//Lo opuesto a Pick. Crea un tipo eliminando ciertas propiedades
//quiero todo MENOS la fecha de creacion

type TodoSinFecha = Omit<Todo, "creadoEn">;

//Record<Keys, Type>
// se usa para crear objetos diccionario/mapa de forma rapida

type NombrePagina = "home" | "about" | "contact";
interface InfoPagina {
    titulo: string;
}

const navegacion: Record<NombrePagina, InfoPagina> = {
    home: { titulo: "Inicio" },
    about: { titulo: "Sobre mi" },
    contact: { titulo: "Contacto" },
    //blog: ERROR
};

//OPERADORES DE TIPO
//keyof: Obtiene las claves de un tipo como una union de strings literales

type ClavesDeTodo = keyof Todo;

//es equivalente a: "titulo"|"descripcion"|"completado"|"creadoEn"

function getPropiedad(obj: Todo, key: keyof Todo) {
    return obj[key];
}

//typeof: en JS typeof devuelve un string del tipo "string", "number", "boolean".
// En TS, usado en contexto dde tipos, devuelve el tipo de una variable existente

const configuracion = {
    ancho: 10,
    alto: 200,
    tema: "oscuro",
};
// quiero crear un tipo que sea igual a la estructura de esa vatiable
type Config = typeof configuracion;
//Config es {ancho:number,alto:number,tema:string}
