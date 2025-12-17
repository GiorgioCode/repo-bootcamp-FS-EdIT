# TypeScript: De JavaScript a la Arquitectura Robusta

Bienvenido. Si estás leyendo esto, probablemente ya conoces JavaScript. Sabes que es flexible, omnipresente y, a veces, caótico. TypeScript no viene a reemplazar a JavaScript, sino a domarlo. Viene a añadir **intención** y **contrato** a un lenguaje que nació sin ellos.

Esta guía no es un tutorial rápido. Es una inmersión profunda diseñada para cambiar tu forma de pensar sobre el código. Pasaremos de "escribir scripts que funcionan" a "diseñar sistemas que perduran".

## Tabla de Contenidos

### [01. El Tao de TypeScript](./01-El-Tao-de-TypeScript.md)

_La filosofía detrás del lenguaje. Por qué compilamos. La configuración como cimiento._

### [02. El Sistema de Tipos](./02-El-Sistema-de-Tipos.md)

_Más allá de `string` y `number`. Inferencia, `any` vs `unknown`, y la seguridad en tiempo de diseño._

### [03. Interfaces y Estructuras](./03-Interfaces-y-Estructuras.md)

_Modelando la realidad. Tipado estructural vs nominal. La anatomía de los datos._

### [04. Funciones y Verdad](./04-Funciones-y-Verdad.md)

_Contratos de entrada y salida. Sobrecarga y el manejo explícito de argumentos._

### [05. Clases y POO](./05-Clases-y-POO.md)

_La orientación a objetos con esteroides. Modificadores de acceso y abstracción real._

### [06. Genéricos: La Piedra Filosofal](./06-Genericos-La-Piedra-Filosofal.md)

_Escribiendo código para el futuro. Reutilización sin sacrificar seguridad._

### [07. Manipulación Avanzada](./07-Manipulacion-Avanzada.md)

_Utility Types. Transformando tipos existentes. Metaprogramación de tipos._

---

## Prerrequisitos Mentales

Para aprovechar esta guía, te pido que dejes en la puerta algunos hábitos de JavaScript:

1.  **Abandona la pereza del tipado dinámico**: En JS, a menudo escribimos y luego vemos si funciona. En TS, diseñamos primero.
2.  **El compilador es tu amigo, no tu policía**: Cuando TS te marca un error rojo, te está salvando de un bug en producción a las 3 AM. Agradécele.
3.  **Los tipos son documentación**: Un código bien tipado se explica solo. No necesitas comentarios que digan "esta función recibe un string", porque la firma de la función ya lo grita.
