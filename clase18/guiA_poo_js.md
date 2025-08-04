# Guion Explicativo: Programación Orientada a Objetos (POO) en JavaScript

## 🎯 Objetivo
Introducir los conceptos fundamentales de la Programación Orientada a Objetos (POO) en JavaScript, explicando su utilidad, sintaxis moderna con `class`, y cómo aplicar herencia, encapsulamiento y polimorfismo.

---

## 🧠 ¿Qué es la POO?

La **Programación Orientada a Objetos** es un paradigma que organiza el código agrupando datos y funciones dentro de estructuras llamadas **objetos**.

**Ventajas**:
- Reutilización de código
- Mejor organización
- Modularidad y escalabilidad
- Facilita el mantenimiento

---

## 🔧 Conceptos Clave

| Concepto        | Definición                                                                 |
|-----------------|-----------------------------------------------------------------------------|
| Clase           | Plantilla para crear objetos con propiedades y métodos.                     |
| Objeto          | Instancia de una clase.                                                     |
| Propiedad       | Atributo o dato de un objeto.                                               |
| Método          | Función que pertenece a un objeto o clase.                                  |
| Encapsulamiento | Ocultar detalles internos y exponer solo lo necesario.                     |
| Herencia        | Una clase puede heredar propiedades y métodos de otra clase.               |
| Polimorfismo    | Capacidad de redefinir métodos en clases derivadas.                         |

---

## ✨ Sintaxis Moderna de Clases en JavaScript

### ✅ Definición de una Clase

```javascript
// Definimos una clase Persona
class Persona {
  constructor(nombre, edad) {
    this.nombre = nombre;
    this.edad = edad;
  }

  saludar() {
    console.log(`Hola, soy ${this.nombre} y tengo ${this.edad} años.`);
  }
}

// Creamos una instancia (objeto) de Persona
const persona1 = new Persona("Juan", 30);
persona1.saludar(); // Hola, soy Juan y tengo 30 años.
```

---

## 🧬 Herencia

Una clase puede heredar de otra usando la palabra clave `extends`.

```javascript
// Clase base
class Animal {
  constructor(nombre) {
    this.nombre = nombre;
  }

  hablar() {
    console.log(`${this.nombre} hace un sonido.`);
  }
}

// Clase derivada
class Perro extends Animal {
  hablar() {
    console.log(`${this.nombre} dice: ¡Guau!`);
  }
}

const miPerro = new Perro("Max");
miPerro.hablar(); // Max dice: ¡Guau!
```

---

## 🔒 Encapsulamiento

Puedes usar `#` para definir propiedades privadas (disponible desde ES2022).

```javascript
class CuentaBancaria {
  #saldo = 0;

  constructor(titular) {
    this.titular = titular;
  }

  depositar(monto) {
    if (monto > 0) this.#saldo += monto;
  }

  verSaldo() {
    return this.#saldo;
  }
}

const cuenta = new CuentaBancaria("Ana");
cuenta.depositar(1000);
console.log(cuenta.verSaldo()); // 1000
// cuenta.#saldo => Error: propiedad privada
```

---

## 🌀 Polimorfismo

Permite redefinir métodos en clases derivadas.

```javascript
class Vehiculo {
  arrancar() {
    console.log("El vehículo arranca");
  }
}

class Moto extends Vehiculo {
  arrancar() {
    console.log("La moto arranca con pedal");
  }
}

const vehiculo = new Vehiculo();
const moto = new Moto();

vehiculo.arrancar(); // El vehículo arranca
moto.arrancar();     // La moto arranca con pedal
```

---

## 🧪 Ejemplo Integrado

```javascript
class Empleado {
  constructor(nombre, salario) {
    this.nombre = nombre;
    this.salario = salario;
  }

  detalles() {
    return `${this.nombre} gana $${this.salario}`;
  }
}

class Gerente extends Empleado {
  constructor(nombre, salario, departamento) {
    super(nombre, salario); // Llama al constructor de Empleado
    this.departamento = departamento;
  }

  detalles() {
    return `${super.detalles()} y dirige el departamento de ${this.departamento}`;
  }
}

const jefe = new Gerente("Lucía", 5000, "Ventas");
console.log(jefe.detalles());
// Lucía gana $5000 y dirige el departamento de Ventas
```

---

## 📌 Conclusión

JavaScript es un lenguaje flexible que soporta la programación orientada a objetos con clases y prototipos. Aprender a usar POO mejora la calidad, reutilización y mantenimiento del código.

---

## 📚 Recomendaciones para profundizar

- Documentación oficial de MDN sobre [clases](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Classes)
- Curso de JavaScript orientado a objetos en plataformas como freeCodeCamp, Udemy o Codecademy.