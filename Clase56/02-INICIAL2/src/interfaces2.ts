//INTERFACES
interface Producto {
    id: number;
    nombre: string;
    precio: number;
    descripcion?: string;
    readonly sku: string;
}

const laptop: Producto = {
    id: 1,
    nombre: "asus ROG XXXXX",
    precio: 2000,
    sku: "ASUSROG-1234",
};

laptop.descripcion = "Laptop gamer con GPU potente";

//TIPADO ESTRUCTURAL (DUCK TYPING)

interface Ballena {
    nadar(): void;
}

interface Pez {
    nadar(): void;
}

let willy: Ballena = { nadar: () => console.log("estoy nadando") };
let nemo: Pez = willy;

// INTERFACES VS TYPE ALIASES
// Cuando usar interface y cuando type

//interface
interface Animal {
    nombre: string;
}
//Type
type Mascota = {
    nombre: string;
};

//DIFERENCIAS
//1. EXTENSIBILIDAD (DECLARATION MERGING): Las interfaces estan "abiertas"

interface Ventana {
    titulo: string;
}
// en otro lugar del codigo o incluso en un modulo o libreria... sin problemas puedo declarar esto:
interface Ventana {
    ancho: number;
}
// TS funcionara ambas declaraciones. La interfaz Ventana ahora tiene titulo y ancho
// IMPORTANTE: Los type no pueden hacer esto. Si lo intentamos nos da error

//2. CAPACIDADES: type puede definir uniones, primitivos, tuplas... En cambio, interface solo objetos

type ID = string | number; // Interface no puede hacer esto

// conclusiones: Usamos interface para definir objetos, especialmente si estamos escribniendo
//una libreria publica para que otros puedasn extender las interfaces que generemos
// Usamos type para uniones , intersecciones complejas, funciones o alias de primitivos

//EXTENSION DE INTERFACES
//Al igual que las clases heredan, las interfaces puede extenderse

interface Vehiculo {
    ruedas: number;
}
interface Auto extends Vehiculo {
    puertas: number;
}
interface Moto extends Vehiculo {
    casco: boolean;
}

const miAuto: Auto = {
    ruedas: 4,
    puertas: 5,
};
const miMoto: Moto = {
    ruedas: 2,
    casco: true,
};

// DRY (Dont`t Repeat Yourself)
//-----------------------------------

//INDEX SIGNATURES
// A veces no sabemos los nombres de las propiedades de una interface pero si
// su forma

interface DiccionarioErrores {
    [codigo: string]: string;
}

const erroresHTTP: DiccionarioErrores = {
    "404": "No encontrado",
    "500": "Error interno",
    AUTH_01: "No autorizado",
};

const erroresInternos: DiccionarioErrores = {
    COMM1: "Error de comunicacion",
    DATA2: "Error de grabado de dato",
};

//Las interfaces son la columna vertebral de nuestros modelos de datos.
// Las debemos usar para definir claramenete que espera nuestro codigo y
// que devuelve.


