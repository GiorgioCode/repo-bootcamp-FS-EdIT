# 10 Ejemplos de Algoritmos en JavaScript

Este documento recopila **10 ejemplos prácticos** de algoritmos resueltos en JavaScript, con diferentes niveles de dificultad.  
Se incluyen explicaciones y código comentado.

---

## 1. Sumar los números del 1 al N
**Planteo**: Dado un número `N`, calcular la suma de todos los números desde `1` hasta `N`.

```javascript
function sumaHastaN(N) {
  let suma = 0;
  for (let i = 1; i <= N; i++) {
    suma += i;
  }
  return suma;
}
console.log(sumaHastaN(10)); // 55
```

---

## 2. Invertir una cadena de texto
**Planteo**: Escribir una función que reciba un string y devuelva el texto invertido.

```javascript
function invertirCadena(texto) {
  return texto.split("").reverse().join("");
}
console.log(invertirCadena("javascript")); // "tpircsavaj"
```

---

## 3. Encontrar el mayor en un arreglo
**Planteo**: Dado un array de números, encontrar el número más grande sin usar `Math.max()`.

```javascript
function numeroMayor(arr) {
  let mayor = arr[0];
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] > mayor) {
      mayor = arr[i];
    }
  }
  return mayor;
}
console.log(numeroMayor([3, 19, 5, 42, 7])); // 42
```

---

## 4. Verificar si un número es primo
**Planteo**: Escribir un algoritmo que verifique si un número es primo.

```javascript
function esPrimo(n) {
  if (n <= 1) return false;
  for (let i = 2; i <= Math.sqrt(n); i++) {
    if (n % i === 0) {
      return false;
    }
  }
  return true;
}
console.log(esPrimo(7));  // true
console.log(esPrimo(10)); // false
```

---

## 5. Contar vocales en una cadena
**Planteo**: Dada una cadena, contar cuántas vocales tiene.

```javascript
function contarVocales(texto) {
  const vocales = "aeiouAEIOU";
  let contador = 0;
  for (let letra of texto) {
    if (vocales.includes(letra)) {
      contador++;
    }
  }
  return contador;
}
console.log(contarVocales("Programar en JavaScript")); // 7
```

---

## 6. Ordenar un arreglo (Burbuja)
**Planteo**: Implementar el algoritmo de ordenamiento burbuja para ordenar un arreglo de números.

**Explicación mejorada**:  
El algoritmo burbuja compara elementos adyacentes y los intercambia si están en el orden incorrecto. Esto se repite en varias pasadas hasta que no haya más intercambios. Aunque es poco eficiente en grandes volúmenes (O(n²)), es excelente para comprender la lógica de ordenamiento paso a paso.

```javascript
function burbuja(arr) {
  let n = arr.length;
  let cambiado;
  do {
    cambiado = false;
    for (let i = 0; i < n - 1; i++) {
      if (arr[i] > arr[i + 1]) {
        let temp = arr[i];
        arr[i] = arr[i + 1];
        arr[i + 1] = temp;
        cambiado = true;
      }
    }
  } while (cambiado);
  return arr;
}
console.log(burbuja([5, 3, 8, 4, 2])); // [2, 3, 4, 5, 8]
```

---

## 7. Factorial de un número (recursivo)
**Planteo**: Calcular el factorial de un número `n!`.

**Explicación mejorada**:  
El factorial se define como el producto de todos los números enteros desde `1` hasta `n`. Se puede resolver de manera **recursiva**, donde la función se llama a sí misma con un valor decreciente hasta llegar al caso base (`0! = 1`).

```javascript
function factorial(n) {
  if (n === 0) return 1;
  return n * factorial(n - 1);
}
console.log(factorial(5)); // 120
```

---

## 8. Palíndromo
**Planteo**: Verificar si una palabra o frase es un palíndromo.

```javascript
function esPalindromo(texto) {
  let limpio = texto.toLowerCase().replace(/[^a-z0-9]/g, "");
  let invertido = limpio.split("").reverse().join("");
  return limpio === invertido;
}
console.log(esPalindromo("Anita lava la tina")); // true
console.log(esPalindromo("JavaScript")); // false
```

---

## 9. Contar ocurrencias de elementos en un array
**Planteo**: Dado un arreglo, contar cuántas veces aparece cada elemento.

**Explicación mejorada**:  
El algoritmo recorre el arreglo y utiliza un objeto como "diccionario". La clave es el elemento, y el valor es la cantidad de veces que aparece. Si el elemento ya existe en el objeto, se incrementa su valor; si no, se inicializa en 1.

```javascript
function contarOcurrencias(arr) {
  let contador = {};
  for (let elem of arr) {
    contador[elem] = (contador[elem] || 0) + 1;
  }
  return contador;
}
console.log(contarOcurrencias(["a", "b", "a", "c", "b", "a"]));
// { a: 3, b: 2, c: 1 }
```

---

## 10. Fibonacci hasta N
**Planteo**: Generar los primeros `N` números de la secuencia de Fibonacci.

**Explicación mejorada**:  
La secuencia comienza con `0` y `1`, y cada número siguiente es la suma de los dos anteriores. El algoritmo usa un arreglo para ir almacenando los valores y los construye de manera iterativa hasta llegar a `N` elementos.

```javascript
function fibonacci(N) {
  let secuencia = [0, 1];
  for (let i = 2; i < N; i++) {
    secuencia.push(secuencia[i - 1] + secuencia[i - 2]);
  }
  return secuencia.slice(0, N);
}
console.log(fibonacci(10)); // [0, 1, 1, 2, 3, 5, 8, 13, 21, 34]
```
