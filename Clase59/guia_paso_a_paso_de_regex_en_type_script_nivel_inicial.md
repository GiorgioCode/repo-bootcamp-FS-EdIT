# Guía paso a paso de **REGEX en TypeScript**

> Enfoque: **principiantes absolutos**
>
> Duración estimada de la clase: **2 horas y 30 minutos**
>
> Objetivo: comprender **qué es REGEX**, **cómo se usa en TypeScript** y **resolver casos comunes** (validaciones simples, búsquedas y reemplazos).

---

## 📚 Tabla de Contenido

0. [Fundamentos Teóricos](#0️⃣-fundamentos-teóricos-10-min)
1. [¿Qué es REGEX?](#1️⃣-qué-es-regex-10-min)
2. [Preparar el entorno](#2️⃣-preparar-el-entorno-10-min)
3. [REGEX más simple posible](#3️⃣-regex-más-simple-posible-15-min)
4. [Sensibilidad a mayúsculas](#4️⃣-sensibilidad-a-mayúsculas-10-min)
5. [Caracteres comodín y básicos](#5️⃣-caracteres-comodín-y-básicos-25-min)
6. [Cantidades básicas](#6️⃣-cantidades-básicas-20-min)
7. [Inicio y fin de texto](#7️⃣-inicio-y-fin-de-texto-15-min)
8. [Conjuntos de caracteres](#8️⃣-conjuntos-de-caracteres-20-min)
9. [Buscar y reemplazar](#9️⃣-buscar-y-reemplazar-15-min)
10. [Ejemplo práctico final](#🔟-ejemplo-práctico-final-15-min)

---

## 0️⃣ Fundamentos Teóricos (10 min)

### 🎓 ¿Por qué entender la teoría detrás de REGEX?

Las expresiones regulares no son "magia" ni simplemente una sintaxis rara. Tienen una base matemática sólida en la **teoría de la computación**.

### 📖 Conceptos fundamentales

#### **1. Lenguajes Formales**

Un **lenguaje formal** es un conjunto de cadenas formadas por símbolos de un alfabeto.

```ts
// Ejemplo conceptual:
// Alfabeto Σ = {a, b}
// Lenguaje L = todas las cadenas que terminan en 'b'
// Ejemplos de cadenas válidas: "b", "ab", "aab", "aaab"
// Ejemplos de cadenas inválidas: "a", "aa", "aba"
```

📌 **En programación**: Cuando validamos un email, estamos verificando si una cadena pertenece al "lenguaje de emails válidos".

---

#### **2. Autómatas Finitos**

Un **autómata finito** es una máquina abstracta que lee una cadena símbolo por símbolo y decide si la acepta o rechaza.

```
Ejemplo: Autómata que acepta palabras que terminan en "at"

Estados: [inicio] → [a] → [at]
                ↓
             [rechazar]
```

📌 **Conexión con REGEX**: Cada expresión regular puede convertirse en un autómata finito.

```ts
// REGEX: /at$/
// Este patrón funciona como un autómata que:
// 1. Lee la cadena
// 2. Verifica si termina en "at"
// 3. Acepta o rechaza
```

---

#### **3. Expresiones Regulares (definición formal)**

Las expresiones regulares son patrones que describen lenguajes regulares mediante operaciones:

- **Concatenación**: `ab` (a seguido de b)
- **Alternancia**: `a|b` (a o b)
- **Repetición**: `a*` (cero o más a's)

**Jerarquía de lenguajes (Chomsky):**
```
Lenguajes Regulares (REGEX) ⊂ Lenguajes Libres de Contexto ⊂ ... ⊂ Todos los Lenguajes
```

📌 **Lo que REGEX NO puede hacer**: Reconocer patrones anidados ilimitadamente (ejemplo: HTML/XML perfectamente balanceado).

---

#### **4. ¿Por qué importa esto en programación?**

✅ **Ventajas de entender la teoría:**
- Sabes cuándo usar REGEX y cuándo no
- Entiendes por qué ciertos patrones son imposibles o ineficientes
- Puedes optimizar expresiones complejas

❌ **Limitaciones que debes conocer:**
- REGEX no es la solución para todo
- Algunos patrones pueden ser muy costosos (backtracking)
- Para gramáticas complejas, usa parsers dedicados

---

### 🔗 Aplicación práctica

```ts
// Motor de REGEX internamente construye un autómata
const patron: RegExp = /^[a-z]+$/; // Solo letras minúsculas

// El autómata procesa cada carácter:
console.log(patron.test("hola"));    // true  ✅ todos en [a-z]
console.log(patron.test("Hola"));    // false ❌ 'H' no está en [a-z]
console.log(patron.test("hola123")); // false ❌ '1','2','3' no en [a-z]
```

📌 **Resumen mental**: REGEX es una herramienta poderosa basada en teoría sólida, úsala para lenguajes regulares, no para todo.

---

## 1️⃣ ¿Qué es REGEX? (10 min)

**REGEX** (Regular Expression / Expresión Regular) es una forma de **buscar patrones en texto**.

Sirve para:
- Ver si un texto **cumple una forma** (email, teléfono, contraseña simple)
- **Buscar** palabras o partes de un texto
- **Reemplazar** texto automáticamente

📌 Ejemplo mental:
- Texto: `hola123`
- Patrón: `solo letras`
- Resultado: ❌ no coincide (tiene números)

---

## 2️⃣ Preparar el entorno (10 min)

Vamos a usar **Node.js + TypeScript**.

### 📦 Crear proyecto
```bash
mkdir regex-typescript
cd regex-typescript
npm init -y
```

### 📦 Instalar TypeScript
```bash
npm install -D typescript ts-node @types/node
```

### ⚙️ Inicializar TypeScript
```bash
npx tsc --init
```

### 📁 Crear archivo principal
```bash
touch index.ts
```

---

## 3️⃣ REGEX más simple posible (15 min)

### 👉 Buscar una palabra exacta

```ts
// Texto donde vamos a buscar
const texto: string = "Hola mundo";

// REGEX que busca la palabra 'Hola' exactamente
const patron: RegExp = /Hola/;

// test() devuelve true si encuentra el patrón, false si no
const resultado: boolean = patron.test(texto);

console.log(resultado); // true ✅
```

📌 Explicación:
- `/Hola/` es una expresión regular literal
- `test()` verifica si el patrón existe dentro del texto

---

### 🧪 Pruebas: casos verdaderos y falsos

```ts
const patron = /Hola/; // Busca exactamente "Hola"

// ✅ CASOS VERDADEROS (devuelven true)
console.log(patron.test("Hola mundo"));           // true - contiene "Hola"
console.log(patron.test("Hola"));                 // true - coincidencia exacta
console.log(patron.test("¡Hola amigo!"));         // true - "Hola" está presente
console.log(patron.test("Hola Hola"));            // true - múltiples coincidencias

// ❌ CASOS FALSOS (devuelven false)
console.log(patron.test("hola mundo"));           // false - diferente mayúscula
console.log(patron.test("HOLA"));                 // false - todo mayúsculas
console.log(patron.test("Adios"));                // false - palabra diferente
console.log(patron.test("H o l a"));              // false - espacios intermedios
console.log(patron.test(""));                     // false - cadena vacía
```

**💡 Lección clave**: REGEX distingue mayúsculas por defecto. "Hola" ≠ "hola"

---

## 4️⃣ Sensibilidad a mayúsculas (10 min)

Por defecto, REGEX distingue mayúsculas de minúsculas.

```ts
const texto = "hola mundo";

// Sin bandera: distingue mayúsculas
const patron = /Hola/;
console.log(patron.test(texto)); // false ❌

// Bandera i = ignore case (ignorar mayúsculas)
const patronSinMayus = /Hola/i;
console.log(patronSinMayus.test(texto)); // true ✅
```

---

### 🧪 Pruebas: con y sin flag `i`

```ts
// SIN BANDERA i (case-sensitive)
const patronSensible = /Hola/;

// ✅ VERDADEROS
console.log(patronSensible.test("Hola"));         // true - coincide exactamente
console.log(patronSensible.test("Hola Mundo"));   // true - contiene "Hola"

// ❌ FALSOS
console.log(patronSensible.test("hola"));         // false - minúscula
console.log(patronSensible.test("HOLA"));         // false - mayúscula
console.log(patronSensible.test("HoLa"));         // false - mezcla diferente

// ---

// CON BANDERA i (case-insensitive)
const patronInsensible = /Hola/i;

// ✅ VERDADEROS (todas las variantes)
console.log(patronInsensible.test("Hola"));       // true
console.log(patronInsensible.test("hola"));       // true
console.log(patronInsensible.test("HOLA"));       // true
console.log(patronInsensible.test("HoLa"));       // true
console.log(patronInsensible.test("hOlA"));       // true

// ❌ FALSOS
console.log(patronInsensible.test("Adios"));      // false - palabra diferente
console.log(patronInsensible.test("Ho la"));      // false - espacio intermedio
```

📌 **Bandera importante**:
- `i` → ignora mayúsculas/minúsculas (case-insensitive)

---

## 5️⃣ Caracteres comodín y básicos (25 min)

### 🔹 Cualquier carácter: `.`

El punto `.` representa **cualquier carácter** (excepto salto de línea).

```ts
const patron = /c.sa/; // c + cualquier carácter + sa

// ✅ VERDADEROS
console.log(patron.test("casa"));     // true - 'a' entre c y sa
console.log(patron.test("cosa"));     // true - 'o' entre c y sa
console.log(patron.test("c3sa"));     // true - '3' entre c y sa
console.log(patron.test("c sa"));     // true - ' ' (espacio) entre c y sa

// ❌ FALSOS
console.log(patron.test("csa"));      // false - falta un carácter
console.log(patron.test("caasa"));    // false - dos caracteres entre c y sa
console.log(patron.test("CA SA"));    // false - mayúsculas (y espacio en medio)
```

**💡 Clave**: El punto es **exactamente un carácter**, ni más ni menos.

---

### 🔹 Dígitos: `\d`

`\d` representa **cualquier dígito** del 0 al 9.

```ts
const patron = /\d/; // busca al menos un número

// ✅ VERDADEROS (contienen dígitos)
console.log(patron.test("Usuario123"));    // true - contiene 1, 2, 3
console.log(patron.test("5"));             // true - es un dígito
console.log(patron.test("abc7xyz"));       // true - contiene 7
console.log(patron.test("año2024"));       // true - contiene 2, 0, 2, 4

// ❌ FALSOS (NO contienen dígitos)
console.log(patron.test("Hola"));          // false - solo letras
console.log(patron.test("abc"));           // false - solo letras
console.log(patron.test("!!!"));           // false - solo símbolos
console.log(patron.test(""));              // false - cadena vacía
```

**Negación**: `\D` (mayúscula) representa **cualquier carácter que NO sea dígito**.

```ts
const patronNoDigito = /\D/;

// ✅ VERDADEROS (contienen no-dígitos)
console.log(patronNoDigito.test("abc"));   // true - letras
console.log(patronNoDigito.test("123a"));  // true - contiene 'a'

// ❌ FALSOS (solo dígitos)
console.log(patronNoDigito.test("123"));   // false - solo números
```

---

### 🔹 Letras o números: `\w`

`\w` representa **caracteres de palabra**: letras (a-z, A-Z), números (0-9) o guión bajo (_).

```ts
const patron = /\w/; // busca al menos un carácter de palabra

// ✅ VERDADEROS
console.log(patron.test("abc_123"));       // true - contiene letras, _, números
console.log(patron.test("_"));             // true - guión bajo es \w
console.log(patron.test("Z"));             // true - letra mayúscula
console.log(patron.test("9"));             // true - número

// ❌ FALSOS
console.log(patron.test("!!!"));           // false - solo símbolos
console.log(patron.test(" "));             // false - solo espacio
console.log(patron.test(""));              // false - cadena vacía
console.log(patron.test("@#$"));           // false - símbolos especiales
```

**Negación**: `\W` (mayúscula) representa **cualquier carácter que NO sea de palabra**.

```ts
const patronNoWord = /\W/;

// ✅ VERDADEROS (contienen no-word)
console.log(patronNoWord.test("hola mundo")); // true - espacio es \W
console.log(patronNoWord.test("hola!"));      // true - '!' es \W

// ❌ FALSOS
console.log(patronNoWord.test("abc123"));     // false - solo \w
```

---

### 🔹 Espacios: `\s`

`\s` representa **espacios en blanco**: espacio, tabulación, salto de línea.

```ts
const patron = /\s/; // busca al menos un espacio

// ✅ VERDADEROS
console.log(patron.test("Hola mundo"));    // true - espacio entre palabras
console.log(patron.test("a b c"));         // true - múltiples espacios
console.log(patron.test("\t"));            // true - tabulación
console.log(patron.test("línea1\nlínea2"));// true - salto de línea

// ❌ FALSOS
console.log(patron.test("HolaMundo"));     // false - sin espacios
console.log(patron.test("123"));           // false - solo números
console.log(patron.test(""));              // false - cadena vacía
```

**Negación**: `\S` (mayúscula) representa **cualquier carácter que NO sea espacio**.

```ts
const patronNoEspacio = /\S/;

// ✅ VERDADEROS
console.log(patronNoEspacio.test("a"));    // true - letra
console.log(patronNoEspacio.test("   x"));  // true - contiene 'x'

// ❌ FALSOS
console.log(patronNoEspacio.test("   "));  // false - solo espacios
console.log(patronNoEspacio.test("\t"));   // false - solo tabulación
```

---

### 📋 Resumen de caracteres especiales

| Carácter | Significado | Negación |
|----------|-------------|----------|
| `.` | Cualquier carácter (excepto \n) | - |
| `\d` | Dígito (0-9) | `\D` (no dígito) |
| `\w` | Letra, número o _ | `\W` (no palabra) |
| `\s` | Espacio, tab, newline | `\S` (no espacio) |

---

## 6️⃣ Cantidades básicas (20 min)

Los **cuantificadores** indican cuántas veces debe aparecer un patrón.

### 🔢 Tabla de cuantificadores

| Símbolo | Significado | Ejemplo |
|---------|-------------|---------|
| `*` | 0 o más veces | `a*` = "", "a", "aa", "aaa"... |
| `+` | 1 o más veces | `a+` = "a", "aa", "aaa"... |
| `?` | 0 o 1 vez (opcional) | `a?` = "", "a" |
| `{n}` | Exactamente n veces | `a{3}` = "aaa" |
| `{n,}` | n o más veces | `a{2,}` = "aa", "aaa"... |
| `{n,m}` | Entre n y m veces | `a{2,4}` = "aa", "aaa", "aaaa" |

---

### Ejemplo 1: uno o más dígitos (`+`)

```ts
const patron = /\d+/; // uno o más números consecutivos

// ✅ VERDADEROS
console.log(patron.test("Pedido 12345"));  // true - contiene 12345
console.log(patron.test("5"));             // true - un solo número
console.log(patron.test("abc 9 xyz"));     // true - contiene 9
console.log(patron.test("123abc456"));     // true - contiene 123

// ❌ FALSOS
console.log(patron.test("Hola"));          // false - sin números
console.log(patron.test(""));              // false - cadena vacía
console.log(patron.test("abc"));           // false - solo letras
```

---

### Ejemplo 2: cero o más letras (`*`)

```ts
const patron = /a*/; // cero o más 'a'

// ✅ VERDADEROS (siempre true porque * acepta cero)
console.log(patron.test(""));              // true - cero 'a' es válido
console.log(patron.test("a"));             // true - una 'a'
console.log(patron.test("aaa"));           // true - tres 'a'
console.log(patron.test("bbb"));           // true - cero 'a' (presente en vacío)

// Este patrón es poco útil solo, mejor usarlo en contexto:
const patronMejor = /ba*/; // 'b' seguido de cero o más 'a'

// ✅ VERDADEROS
console.log(patronMejor.test("b"));        // true - b + cero a
console.log(patronMejor.test("ba"));       // true - b + una a
console.log(patronMejor.test("baaa"));     // true - b + tres a

// ❌ FALSOS
console.log(patronMejor.test("a"));        // false - falta la 'b' inicial
console.log(patronMejor.test("c"));        // false - letra diferente
```

---

### Ejemplo 3: opcional (`?`)

```ts
const patron = /ID-\d?/; // "ID-" seguido de un número opcional

// ✅ VERDADEROS
console.log(patron.test("ID-"));           // true - número es opcional (cero)
console.log(patron.test("ID-5"));          // true - un número
console.log(patron.test("ID-7XYZ"));       // true - contiene "ID-7"

// ❌ FALSOS
console.log(patron.test("ID"));            // false - falta el guion
console.log(patron.test("id-5"));          // false - minúsculas
console.log(patron.test("5"));             // false - falta "ID-"

// Ejemplo práctico: URLs con http o https
const urlPatron = /https?:\/\//; // http o https (la 's' es opcional)

// ✅ VERDADEROS
console.log(urlPatron.test("http://google.com"));   // true
console.log(urlPatron.test("https://google.com"));  // true

// ❌ FALSOS
console.log(urlPatron.test("ftp://server.com"));    // false - no es http(s)
```

---

### Ejemplo 4: cantidad exacta (`{n}`)

```ts
const patron = /\d{4}/; // exactamente 4 dígitos consecutivos

// ✅ VERDADEROS
console.log(patron.test("2024"));          // true - 4 dígitos
console.log(patron.test("ID:1234:OK"));    // true - contiene 1234

// ❌ FALSOS
console.log(patron.test("123"));           // false - solo 3 dígitos
console.log(patron.test("12345"));         // true ⚠️ (contiene 1234 dentro)
```

💡 **Nota**: Para validar EXACTAMENTE 4 dígitos y nada más, usa anclas `^` y `$`:

```ts
const patronExacto = /^\d{4}$/; // toda la cadena debe ser 4 dígitos

// ✅ VERDADEROS
console.log(patronExacto.test("2024"));    // true

// ❌ FALSOS
console.log(patronExacto.test("123"));     // false - 3 dígitos
console.log(patronExacto.test("12345"));   // false - 5 dígitos
console.log(patronExacto.test("ID2024"));  // false - tiene letras
```

---

### Ejemplo 5: rango de repeticiones (`{n,m}`)

```ts
// Contraseña: entre 8 y 12 caracteres de palabra
const patron = /^\w{8,12}$/;

// ✅ VERDADEROS
console.log(patron.test("pass1234"));      // true - 8 caracteres
console.log(patron.test("myPassword1"));   // true - 12 caracteres
console.log(patron.test("abc12_XY"));      // true - 8 caracteres

// ❌ FALSOS
console.log(patron.test("abc123"));        // false - solo 6 caracteres
console.log(patron.test("thisIsTooLongPassword")); // false - más de 12
console.log(patron.test("pass word"));     // false - espacio no es \w
```

---

## 7️⃣ Inicio y fin de texto (15 min)

Las **anclas** aseguran que el patrón esté en una posición específica.

| Símbolo | Significado |
|---------|-------------|
| `^` | Inicio del texto |
| `$` | Fin del texto |

---

### Validar que SOLO haya números

```ts
// Sin anclas: busca números EN CUALQUIER PARTE
const patronSinAnclas = /\d+/;

console.log(patronSinAnclas.test("abc123def")); // true - contiene números

// Con anclas: TODA la cadena debe ser números
const patronConAnclas = /^\d+$/;

// ✅ VERDADEROS (solo números)
console.log(patronConAnclas.test("12345"));     // true
console.log(patronConAnclas.test("0"));         // true
console.log(patronConAnclas.test("999999"));    // true

// ❌ FALSOS (contienen algo más)
console.log(patronConAnclas.test("123a"));      // false - tiene letra
console.log(patronConAnclas.test("a123"));      // false - empieza con letra
console.log(patronConAnclas.test("12 34"));     // false - tiene espacio
console.log(patronConAnclas.test(""));          // false - vacío (+ requiere al menos 1)
```

---

### 🧪 Más ejemplos con anclas

```ts
// Solo letras minúsculas
const soloMinusculas = /^[a-z]+$/;

// ✅ VERDADEROS
console.log(soloMinusculas.test("hola"));       // true
console.log(soloMinusculas.test("abc"));        // true

// ❌ FALSOS
console.log(soloMinusculas.test("Hola"));       // false - tiene mayúscula
console.log(soloMinusculas.test("hola123"));    // false - tiene números
console.log(soloMinusculas.test("hola mundo")); // false - tiene espacio

// ---

// Debe empezar con 'ID' seguido de números
const empiezaID = /^ID\d+/;

// ✅ VERDADEROS
console.log(empiezaID.test("ID123"));           // true
console.log(empiezaID.test("ID999ABC"));        // true - empieza con ID999

// ❌ FALSOS
console.log(empiezaID.test("XID123"));          // false - no empieza con ID
console.log(empiezaID.test("id123"));           // false - minúsculas
console.log(empiezaID.test("123ID"));           // false - ID no está al inicio

// ---

// Debe terminar con '.txt'
const terminaTxt = /\.txt$/;

// ✅ VERDADEROS
console.log(terminaTxt.test("archivo.txt"));    // true
console.log(terminaTxt.test("foto.txt"));       // true

// ❌ FALSOS
console.log(terminaTxt.test("archivo.pdf"));    // false - termina en .pdf
console.log(terminaTxt.test("archivo.txt.bak"));// false - no termina con .txt
```

📌 **Muy usado para validaciones estrictas**: asegura que TODA la cadena cumpla el patrón.

---

## 8️⃣ Conjuntos de caracteres (20 min)

Los **corchetes `[]`** definen un conjunto de caracteres permitidos.

### 🔲 Conjunto simple

```ts
const patron = /[gr]ato/; // 'g' o 'r', seguido de 'ato'

// ✅ VERDADEROS
console.log(patron.test("gato"));       // true - g + ato
console.log(patron.test("rato"));       // true - r + ato
console.log(patron.test("el gato"));    // true - contiene "gato"

// ❌ FALSOS
console.log(patron.test("pato"));       // false - 'p' no está en [gr]
console.log(patron.test("ato"));        // false - falta g o r
console.log(patron.test("GATO"));       // false - mayúsculas
```

---

### 🔢 Rango de números

```ts
const patron = /^[0-9]$/; // exactamente un dígito

// ✅ VERDADEROS
console.log(patron.test("0"));          // true
console.log(patron.test("5"));          // true
console.log(patron.test("9"));          // true

// ❌ FALSOS
console.log(patron.test("10"));         // false - dos dígitos
console.log(patron.test("a"));          // false - letra
console.log(patron.test(""));           // false - vacío

// Equivalente: /^\d$/
```

---

### 🔤 Rango de letras

```ts
const patron = /^[A-Z]$/; // exactamente una letra mayúscula

// ✅ VERDADEROS
console.log(patron.test("A"));          // true
console.log(patron.test("F"));          // true
console.log(patron.test("Z"));          // true

// ❌ FALSOS
console.log(patron.test("a"));          // false - minúscula
console.log(patron.test("AB"));         // false - dos letras
console.log(patron.test("5"));          // false - número

// Múltiples rangos combinados
const letrasNumeros = /^[A-Za-z0-9]+$/; // letras (ambas) y números

// ✅ VERDADEROS
console.log(letrasNumeros.test("Abc123"));  // true
console.log(letrasNumeros.test("XYZ"));     // true

// ❌ FALSOS
console.log(letrasNumeros.test("Abc_123")); // false - guión bajo no incluido
console.log(letrasNumeros.test("Hola!"));   // false - símbolo '!'
```

---

### 🚫 Negación de conjuntos (`^` dentro de `[]`)

```ts
// [^...] significa "cualquier carácter EXCEPTO los listados"
const patron = /^[^0-9]+$/; // cualquier cosa EXCEPTO números

// ✅ VERDADEROS (sin números)
console.log(patron.test("Hola"));       // true - solo letras
console.log(patron.test("abc_def"));    // true - letras y _
console.log(patron.test("!!!"));        // true - solo símbolos

// ❌ FALSOS (contienen números)
console.log(patron.test("Hola123"));    // false - tiene números
console.log(patron.test("5"));          // false - es número
console.log(patron.test("abc5def"));    // false - contiene 5
```

**💡 Cuidado**: `^` tiene dos significados distintos:
- **Fuera de `[]`**: inicio de cadena (`^abc`)
- **Dentro de `[]`**: negación (`[^abc]`)

---

### 🧪 Más ejemplos de conjuntos

```ts
// Vocales solamente
const soloVocales = /^[aeiouAEIOU]+$/;

// ✅ VERDADEROS
console.log(soloVocales.test("aeiou"));     // true
console.log(soloVocales.test("AEI"));       // true

// ❌ FALSOS
console.log(soloVocales.test("hola"));      // false - tiene consonantes

// ---

// Hexadecimal (0-9, A-F)
const hex = /^[0-9A-Fa-f]+$/;

// ✅ VERDADEROS
console.log(hex.test("1A2F"));          // true
console.log(hex.test("ff00cc"));        // true

// ❌ FALSOS
console.log(hex.test("GGGG"));          // false - G no es hex
console.log(hex.test("12 34"));         // false - espacio
```

---

## 9️⃣ Buscar y reemplazar (15 min)

### 🔄 `replace()`: reemplazar coincidencias

```ts
const texto = "Hola Juan";

// Reemplaza la primera coincidencia
const nuevoTexto = texto.replace(/Juan/, "María");

console.log(nuevoTexto); // "Hola María"
```

---

### Reemplazar todos con bandera `g` (global)

```ts
const texto = "1-2-3-4";

// Sin 'g': solo reemplaza la primera
console.log(texto.replace(/-/, "/"));  // "1/2-3-4"

// Con 'g': reemplaza todas
console.log(texto.replace(/-/g, "/"));  // "1/2/3/4"
```

📌 **Bandera `g`** = global (todas las coincidencias)

---

### 🧪 Casos de uso comunes

```ts
// 1. Limpiar espacios extra
const textoSucio = "Hola    mundo   !";
const limpio = textoSucio.replace(/\s+/g, " "); // reemplaza múltiples espacios por uno
console.log(limpio); // "Hola mundo !"

// 2. Eliminar caracteres no numéricos
const telefono = "(123) 456-7890";
const soloNumeros = telefono.replace(/\D/g, ""); // quita todo lo que no sea dígito
console.log(soloNumeros); // "1234567890"

// 3. Censurar palabras
const comentario = "Esto es malo, muy malo";
const censurado = comentario.replace(/malo/g, "***");
console.log(censurado); // "Esto es ***, muy ***"

// 4. Formatear fechas
const fecha = "2024-12-18";
const fechaFormateada = fecha.replace(/(\d{4})-(\d{2})-(\d{2})/, "$3/$2/$1");
console.log(fechaFormateada); // "18/12/2024"
// Nota: $1, $2, $3 son grupos de captura (tema avanzado)
```

---

### 🧪 Pruebas: con y sin `g`

```ts
const texto = "gato gato gato";

// Sin 'g': solo primera coincidencia
const resultado1 = texto.replace(/gato/, "perro");
console.log(resultado1); // "perro gato gato"

// Con 'g': todas las coincidencias
const resultado2 = texto.replace(/gato/g, "perro");
console.log(resultado2); // "perro perro perro"

// Con 'gi': global e insensible a mayúsculas
const textoMixto = "Gato gato GATO";
const resultado3 = textoMixto.replace(/gato/gi, "perro");
console.log(resultado3); // "perro perro perro"
```

---

## 🔟 Ejemplo práctico final (15 min)

### Validar diferentes formatos

#### 1. Email SIMPLE (educativo, no producción)

```ts
// Patrón: texto@texto.texto
const emailRegex = /^[\w.-]+@[\w.-]+\.[a-zA-Z]{2,}$/;

// Desglose:
// ^          - inicio
// [\w.-]+    - una o más letras, números, _, . o -
// @          - arroba literal
// [\w.-]+    - dominio (letras, números, _, . o -)
// \.         - punto literal (escapado)
// [a-zA-Z]{2,} - extensión de 2+ letras
// $          - fin

// ✅ EMAILS VÁLIDOS
console.log(emailRegex.test("usuario@mail.com"));       // true
console.log(emailRegex.test("juan.perez@empresa.co"));  // true
console.log(emailRegex.test("info@mi-sitio.org"));      // true

// ❌ EMAILS INVÁLIDOS
console.log(emailRegex.test("usuario@"));               // false - falta dominio
console.log(emailRegex.test("@mail.com"));              // false - falta usuario
console.log(emailRegex.test("usuario mail.com"));       // false - falta @
console.log(emailRegex.test("usuario@mail"));           // false - falta extensión
console.log(emailRegex.test("usuario@mail.c"));         // false - extensión < 2
```

📌 **Importante**: Este regex es educativo. Los emails reales son MUY complejos (RFC 5322).

---

#### 2. Teléfono (formato simple)

```ts
// Formato: XXX-XXX-XXXX o (XXX) XXX-XXXX
const telefonoRegex = /^(\d{3}-\d{3}-\d{4}|\(\d{3}\) \d{3}-\d{4})$/;

// ✅ VÁLIDOS
console.log(telefonoRegex.test("123-456-7890"));    // true
console.log(telefonoRegex.test("(123) 456-7890"));  // true

// ❌ INVÁLIDOS
console.log(telefonoRegex.test("1234567890"));      // false - sin formato
console.log(telefonoRegex.test("123-45-6789"));     // false - formato incorrecto
console.log(telefonoRegex.test("abc-def-ghij"));    // false - letras
```

---

#### 3. Contraseña segura

```ts
// Al menos: 8 caracteres, una mayúscula, una minúscula, un número
// Nota: este es un enfoque simplificado
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

// Desglose (lookaheads - tema avanzado):
// ^             - inicio
// (?=.*[a-z])   - debe contener al menos una minúscula
// (?=.*[A-Z])   - debe contener al menos una mayúscula
// (?=.*\d)      - debe contener al menos un número
// .{8,}         - al menos 8 caracteres
// $             - fin

// ✅ VÁLIDAS
console.log(passwordRegex.test("Password123"));     // true
console.log(passwordRegex.test("MyPass99"));        // true
console.log(passwordRegex.test("Secure1Pass"));     // true

// ❌ INVÁLIDAS
console.log(passwordRegex.test("password"));        // false - sin mayúscula ni número
console.log(passwordRegex.test("PASSWORD123"));     // false - sin minúscula
console.log(passwordRegex.test("Pass1"));           // false - menos de 8 caracteres
console.log(passwordRegex.test("Password"));        // false - sin número
```

---

#### 4. Código postal (Argentina)

```ts
// Formato: letra + 4 dígitos + 3 letras (ej: C1234ABC)
const cpArgentina = /^[A-Z]\d{4}[A-Z]{3}$/;

// ✅ VÁLIDOS
console.log(cpArgentina.test("C1234ABC"));      // true
console.log(cpArgentina.test("B5000XYZ"));      // true

// ❌ INVÁLIDOS
console.log(cpArgentina.test("1234ABC"));       // false - falta letra inicial
console.log(cpArgentina.test("C123ABC"));       // false - solo 3 dígitos
console.log(cpArgentina.test("c1234abc"));      // false - minúsculas
```

---

#### 5. URL básica

```ts
const urlRegex = /^https?:\/\/[\w.-]+\.[a-z]{2,}(\/.*)?$/i;

// ✅ VÁLIDAS
console.log(urlRegex.test("http://google.com"));        // true
console.log(urlRegex.test("https://www.ejemplo.com"));  // true
console.log(urlRegex.test("https://sitio.org/pagina")); // true

// ❌ INVÁLIDAS
console.log(urlRegex.test("ftp://server.com"));         // false - no http(s)
console.log(urlRegex.test("google.com"));               // false - falta protocolo
console.log(urlRegex.test("https://"));                 // false - falta dominio
```

---

## ▶️ Ejecutar el código

Guarda todos los ejemplos en `index.ts` y ejecuta:

```bash
npx ts-node index.ts
```

---

## 🧠 Resumen mental para el alumno

### ✅ Conceptos clave aprendidos

1. **Teoría**: REGEX está basado en autómatas finitos y lenguajes regulares
2. **Literales**: `/patrón/` busca ese texto
3. **Banderas**: `i` (ignorar mayúsculas), `g` (global)
4. **Caracteres especiales**:
   - `.` = cualquier carácter
   - `\d` = dígito | `\D` = no dígito
   - `\w` = palabra | `\W` = no palabra
   - `\s` = espacio | `\S` = no espacio
5. **Cuantificadores**:
   - `*` = 0 o más
   - `+` = 1 o más
   - `?` = 0 o 1
   - `{n}` = exactamente n
   - `{n,m}` = entre n y m
6. **Anclas**:
   - `^` = inicio
   - `$` = fin
7. **Conjuntos**:
   - `[abc]` = a, b o c
   - `[a-z]` = rango
   - `[^abc]` = todo excepto a, b, c
8. **Métodos**:
   - `test()` = devuelve boolean
   - `replace()` = reemplaza coincidencias

---

### 🎯 Cuándo usar REGEX

✅ **SÍ usar**:
- Validaciones simples (email, teléfono, códigos)
- Búsqueda y reemplazo de patrones
- Limpiar/formatear texto

❌ **NO usar**:
- Parsear HTML/XML (usa parsers dedicados)
- Validaciones extremadamente complejas
- Cuando un método string simple es suficiente

---

### 📌 Sugerencia para seguir aprendiendo

- Practicar **5-10 minutos por día**
- Probar patrones en textos reales de tu proyecto
- Usar herramientas online: [regex101.com](https://regex101.com)
- Estudiar casos reales: validación de formularios
- No memorizar todo, **entender la lógica**
- REGEX es una herramienta, no la solución a todo

---

### 🔗 Recursos adicionales

- **Documentación MDN**: [Expresiones Regulares JavaScript](https://developer.mozilla.org/es/docs/Web/JavaScript/Guide/Regular_Expressions)
- **Práctica interactiva**: [RegexOne](https://regexone.com/)
- **Testing online**: [regex101](https://regex101.com/)
- **Cheat sheet**: [Hoja de referencia rápida](https://www.debuggex.com/cheatsheet/regex/javascript)

---

## 🎓 Ejercicios propuestos (tarea opcional)

1. Crear un regex que valide nombres de usuario (solo letras, números, guión bajo, 3-16 caracteres)
2. Validar fechas en formato DD/MM/YYYY
3. Extraer todos los números de un texto
4. Reemplazar múltiples espacios por uno solo
5. Validar que una contraseña tenga al menos un símbolo especial (!@#$%^&*)

**¡Éxito en tu aprendizaje de REGEX!** 🚀
