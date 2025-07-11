# 🧠 Guía Completa y Práctica de SCSS: Mixins, Funciones, @for y @each

SCSS extiende las funcionalidades de CSS y permite escribir código más **modular**, **eficiente** y **mantenible**. Aquí aprenderás 4 herramientas fundamentales: **mixins**, **funciones**, `@for` y `@each`.

---

## 🔧 1. Mixins

### ¿Qué es un mixin?

Un **mixin** te permite escribir un conjunto de reglas CSS que se pueden reutilizar en diferentes selectores. Además, pueden recibir **parámetros dinámicos**, lo que evita escribir código repetido.

---

### ✅ Ejemplo: Mixin de botón reutilizable

```scss
// Definimos el mixin con tres parámetros: color de fondo, color de texto y padding
@mixin boton-estilo($bg-color, $text-color, $padding: 0.75rem) {
  background-color: $bg-color;
  color: $text-color;
  padding: $padding;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: darken($bg-color, 10%); // Oscurece el fondo al pasar el mouse
  }
}

// Uso del mixin en distintos botones
.btn-primario {
  @include boton-estilo(#3498db, white);
}

.btn-peligro {
  @include boton-estilo(#e74c3c, white, 1rem); // con padding personalizado
}
```

🧪 *Práctico:* Puedes aplicar este mixin a muchos botones distintos cambiando sólo los parámetros, sin duplicar código.

---

## 📐 2. Funciones

### ¿Qué es una función?

Una **función** en SCSS te permite calcular y devolver un **valor**, por ejemplo una unidad, color modificado, etc. No genera directamente CSS sino valores que puedes usar en propiedades.

---

### ✅ Ejemplo: Convertir píxeles a rems

```scss
// Función para convertir píxeles a rems, con base opcional (16px por defecto)
@function px-a-rem($px, $base: 16) {
  @return ($px / $base) * 1rem;
}

// Aplicación práctica en un texto
.texto {
  font-size: px-a-rem(20); // Devuelve 1.25rem
  line-height: px-a-rem(32); // 2rem
  margin-bottom: px-a-rem(16); // 1rem
}
```

🎯 *Ventaja:* Facilita la adaptación a diseños responsivos sin depender sólo de `px`.

---

## 🔁 3. Bucle @for

### ¿Qué es @for?

Con `@for`, puedes ejecutar un bloque de reglas múltiples veces usando un índice, ideal para crear clases con variaciones progresivas.

---

### ✅ Ejemplo: Generar columnas `.col-1` a `.col-12` (como Bootstrap)

```scss
// Generamos 12 clases para grid, como un sistema de columnas
@for $i from 1 through 12 {
  .col-#{$i} {
    width: (100% / 12) * $i; // Calcula el ancho proporcional
    float: left; // Para maquetación básica tipo grid
    padding: 0.5rem;
  }
}
```

🔎 Resultado (al compilar a CSS):
```css
.col-1 { width: 8.3333%; }
.col-2 { width: 16.6666%; }
/* ... */
.col-12 { width: 100%; }
```

💡 *Pro tip:* Puedes usar estas clases para estructurar un layout de grilla sin usar frameworks externos.

---

## 🔂 4. Bucle @each

### ¿Qué es @each?

`@each` permite recorrer listas o mapas de datos. Esto es útil para crear clases dinámicas a partir de valores repetitivos como colores, tamaños, o variantes.

---

### ✅ Ejemplo 1: Colores de texto con una lista

```scss
// Lista de colores: nombre y valor
$colores: (primary #3498db, success #2ecc71, danger #e74c3c);

@each $nombre, $color in $colores {
  .texto-#{$nombre} {
    color: $color;
  }
}
```

📦 Resultado:
```css
.texto-primary { color: #3498db; }
.texto-success { color: #2ecc71; }
.texto-danger  { color: #e74c3c; }
```

---

### ✅ Ejemplo 2: Margen dinámico usando mapa

```scss
// Mapa de espaciados
$espaciados: (
  xs: 4px,
  sm: 8px,
  md: 16px,
  lg: 32px
);

@each $clave, $valor in $espaciados {
  .mb-#{$clave} {
    margin-bottom: $valor;
  }
}
```

🧱 Esto genera clases como `.mb-xs`, `.mb-sm`, etc., para usar márgenes inferiores rápidamente.

---

## 🧪 Ejercicio Propuesto

1. Crea un mixin `sombra-personalizada` que reciba color y tamaño.
2. Crea una función `em-a-px($em, $base: 16)` que convierta de em a px.
3. Usa `@for` para crear clases `.rotate-0` hasta `.rotate-360` en incrementos de 45°.
4. Usa `@each` para aplicar fondos distintos a `.bg-{color}` con una lista de nombres y valores.

---

## 📌 Conclusión

| Herramienta  | Qué hace                          | Para qué sirve                          |
|--------------|-----------------------------------|-----------------------------------------|
| `@mixin`     | Bloques reutilizables con lógica  | Reutilizar estilos con parámetros       |
| `@function`  | Devuelve valores calculados       | Medidas dinámicas, lógica compleja      |
| `@for`       | Bucle por índice numérico         | Generar clases repetitivas numeradas    |
| `@each`      | Itera listas o mapas              | Generar clases desde colecciones de datos|

---

> SCSS potencia tu CSS haciéndolo más limpio, DRY (Don't Repeat Yourself), flexible y mantenible. Dominar estas herramientas es clave para cualquier frontend moderno.
