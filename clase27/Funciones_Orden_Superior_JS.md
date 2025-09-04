# 📘 Guía de Funciones de Orden Superior en JavaScript

Las **funciones de orden superior** en JavaScript son aquellas que pueden recibir otras funciones como parámetros o devolver funciones como resultado. Son esenciales en la programación funcional y nos permiten manipular colecciones de datos de manera más clara y concisa.  

En este documento aprenderás a usar las funciones:  
- `forEach`  
- `map`  
- `filter`  
- `find`  
- `some`  
- `every`  
- `reduce`  
- `sort`  

---

## 🔹 1. `forEach()`

El método `forEach` **recorre todos los elementos de un array** y ejecuta la función que se le indique.  
➡️ Importante: **No devuelve un nuevo array**; solo ejecuta la función sobre cada elemento.

```javascript
const productos = [
  {id: 1, titulo: 'iphone1', precio:1000, stock:5, descuento:50},
  {id: 2, titulo: 'iphone2', precio:2000, stock:7, descuento:40},
  {id: 3, titulo: 'iphone3', precio:3000, stock:10, descuento:30},
  {id: 4, titulo: 'iphone4', precio:4000, stock:15, descuento:20},
]

// Recorremos el array y mostramos cada producto en formato tabla
productos.forEach(elemento => console.table(elemento))

// Función para calcular el precio con descuento
function precioConDescuento(precio, descuento) {
  return precio - ((precio * descuento) / 100)
}

// Aplicamos la función a cada producto
productos.forEach(e => {
  console.log(
    `El precio del ${e.titulo} es de: ${precioConDescuento(e.precio, e.descuento)}`
  )
})
```

---

## 🔹 2. `map()`

El método `map` también recorre el array, pero a diferencia de `forEach`, **retorna un nuevo array** sin modificar el original.  
Es útil cuando necesitamos **transformar los datos**.

```javascript
const productos2 = [
  {id: 1, titulo: 'xiaomi', precio:1000, stock:5, descuento:50},
  {id: 2, titulo: 'huawei', precio:2000, stock:7, descuento:40},
  {id: 3, titulo: 'samsung', precio:3000, stock:10, descuento:30},
  {id: 4, titulo: 'apple', precio:4000, stock:15, descuento:20},
]

// Transformamos cada título en mayúsculas
productos2.map(elemento => console.log(elemento.titulo.toUpperCase()))
```

---

## 🔹 3. `filter()`

El método `filter` **extrae los elementos que cumplen una condición** y devuelve un **nuevo array**.  

```javascript
const productos3 = [
  {id: 1, titulo: 'xiaomi', precio:1000, stock:5, descuento:50},
  {id: 2, titulo: 'huawei', precio:2000, stock:7, descuento:40},
  {id: 3, titulo: 'samsung', precio:3000, stock:10, descuento:30},
  {id: 4, titulo: 'apple', precio:4000, stock:15, descuento:20},
]

// Filtramos productos con precio menor a 3000
let resultadoFiltrado = productos3.filter(e => e.precio < 3000)
console.table(resultadoFiltrado)
```

---

## 🔹 4. `find()`

El método `find` devuelve **el primer elemento** que cumple una condición.  

```javascript
const productos4 = [
  {id: 1, titulo: 'xiaomi', precio:1000, stock:5, descuento:50},
  {id: 2, titulo: 'huawei', precio:2000, stock:7, descuento:40},
  {id: 3, titulo: 'samsung', precio:3000, stock:10, descuento:30},
  {id: 4, titulo: 'apple', precio:4000, stock:15, descuento:20},
]

// Encontramos el primer producto con precio menor a 3000
let resultadoFiltrado2 = productos4.find(e => e.precio < 3000)
console.table(resultadoFiltrado2)
```

---

## 🔹 5. `some()`

El método `some` devuelve `true` si **al menos un elemento** cumple la condición.  

```javascript
const productos5 = [
  {id: 1, titulo: 'xiaomi', precio:1000, stock:5, descuento:50},
  {id: 2, titulo: 'huawei', precio:2000, stock:7, descuento:40},
  {id: 3, titulo: 'samsung', precio:3000, stock:10, descuento:30},
  {id: 4, titulo: 'apple', precio:4000, stock:15, descuento:20},
]

// ¿Existe algún producto con precio menor a 3000?
let resultadoFiltrado3 = productos5.some(e => e.precio < 3000)
console.log(resultadoFiltrado3) // true
```

---

## 🔹 6. `every()`

El método `every` devuelve `true` si **todos los elementos** cumplen la condición.  

```javascript
const productos6 = [
  {id: 1, titulo: 'xiaomi', precio:1000, stock:5, descuento:50},
  {id: 2, titulo: 'huawei', precio:2000, stock:7, descuento:40},
  {id: 3, titulo: 'samsung', precio:3000, stock:10, descuento:30},
  {id: 4, titulo: 'apple', precio:4000, stock:15, descuento:20},
]

// ¿Todos los productos tienen precio menor a 3000?
let resultadoFiltrado4 = productos6.every(e => e.precio < 3000)
console.log(resultadoFiltrado4) // false
```

---

## 🔹 7. `reduce()`

El método `reduce` permite **reducir un array a un único valor** (suma, promedio, concatenación, etc.).

```javascript
const productos7 = [
  {id: 1, titulo: 'xiaomi', precio:1000, stock:5, descuento:50},
  {id: 2, titulo: 'huawei', precio:2000, stock:7, descuento:40},
  {id: 3, titulo: 'samsung', precio:3000, stock:10, descuento:30},
  {id: 4, titulo: 'apple', precio:4000, stock:15, descuento:20},
]

// Sumamos precios, iniciando en 0
let sumaPrecios = productos7.reduce((acum, e) => acum + e.precio, 0)
console.log(sumaPrecios) // 10000

// Sumamos precios, iniciando en 1000
let sumaPrecios2 = productos7.reduce((acum, e) => acum + e.precio, 1000)
console.log(sumaPrecios2) // 11000
```

Ejemplo combinando dos arrays:

```javascript
const autosImportados = [
  {id: 1, titulo: 'Toyota', precio:1000000},
  {id: 2, titulo: 'Mitsubishi', precio:600000},
]
const autosNacionales = [
  {id: 1, titulo: 'Fiat', precio:180000},
  {id: 2, titulo: 'Renault', precio:200000},
]

let sumador1 = autosImportados.reduce((suma, a) => suma + a.precio, 0)
console.log('Total importados: ' + sumador1)

let sumaTotal = autosNacionales.reduce((suma, a) => suma + a.precio, sumador1)
console.log('Total importados + nacionales: ' + sumaTotal)
```

---

## 🔹 8. `sort()`

El método `sort` ordena los elementos de un array.  
⚠️ Es **destructivo**: modifica el array original.  

```javascript
let arrayNumeros = [1, 4, 33, 7, -7, 2, 90, 54]
console.log(arrayNumeros)

// Orden "incorrecto" (por Unicode)
arrayNumeros.sort()
console.log(arrayNumeros)

// Orden numérico ascendente con función de comparación
arrayNumeros.sort((a, b) => a - b)
console.log(arrayNumeros)

// Orden numérico descendente
arrayNumeros.sort((a, b) => b - a)
console.log(arrayNumeros)
```

Ordenando objetos:

```javascript
const autos = [
  {id: 1, titulo: 'Fiat', precio:180000, stock:5},
  {id: 2, titulo: 'Renault', precio:200000, stock:7},
  {id: 3, titulo: 'Ford', precio:300000, stock:10},
  {id: 4, titulo: 'Chevrolet', precio:400000, stock:15},
]

// Orden ascendente por precio
autos.sort((a, b) => a.precio - b.precio)
console.table(autos)

// Orden ascendente por stock
autos.sort((a, b) => a.stock - b.stock)
console.table(autos)
```

---

# ✅ Conclusión

Las **funciones de orden superior** nos permiten trabajar con arrays de manera **más declarativa y expresiva**, reduciendo la necesidad de bucles manuales y mejorando la legibilidad del código.  
