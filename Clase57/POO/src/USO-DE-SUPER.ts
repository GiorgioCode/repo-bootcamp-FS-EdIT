// QUE ES SUPER???
// En TS y JS moderno, super es una referencia al prototipo o a la clase padre
// desde una clase hija

//sirve principalmente para dos cosas:
// - Invocar al constructor de la clase padre (super(...)) dentro del constructor de la subclase
// - invocar metodos o acceder a propiedades del prototipo padre usando super.metodo()

//TS añade tipos y comprobaciones estaticas alrededor de estos usos

//HERENCIA BASICA Y super() en constructores

//REGLA PRINCIPAL: SI UNA CLASE extiende de otra y definimos un constructos
//en la subclase, debemos llamar a super(...) antes de usar this. De lo contrario
//obtendremos un error (Tanto en TS como en JS)

//Clase Padre (base)
class Animal {
    name: string;
    constructor(name: string) {
        this.name = name;
    }
    speak() {
        return `${this.name} hace un sonido.`;
    }
}

//Clase hija que extiene Animal
class Dog extends Animal {
    breed: string;
    constructor(name: string, breed: string) {
        //Antes de usar this es OBLIGATORIO llamar a super()
        super(name);
        this.breed = breed;
    }
    speak() {
        //podemos llamar al metodo del padre si queremos su comportamiento
        const parent = super.speak(); //invoca Animal.prototype.speak
        return `${parent} es un ${this.breed}`;
    }
}
const d = new Dog("Rex", "Labrador");
console.log(d.speak()); //"Rex hace un sonido. es un Labrador"

//super(name) ejecuta el constructor de Animal. si la clase necesita parametros, debemos pasarlos

// LLAMADO A METODOS HEREDADOS CON super.metodo()

//super puede invocar metodos definidos en la clase padre. Es muy util para no
//duplicar logica

class Logger {
    log(message: string) {
        console.log(" [LOG]", message);
    }
}
class TimestampLogger extends Logger {
    log(message: string) {
        const ts = new Date().toISOString();
        super.log(`${ts} - ${message}`);
    }
}

const lg = new TimestampLogger();
lg.log("Hola"); // [LOG] 2025-..... - "Hola"

//ACCESO A PROPIEDADES DEL PROTOTIPO PADRE
//TS no permite usar super.prop para acceder directamente a pripiedades de instancia
//definidas en el constructor padre (porque super se refiere al prototipo, no a la instancia).
//sin embargo, super se usa principalmente para metodos. Para propiedades, normalmente
//accedemos a traves de this (ya que la propiedad fue inicializada por super(...))

class Parent {
    value = 42; //propiedad de instancia

    getValue() {
        return this.value;
    }
}

class Child extends Parent {
    getParentValueViaThis() {
        return this.getValue(); //Parent.getValue usa this.value
    }
    //intentos con "super.value" no obtendran la propiedad de instancia
    // porque super apunta al prototipo, no al objeto instancia
}

//SUPER y modificadores (private, protected, public)
//private: miembros private no son accesibles en subclases en forma directa.
// Incluso super no permite saltar el encapsulamiento.
//protected: accesible desde subclases
//public: accesible desde cualquier lado

class Base {
    private secret = "no visible desde una subclase";
    protected protectedValue = "SI visible desde subclase";
}
class Sub extends Base {
    //readSecret(){
    //   return this.secret ERRORRR
    //}
    readProtexted() {
        return this.protectedValue;
    }
}

//this vs super - ORDEN DE INICIALIZACION Y ERRORES FRECUENTES

//- Usar this antes de super() en constructor de subclase > ReferenceError en tiempo de ejecucion
//- Olvidar llamar a super() cuando la clase padre necesita inicializacion > Errores diversos

class A {
    constructor(public n: number) {}
}
class B extends A {
    constructor() {
        //console.log(this.n) errorrr MUCHO OJO CON ESTE ERROR PORQUE A VECES TS NO LO DETECTA Y SE ROMPE EN EL RUNTIME
        super(5);
    }
}

//SUPER EN CLASES ABSTRACTAS Y GENERICAS

abstract class Repository<T> {
    constructor(protected source: string) {}
    abstract findById(id: string): T | null;
}

/*
class UserRepo extends Repository<User> {
    constructor(source: string) {
        super(source);
    }
    findById(id: string) {
        //return null;
    }
}
    */

//MIXINS Y PATRONES AVANZADOS CON SUPER

//En patrones con mixins (funciones que devuelven clases extendidas), super
//puede seguir funcionando si la jerarquia prototipica esta montada correctamente

type Constructor<T = {}> = new (...args: any[]) => T;
function Timestamped<TBase extends Constructor>(Base: TBase) {
    return class extends Base {
        createdAt = new Date();
        getCreation() {
            //si la clase Base tiene el mismo metodo, podemos llamarlo
            // super['getCreation]?.() uso condicional si existe
            return this.createdAt;
        }
    };
}
class Model {
    id = Math.random();
}
const TimestampedModel = Timestamped(Model);
const m = new TimestampedModel();
console.log(m.getCreation());
