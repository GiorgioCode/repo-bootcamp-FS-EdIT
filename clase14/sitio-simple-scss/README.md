# Guía completa: Sitio ejemplo SCSS modular y comentado

Este material es ideal para usar en clases o autoaprendizaje. Incluye explicaciones paso a paso y el código completo y comentado de cada archivo.

---

## 1. Pre-requisitos

- Tener instalado [Node.js](https://nodejs.org/) (opcional, solo si usas herramientas modernas).
- Tener instalado [Dart Sass](https://sass-lang.com/install) (recomendado) o cualquier compilador de SCSS.

Puedes instalar Sass globalmente con:
```sh
npm install -g sass
```

---

## 2. Estructura de carpetas

```
sitio-simple-scss/
├── index.html
└── scss/
    ├── _variables.scss
    ├── _mixins.scss
    ├── _components.scss
    ├── _buttons.scss
    ├── _typography.scss
    ├── _index.scss
    └── main.scss
```

**Propósito de cada archivo:**

| Archivo              | Propósito                                              |
|----------------------|-------------------------------------------------------|
| index.html           | HTML principal del sitio                              |
| _variables.scss      | Variables globales de colores, fuentes, espaciados    |
| _mixins.scss         | Mixins y funciones reutilizables                      |
| _components.scss     | Componentes y ejemplos de bucles (@for)               |
| _buttons.scss        | Botones generados con @each y mixins                  |
| _typography.scss     | Estilos de texto usando variables y mixins            |
| _index.scss          | Reúne todos los parciales con @forward                |
| main.scss            | Archivo principal que importa todo lo anterior        |

---

## 3. Paso a paso para crear el sitio desde cero

### 1. Crea la estructura de carpetas y archivos

- Crea la estructura mostrada arriba y luego sigue con el HTML y los archivos SCSS.

### 2. Escribe el HTML base

En `index.html`, crea una estructura simple y enlaza el CSS generado:

```html
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Ejemplo SCSS Completo</title>
  <!-- El archivo main.css es el resultado de compilar main.scss -->
  <link rel="stylesheet" href="scss/main.css">
</head>
<body>
  <header class="main-header">
    <h1>Ejemplo de SCSS: Mixins, Bucles, Variables y Más</h1>
    <p>Explora el código fuente SCSS para ver ejemplos comentados.</p>
  </header>
  <section class="content">
    <h2>Botones Generados con @each</h2>
    <button class="btn btn-primary">Primario</button>
    <button class="btn btn-secondary">Secundario</button>
    <button class="btn btn-success">Éxito</button>
    <button class="btn btn-danger">Peligro</button>

    <h2>Tarjetas Generadas con @for</h2>
    <div class="card-list">
      <div class="card card-1">Tarjeta 1</div>
      <div class="card card-2">Tarjeta 2</div>
      <div class="card card-3">Tarjeta 3</div>
      <div class="card card-4">Tarjeta 4</div>
    </div>

    <h2>Tipografía</h2>
    <p class="lead">Este es un texto destacado usando un mixin.</p>
    <p class="small">Este es un texto pequeño usando variables.</p>
  </section>
</body>
</html>
```

---

## 4. Código SCSS completo y comentado

### `scss/_variables.scss`
```scss
// _variables.scss
// Aquí se definen variables globales para colores, fuentes y tamaños

// Colores principales
$primary: #007bff;     // Azul principal, usado para botones y cabecera
$secondary: #6c757d;   // Gris secundario, usado para texto y detalles
$success: #28a745;     // Verde éxito, usado para botones de éxito
$danger: #dc3545;      // Rojo peligro, usado para botones de peligro
$white: #fff;          // Blanco puro, usado para texto y fondos
$gray-light: #f8f9fa;  // Gris claro, usado como fondo de página

// Tipografía
$font-stack: 'Segoe UI', Arial, sans-serif; // Familia de fuentes principal
$font-size-base: 16px;    // Tamaño base para texto
$font-size-lg: 1.25rem;   // Tamaño para textos destacados
$font-size-sm: 0.875rem;  // Tamaño para textos pequeños

// Espaciados
$spacer: 1rem;         // Espaciado base para márgenes y paddings
$card-padding: 1.5rem; // Espaciado interno de las tarjetas
```

### `scss/_mixins.scss`
```scss
// _mixins.scss
// Ejemplos de mixins y funciones útiles en SCSS

@use 'variables' as v; // Importa variables SCSS con el prefijo v.
@use 'sass:color';    // Importa módulo de color de Sass

// Mixin para aplicar un borde redondeado configurable
@mixin rounded($radius: 0.5rem) {         // $radius es el radio del borde
  border-radius: $radius;                 // Aplica el radio recibido
}

// Mixin para crear un sombreado configurable
@mixin shadow($color: #000, $opacity: 0.15, $y: 4px, $blur: 16px) { // Parámetros personalizables
  box-shadow: 0 $y $blur rgba($color, $opacity); // Sombra con color y opacidad
}

// Mixin para centrar elementos con flexbox
@mixin flex-center {
  display: flex;             // Activa flexbox
  justify-content: center;   // Centra horizontalmente
  align-items: center;       // Centra verticalmente
}

// Mixin para texto destacado
@mixin lead-text {
  font-size: v.$font-size-lg; // Usa tamaño grande definido en variables
  font-weight: bold;         // Texto en negrita
}

// Función para oscurecer un color usando color.adjust
@function darken-color($color, $amount: 10%) { // $amount es el porcentaje a oscurecer
  @return color.adjust($color, $lightness: -$amount); // Devuelve el color ajustado
}
```

### `scss/_components.scss`
```scss
// _components.scss
// Ejemplo de uso de mixins, bucles for y variables

@use 'variables' as v; // Importa variables SCSS con el prefijo v.
@use 'mixins' as m;    // Importa los mixins SCSS con el prefijo m.
@use 'sass:color';     // Importa el módulo nativo de color de Sass

// Header principal del sitio
.main-header {
  background: v.$primary;                        // Fondo azul principal
  color: v.$white;                              // Texto blanco
  padding: v.$spacer * 2 v.$spacer;             // Espaciado vertical y horizontal
  @include m.rounded(1rem);                     // Borde redondeado grande
  @include m.shadow(v.$primary, 0.2, 8px, 24px);// Sombra azul
  text-align: center;                           // Centra el texto
  margin-bottom: v.$spacer * 2;                 // Espacio inferior
}

// Contenedor de tarjetas
.card-list {
  display: flex;                 // Layout flexible horizontal
  gap: v.$spacer;                // Espaciado entre tarjetas
  margin-bottom: v.$spacer * 2;  // Espacio inferior
}

// Genera 4 tarjetas con diferentes tonos usando @for
@for $i from 1 through 4 {
  .card-#{$i} {                                         // Crea .card-1, .card-2, etc.
    background: color.adjust(v.$primary, $lightness: $i * 7%); // Fondo azul más claro según el índice
    color: v.$white;                                    // Texto blanco
    padding: v.$card-padding;                           // Espaciado interno
    flex: 1;                                            // Todas las tarjetas ocupan el mismo espacio
    @include m.rounded(0.75rem);                        // Borde redondeado
    @include m.shadow(v.$primary, 0.12, 4px, 12px);     // Sombra suave
    text-align: center;                                 // Centra el texto
    font-size: v.$font-size-base;                       // Tamaño de fuente base
  }
}

// Contenido general del sitio
.content {
  margin: 0 auto;                 // Centra horizontalmente
  max-width: 800px;               // Limita el ancho máximo
  font-family: v.$font-stack;     // Fuente definida en variables
  color: v.$secondary;            // Color de texto secundario
}
```

### `scss/_buttons.scss`
```scss
// _buttons.scss
// Ejemplo de uso de @each y mixins para botones

@use 'variables' as v; // Importa las variables SCSS con el prefijo v.
@use 'mixins' as m;    // Importa los mixins SCSS con el prefijo m.
@use 'sass:color';     // Importa el módulo nativo de color de Sass

// Mapa de colores para los botones, usando variables definidas en _variables.scss
$btn-colors: (
  'primary': v.$primary,     // Azul principal
  'secondary': v.$secondary, // Gris secundario
  'success': v.$success,     // Verde éxito
  'danger': v.$danger        // Rojo peligro
);

.btn {
  padding: 0.5rem 1.25rem;           // Espaciado interno del botón
  font-size: v.$font-size-base;      // Tamaño de fuente base definido en variables
  border: none;                      // Sin borde por defecto
  cursor: pointer;                   // Cursor tipo puntero al pasar el mouse
  @include m.rounded(0.5rem);        // Aplica borde redondeado usando el mixin
  transition: background 0.2s;       // Suaviza el cambio de color de fondo
  color: v.$white;                   // Color de texto blanco
}

// Genera una clase para cada tipo de botón usando @each
@each $name, $color in $btn-colors {
  .btn-#{$name} {                      // Crea una clase .btn-primary, .btn-secondary, etc.
    background: $color;                // Color de fondo según el mapa
    &:hover {                          // Al pasar el mouse...
      background: color.adjust($color, $lightness: -10%); // Oscurece el fondo un 10%
    }
  }
}
```

### `scss/_typography.scss`
```scss
// _typography.scss
// Ejemplo de uso de variables y mixins para tipografía

@use 'variables' as v; // Importa variables SCSS con el prefijo v.
@use 'mixins' as m;    // Importa mixins SCSS con el prefijo m.

body {
  font-family: v.$font-stack;      // Fuente principal definida en variables
  font-size: v.$font-size-base;    // Tamaño base de fuente
  background: v.$gray-light;       // Fondo gris claro
  margin: 0;                       // Sin margen por defecto
}

.lead {
  @include m.lead-text;            // Aplica mixin de texto destacado
  margin-bottom: v.$spacer;        // Espacio inferior
}

.small {
  font-size: v.$font-size-sm;      // Fuente pequeña
  color: v.$secondary;             // Color de texto secundario
}
```

### `scss/_index.scss`
```scss
// _index.scss
// Archivo para hacer forward de los parciales SCSS

@forward 'variables';
@forward 'mixins';
@forward 'components';
@forward 'buttons';
@forward 'typography';
```

### `scss/main.scss`
```scss
// main.scss
// Archivo principal que importa el SCSS modularizado usando @use y @forward

@use 'index'; // Importa todo lo definido en _index.scss

// Puedes agregar aquí reglas globales adicionales si lo deseas
```

---

## 5. Personalización y aprendizaje

- Modifica los valores de las variables en `_variables.scss` para ver cambios globales.
- Agrega nuevos mixins o componentes para practicar.
- Lee los comentarios en cada línea para aprender cómo y por qué se usa cada recurso SCSS.

---

## 6. Recursos útiles

- [Documentación oficial de Sass](https://sass-lang.com/documentation)
- [Guía de migración de color-functions](https://sass-lang.com/d/color-functions)
## 1. Pre-requisitos

- Tener instalado [Node.js](https://nodejs.org/) (opcional, solo si usas herramientas modernas).
- Tener instalado [Dart Sass](https://sass-lang.com/install) (recomendado) o cualquier compilador de SCSS.

Puedes instalar Sass globalmente con:
```sh
npm install -g sass
```

---

## 2. Estructura de Carpetas

```
sitio-simple-scss/
├── index.html
└── scss/
    ├── _variables.scss
    ├── _mixins.scss
    ├── _components.scss
    ├── _buttons.scss
    ├── _typography.scss
    ├── _index.scss
    └── main.scss
```

---

## 3. Paso a paso para crear el sitio desde cero

### 1. Crea la estructura de carpetas y archivos

- Crea la estructura mostrada arriba y continúa con el HTML y los archivos SCSS.
  - `main.scss`: archivo principal que importa todo.

### 2. Escribe el HTML base

En `index.html`, crea una estructura simple y enlaza el CSS generado:
```html
<link rel="stylesheet" href="scss/main.css">
```

### 3. Escribe los archivos SCSS

- En cada archivo SCSS, copia el contenido del ejemplo (o crea el tuyo) y sigue la estructura modular.
- Usa comentarios en cada línea para entender qué hace cada cosa.

### 4. Compila el SCSS a CSS

Desde la terminal, en la raíz del proyecto, ejecuta:
```sh
sass scss/main.scss scss/main.css
```
Esto generará el archivo `main.css` que usará tu HTML.

### 5. Abre el sitio en tu navegador

Abre `index.html` en tu navegador favorito para ver el resultado.

---

## 4. Tabla de archivos y propósito

| Archivo | Propósito |
| --- | --- |
| `_variables.scss` | Define colores, fuentes y espaciados reutilizables. |
| `_mixins.scss` | Define funciones y mixins reutilizables (bordes, sombras, texto, etc). |
| `_components.scss` | Ejemplo de cabecera y tarjetas generadas con bucle @for. |
| `_buttons.scss` | Genera clases de botones usando @each y mixins. |
| `_typography.scss` | Estilos tipográficos con variables y mixins. |
| `_index.scss` | Hace `@forward` de todos los parciales para importar todo desde un solo lugar. |
| `main.scss` | Archivo principal que importa todo usando `@use 'index';`. |

---

## 5. Personalización y aprendizaje

- Modifica los valores de las variables en `_variables.scss` para ver cambios globales.
- Agrega nuevos mixins o componentes para practicar.
- Lee los comentarios en cada línea para aprender cómo y por qué se usa cada recurso SCSS.

---

## 6. Recursos útiles

- [Documentación oficial de Sass](https://sass-lang.com/documentation)
- [Guía de migración de color-functions](https://sass-lang.com/d/color-functions)
- [Guía de modularización con @use y @forward](https://sass-lang.com/documentation/at-rules/use)

---

¡Listo! Ahora tienes una base para experimentar y aprender SCSS moderno de forma estructurada y comentada.
