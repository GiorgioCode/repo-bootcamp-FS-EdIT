# 05. Clases y POO

JavaScript tiene clases desde ES6, pero son azúcar sintáctico sobre prototipos. TypeScript añade una capa de POO clásica (estilo Java/C#) que muchos desarrolladores extrañan en JS puro.

## Modificadores de Acceso

En JS moderno existen los campos privados con `#` (ej. `#propiedad`), pero TS ofrece modificadores que solo existen en tiempo de compilación.

```typescript
class CuentaBancaria {
    // public: Accesible desde cualquier lugar (default).
    public titular: string;
    
    // private: Solo accesible DENTRO de esta clase.
    private saldo: number;
    
    // protected: Accesible en esta clase y en sus hijas (herencia).
    protected tipo: string;

    constructor(titular: string, saldoInicial: number) {
        this.titular = titular;
        this.saldo = saldoInicial;
        this.tipo = "Ahorro";
    }

    public depositar(monto: number) {
        this.saldo += monto; // ✅ Puedo acceder a private aquí.
    }

    private calcularInteres() {
        return this.saldo * 0.05;
    }
}

const miCuenta = new CuentaBancaria("Jorge", 1000);
miCuenta.depositar(500);
// miCuenta.saldo; // ❌ Error: La propiedad 'saldo' es privada.
// miCuenta.calcularInteres(); // ❌ Error: Método privado.
```

> **Reflexión:** Recuerda que `private` en TS desaparece al compilar a JS. En el navegador, si inspeccionas el objeto, la propiedad `saldo` estará ahí y será accesible. Si necesitas privacidad real en runtime, usa la sintaxis de JS `#saldo`.

## Parameter Properties (Atajo de Constructor)

TS tiene una sintaxis muy amada y odiada para declarar propiedades directamente en el constructor. Ahorra mucho código repetitivo.

```typescript
class Persona {
    // En lugar de declarar arriba y asignar abajo...
    constructor(
        public nombre: string, 
        private edad: number, 
        readonly id: string
    ) {
        // No necesitas hacer this.nombre = nombre; 
        // TS lo hace automáticamente.
    }
}
```

## Clases Abstractas

Una clase abstracta no se puede instanciar directamente. Sirve como base para otras clases.

```typescript
abstract class Animal {
    constructor(public nombre: string) {}

    // Método concreto: tiene implementación y se hereda.
    comer() {
        console.log("Ñam ñam");
    }

    // Método abstracto: NO tiene implementación. Las hijas ESTÁN OBLIGADAS a implementarlo.
    abstract hacerSonido(): void;
}

class Perro extends Animal {
    hacerSonido() {
        console.log("Guau");
    }
}

// const a = new Animal("Bicho"); // ❌ Error: No puedes instanciar una clase abstracta.
const p = new Perro("Firulais"); // ✅
```

## Interfaces vs Clases

Una clase puede **implementar** una interfaz. Esto asegura que la clase cumpla con un contrato.

```typescript
interface Volador {
    volar(): void;
    altura: number;
}

class Paloma implements Volador {
    altura: number = 0;
    
    volar() {
        this.altura = 100;
        console.log("Volando...");
    }
}
```

## Conclusión

Si vienes de C# o Java, te sentirás en casa. Si vienes de JS funcional, quizás uses menos clases. TS soporta ambos paradigmas. Usa clases cuando necesites encapsular estado y comportamiento juntos, y usa tipos/interfaces cuando solo necesites describir datos.
