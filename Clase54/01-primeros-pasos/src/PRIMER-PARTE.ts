// Sintaxis
// let nombreVariable : tipo = valor

const nombre: string = "Alan Turng";
const edad: number = 42;
const esGenio: boolean = true;

//null y undefined son tipos en si mismos en modo estricto
const nada: undefined = undefined;
const vacio: null = null;

//INFERENCIA DE TIPOS
//TypeScript es bastante inteligente a la hora de inferir tipos
// es decir cuando le dejamos decidir que tipo de dato va a asignarse una
// variable.
// NO NECESITAMOS SIEMPRE DECIRLE EL TIPO DE DATO !!!!
let pais = "Argentina";

// pais = 54 ERRORRRR

/**
 * Regla:Siempre dejar que TS infiera el tipo, solo declarandolo explicitamente si:
 * 1. Declaramos una variable sin iniciarla
 * 2. El tipo inferido es demasiado permisivo (ej array vacio)
 * 2. Queremos asegurar un contrato especifico (ej retorno de funcion)
 */

//EL PELIGRO DEL ANY
// any es el boton de "apagar TypeScript"

let peligro: any;
peligro = "hola";
peligro = 100;
peligro.metodoQueNoExiste(); //TS no dice nada, pero va a explotar en el runtime

// usar any es admitir una derrota. Lo debemos usar solo para migraciones extremas
// o librerias de terceros mal tipadas.

//UNKNOWN: El Hermano Responsable de any

// unknown tambien acepta cualquier valor, pero no nos deja usarlo hasta que
// se verifica que es.

let cajaMisteriosa: unknown;
cajaMisteriosa = "Un string secreto";

//console.log(cajaMisteriosa.toUpperCase()) --> no me deja

//Narrowing (Estrechamiento de tipos)
if (typeof cajaMisteriosa === "string") {
    console.log(cajaMisteriosa.toUpperCase()); //correcto
}
//Esto se llama TYPE NARROWING, es fundamental en TS. Consiste en reducir las
//posibilidades de accion de un tipo unknown simplemente definiendo un camino
//de ejecucion mediante un filtrado por typeof o instanceof. Este filtrado
//no va a liberar en forma automatica los metodos segun el tipo de dato
// filtrado.

//UNION TYPES (|)
// A VECES UN VALOR PUEDE SER MAS DE UNA COSA

let id: string | number;
id = 101;
id = "a-101";
// id=true ERROR

//Cuando usamos una union, TS solo nos va a dejar usar las propiedades
// o metodos comunes a ambos tipos, a menos que hagamos Narrowing

function imprimirId(id: string | number) {
    // console.log(id.toUpperCase()) ERRORRRR
    if (typeof id === "string") {
        console.log(id.toUpperCase());
    } else {
        console.log(id.toFixed(2));
    }
}

//INTERSECTION TYPES (&)

// Mientras que (|) es un "OR" logico, (&) es un "AND". Combina multiples tipos
// en uno solo.

type Draggable = { drag: () => void };
type Resizable = { resize: () => void };

// Un UIWidget debe en este caso de ejemplo, tener AMBAS capacidades

type UIWidget = Draggable & Resizable;

let widget: UIWidget = {
    drag: () => {},
    resize: () => {},
};

// INTERFACES Y ESTRUCTURAS

// En lenguajes como JAVA o C#, los tipos de datos son NOMINALES
// Es decir, si tenemos una clase Persona y una clase Usuario con los
// mismo campos, son cosas diferentes debido a su nombre de definicion.
// En TS, el tipado es ESTRUCTURAL (DUCK TYPING).
// Si camina como pato y grazna com pato... ES UN PATO.

//INTERFACES: El contrato

// Una interfaz, define la forma que tiene un objeto. NO GENERA CODIGO JS.
// DESAPARECE AL COMPILAR.

interface Producto {
    id: number;
    nombre: string;
    precio: number;
    descripcion?: string; //? opcional. puede estar definida o no
    readonly sku: string; //readonly no se puede modificar tras la creacion
}

const laptop: Producto = {
    id: 1,
    nombre: "Macbook Air M5",
    precio: 2000,
    sku: "mba-2025",
};

//laptop.sku = "otro-sku" ERRORRR
laptop.descripcion = "laptop facherita, finita y potente";

//tipado estructural en accion...

interface Ballena {
    nadar(): void;
}
interface Pez {
    nadar(): void;
}

let willy: Ballena = { nadar: () => console.log("nadando...") };
let nemo: Pez = willy;

// PARA TS, Ballena y Pez, son identicos estructuralmente
// NO IMPORTA EL NOMBRE DE LA INTERFAZ, IMPORTA SU CONTENIDO.....
