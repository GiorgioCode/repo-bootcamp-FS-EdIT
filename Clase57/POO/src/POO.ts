// CLASES Y PROGRAMACION ORIENTADA A OBJETOS

// JS tiene clases, pero como ya lo hemos hablado, en realidad, funcionan
// como una especia de Sugar Syntax aplicada a un modelo de herencia
// prototipida, ya que nativamente esa es la manera que JS interpreta
// la POO.
// TS añade una capa de POO clasica, basada en clases, tal como JAVA, C#... ETC.

//CLASES Y MODIFICADORES DE ACCESO
//En JS moderno existen los campos privados # (ej. #propiedad), pero TS ofrece modificadores mas complejos
//pero que solo existen hasta el momento de la compilacion o transpilado.

class CuentaBancaria {
    //public: Accesible desde cualquier lugar (default)
    public titular: string;

    //private: solo accesible DENTRO de la clase
    private saldo: number;

    //protected: Accesible en esta clase y sus respectivas clases hijas (herencia)
    protected tipo: string;

    constructor(titular: string, saldoInicial: number) {
        this.titular = titular;
        this.saldo = saldoInicial;
        this.tipo = "Ahorro";
    }

    public depositar(monto: number) {
        this.saldo += monto;
    }

    private calcularInteres() {
        return this.saldo * 0.05;
    }
}

const miCuenta = new CuentaBancaria("Jorge", 1000);
miCuenta.depositar(500);
//miCuenta.saldo error
//miCuenta.calcularInteres() error

//IMPORTANTE: Debemos recordar que private en TS desaparece al compilar a JS. En el navegador, si inspeccionamos un objeto
// la propiedad saldo va a estar disponible y sera accesible. Por lo cual, si necesitamos mayor privacidad
// en los datos o en el modelo, y que los mismos no sean expuestos en el runtime, deberemos usar
// el modificador nativo '#'

// PARAMETER PROPERTIES
// Esto nos sirve para declarar propiedades directamente en el constructor. Nos ahorra mucho codigo
// repetitivo, pero como se sale de la manera clasica de POO, esto para muchos, no es bien recibido
// o bien visto. Es algo particular de TS.

class Persona {
    constructor(
        public nombre: string,
        private edad: number,
        readonly id: string
    ) {
        //no necesitamos hacer this.nombre=nombre
        //TS lo hace luego automaticamente
    }
}

// CLASES ABSTRACTAS
// Una clase abstracta NO SE PUEDE INSTANCIAR DIRECTAMENTE. Sirve como base para otras clases.

abstract class Animal {
    constructor(public nombre: string) {}

    //Metodo concreto que tiene implementacion y se hereda
    comer() {
        console.log("Estoy comiendo");
    }
    //Metodo abstracto: NO TIENE IMPLEMENTACION, pero las clases hijas tienen la obligacion de implementarlo
    abstract hacerSonido(): void;
}

class Perro extends Animal {
    hacerSonido() {
        console.log("Guau");
    }
}
// const a = new Animal("Bicho") error
const p = new Perro("Firulais");

//INTERFACES VS CLASES
// UNA CLASES PUEDE IMPLEMENTAR UNA INTERFAZ. ESTO ASEGURA QUE LA CLASE CUMPLA UN CONTRATO

interface Volador {
    volar(): void;
    altura: number;
}

class Paloma implements Volador {
    altura: number = 0;

    volar() {
        this.altura = 100;
        console.log("Estoy volando...");
    }
}
