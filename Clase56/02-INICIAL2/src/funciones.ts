//FUNCIONES
// Decimos comunmente en JS que las funciones son ciudadanos de primer orden.
// En TS, podriamos decir que son ciudadanos con pasaporte, visa y antecentes verificados.

//TIPADO BASICO

function sumar(a: number, b: number): number {
    return a + b;
}

//PARAMETROS OPCIONALES Y POR DEFECTO

//En JS, podemos llamar a una funcion con menos argumentos que los declarados.
// Sin embargo en TS, esta practica es un error, a menos que lo dejemos explicito.

//1. PARAMETRO OPCIONAL
// '?' hace que un parametro sea opcional

function saludar(nombre: string, apellido?: string) {
    //'apellido' se va a permitir que sea string | undefined
    if (apellido) {
        return `Hola ${nombre} ${apellido}`;
    }
    return `Hola ${nombre}`;
}
//2. PARAMETRO POR DEFECTO
// al definir el tipo de dato, tambion defino un valor que va a reemplazar a undefined
// al pasa un parametro por defecto, el mismo nunca va a tomar el tipo indefinido
function gritar(frase: string, volumen: number = 10) {
    return `${frase} a volumen ${volumen}`;
}
gritar("esto es un grito", 40);
gritar("esto es una frase por defecto");

// REST PARAMETERS
// usamos parametros REST cuando no sabemos cuanta cantidad de argumentos
//  de un tipo recibiremos
function sumarTodo(...numeros: number[]): number {
    return numeros.reduce((total, n) => total + n, 0);
}

sumarTodo(1, 2, 3, 4, 5);
sumarTodo(45, 6);

// FUNCTION OVERLOADING (SOBRECARGA DE FUNCIONES)
//A veces, una funcion retorna cosas diferentes segun que argumentos recibe

// tenemos que hacer una funcione que:
// - si recibe un timestamp(number), devuelve un objeto Date
// - si recibe una fecha(string), devuelve un objeto Date
// - si recibe una fecha(number,number,number), devuelve un objeto Date

//------
// 1. Firmas de sobrecarga
function crearFecha(timestamp: number): Date;
function crearFecha(fechaString: string): Date;
function crearFecha(dia: number, mes: number, anio: number): Date;

//2. Implementacion de firma
// Esta firma debe ser compatible con TODAS las anteriores

function crearFecha(a: number | string, b?: number, c?: number): Date {
    if (typeof a === "number" && b === undefined && c === undefined) {
        return new Date(a);
    } else if (typeof a === "string") {
        return new Date(a);
    } else if (
        typeof a === "number" &&
        typeof b === "number" &&
        typeof c === "number"
    ) {
        return new Date(c, b, a);
    }
    throw new Error("Argumentos ingresados invalidos");
}

const d1 = crearFecha(24523543);
const d2 = crearFecha("2025-10-09");
//const d3 = crearFecha(true)

//TIPADO DE this

//this en JS es una fuente de errores y confusiones si no se maneja adecuadamente.
//TS permite tipar explicitamente a this, como si fuera un "falso" parametro

interface Usuario {
    id: number;
    admin: boolean;
}

function borrarUsuario(this: Usuario) {
    //TS sabe ahora que 'this' es de tipo Usuario
    if (!this.admin) {
        throw new Error("no se pueden eliminar usuarios tipo admin");
    }
    console.log("Usuario borrado correctamente");
}
const user1: Usuario = { id: 1, admin: false };
//borrarUsuario() error

// Para que se verifique el tipo de this, debemos usar el metodo
// call, apply o bind, o llamarlo como metodo si fuera parte del objeto:
borrarUsuario.call(user1);
