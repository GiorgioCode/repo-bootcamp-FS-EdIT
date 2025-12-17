//GENERICOS

// HASTA AHORA HEMOS SIDO MUY ESPECIFICOS: string, number... Pero el software
// real necesita ser reutilizable.
// ¿Como escribimos una funcion que acepte cualquier tipo pero que no pierda
// la informacion del tipo...? como es el caso si la declaramos con any.

// EL PROBLEMA DE LA IDENTIDAD

function identidad(arg: any): any {
    return arg;
}
const resultado = identidad("hola");

// 'resultado' es 'any'. Como veremos, de esta manera, perdemos el hecho de que
//  sea un string
// En un caso asi, TS ya no verificara el tipo de dato.

// ---------------
// LA SOLUCION GENERICA
//Usaremos una variable de tipo, convencionalmente la llamaremos T

function identity<T>(arg: T): T {
    return arg;
}

const result = identity<string>("hola");
//ahora result es un string.

//Mejor aun TS suele inferirlo
const numero = identity(42);
// TS vera que 42 es un nuero y decidira que T es number en forma automartica.
// DICHO DE OTRA MANERA: La funcion identity toma un tipo T, recibe un argumento
// de ese tipo T y devuelve algo de ese mismo tipo T

//GENERICOS EN LAS INTERFACES
//Esto es muy comun en respuestas de API

interface Usuario {
    id: number;
    nombre: string;
}
interface Producto {
    sku: string;
    precio: number;
}

interface RespuestaAPI<Data> {
    codigo: number;
    mensaje: string;
    datos: Data;
}

//reutilizamos la misma estructura envolvente para distintos datos

const respuestaUser: RespuestaAPI<Usuario> = {
    codigo: 200,
    mensaje: "OK",
    datos: { id: 1, nombre: "Jorge" },
};

const respuestaProd: RespuestaAPI<Producto> = {
    codigo: 200,
    mensaje: "OK",
    datos: { sku: "abc", precio: 99 },
};

//CONSTAINTS (RESTRICCIONES)
// A veces, queremos que T sea "cualquier cosa", pero "cualquier cosa que tenga
// cierta propiedad"
// Imaginemos que queremos imprimir la propiedad .length de arg

function longitud<T>(arg: T): number {
    //return arg.length //Error: T podria ser un numero y los mismos no tienen length
    return 0;
}

//necesitamos restringir T
interface ConLongitud {
    length: number;
}
// "T debe extender (cumplir con ) ConLongitud"
function largo<T extends ConLongitud>(arg: T): number {
    return arg.length;
}
largo("hola"); //String tiene length
largo([1, 2, 34]); //Array tiene length
largo({ length: 10, valor: "algo" }); //Objeto cumple con la interfaz
// largo(100) ERROR Number no tiene length

// CLASES GENERICAS

class Caja<T> {
    contenido: T;
    constructor(valor: T) {
        this.contenido = valor;
    }
    sacar(): T {
        return this.contenido;
    }
}

const cajaDeZapatos = new Caja<string>("Nike");
const zapato = cajaDeZapatos.sacar(); // zapato es string

//PODRIAMOS DECIR, QUE EL USO ADECUADO Y CORRECTAMENTE IMPLEMENTADO DE GENERICOS
// ES UNO DE LOS CONOCIMIENTOS IMPORTANTES QUE SUBEN MUCHO NUESTRO NIVEL
// COMO DESARROLLADORES, YA QUE NOS PERMITE CREAR LIBRERIAS Y UTILIDADES FLEXIBLES,
// ROBUSTAS Y SEGURAS. DEBEMOS PENSAR QUE SI NOS ENCONTRAMOS ESCRIBIENDO LA MISMA FUNCION
// PARA DIFERENTES TIPOS DE DATOS, TENEMOS NORMALMENTE QUE REFACTORIZAR PARA
// UTILIZAR GENERICOS.
