# Guía de Clase: Introducción y Uso de SCSS (SASS)

## 🌟 Objetivos

- Comprender qué es SCSS/SASS y para qué se utiliza.
- Instalar y configurar el entorno para trabajar con SCSS.
- Usar correctamente variables, anidamiento, mixins, condicionales, bucles, y funciones.
- Modularizar y escalar estilos en un proyecto real.

---

## 🧐 1. ¿Qué es SCSS/SASS?

### SCSS (Sassy CSS)

Un preprocesador de CSS que permite escribir estilos de forma más organizada, reutilizable y eficiente.

### Ventajas

- Variables
- Anidamiento de reglas
- Funciones reutilizables (mixins)
- Herencia de estilos (`@extend`)
- Módulos (`@import`, `@use`, `@forward`)
- Lógica (condicionales, bucles)

### Sintaxis

- **SASS**: sin llaves ni punto y coma.
- **SCSS**: sintaxis similar a CSS (la más usada).

---

## ⚙️ 2. Instalación y Configuración

### Requisitos

- Tener instalado **Node.js**: [https://nodejs.org](https://nodejs.org)

### Instalación global

```bash
npm install -g sass
sass --version
```

### Proyecto con npm

```bash
mkdir proyecto-scss
cd proyecto-scss
npm init -y
npm install sass --save-dev
```

Editar `package.json`:

```json
"scripts": {
  "sass": "sass --watch src/scss:dist/css"
}
```

Correr el compilador:

```bash
npm run sass
```

---

## 🗂️ 3. Estructura de Proyecto

```
/proyecto
├── /src
│   └── /scss
│       ├── _variables.scss
│       ├── _mixins.scss
│       ├── _base.scss
│       └── main.scss
└── /dist
    └── /css
        └── main.css
```

Archivos que comienzan con `_` son parciales y se importan en `main.scss`.

---

## 🧪 4. Sintaxis SCSS

### Variables

```scss
$color-primario: #3498db;
$padding: 1rem;
```

### Anidamiento

```scss
nav {
  ul {
    li {
      a {
        color: $color-primario;
      }
    }
  }
}
```

### Importación

```scss
@import 'variables';
@import 'base';
```

### Mixins

```scss
@mixin centrado-flex {
  display: flex;
  justify-content: center;
  align-items: center;
}

.container {
  @include centrado-flex;
}
```

### Extend

```scss
%boton-base {
  padding: 10px;
  border-radius: 5px;
}

.boton-enviar {
  @extend %boton-base;
  background: green;
}
```

### Operadores

```scss
.container {
  width: 100% / 3;
}
```

### Funciones

```scss
$color: #3498db;
.lighten {
  background-color: lighten($color, 20%);
}
```

---

## ♻️ 5. Condicionales y Bucles

### If / Else

```scss
$modo: dark;

body {
  @if $modo == dark {
    background: #111;
    color: #fff;
  } @else {
    background: #fff;
    color: #111;
  }
}
```

### For

```scss
@for $i from 1 through 5 {
  .margen-#{$i} {
    margin: #{$i}rem;
  }
}
```

### Each

```scss
$colores: (primario: #3498db, secundario: #2ecc71);

@each $nombre, $valor in $colores {
  .btn-#{$nombre} {
    background-color: $valor;
  }
}
```

---

## 💡 6. Buenas Prácticas

- Usar archivos parciales (\_variables, \_mixins, etc).
- Evitar anidar más de 3 niveles.
- Modularizar y dividir estilos por componente.
- Usar `@extend` con cuidado para evitar CSS redundante.

---

## 👨‍🏫 7. Ejercicio Propuesto

1. Crear una landing page con un header, sección principal y footer.
2. Definir variables para colores y tipografías.
3. Crear mixins para botones y centrado de contenido.
4. Anidar estilos para los componentes.
5. Utilizar `@for` para generar márgenes y paddings repetitivos.
6. Aplicar `@each` para generar botones con colores distintos.
7. Usar una función `lighten` para hacer hover más claros.

### 💻 Archivos sugeridos:

**index.html** (simplificado)

```html
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <link rel="stylesheet" href="dist/css/main.css">
  <title>Sitio SCSS Demo</title>
</head>
<body>
  <header>
    <h1>Bienvenido</h1>
  </header>
  <main class="contenido">
    <p class="descripcion">Este es un ejemplo estilizado con SCSS</p>
    <div class="botones">
      <button class="btn-primario">Aceptar</button>
      <button class="btn-secundario">Cancelar</button>
    </div>
  </main>
  <footer>
    <p>© 2025 Sitio Demo</p>
  </footer>
</body>
</html>
```

**main.scss**

```scss
@import 'variables';
@import 'mixins';
@import 'base';

body {
  font-family: $fuente-base;
  background-color: $fondo;
  color: $texto;
}

header, footer {
  @include centrado-flex;
  padding: 1rem;
  background-color: $color-primario;
  color: white;
}

main.contenido {
  padding: 2rem;
  .descripcion {
    font-size: 1.2rem;
    margin-bottom: 1rem;
  }

  .botones {
    button {
      @include boton-estilo;
      &:hover {
        background-color: lighten($color-primario, 10%);
      }
    }
  }
}

@for $i from 1 through 5 {
  .padding-#{$i} {
    padding: #{$i}rem;
  }
}

@each $nombre, $color in $colores {
  .btn-#{$nombre} {
    background-color: $color;
    color: white;
    border: none;
    padding: 0.5rem 1rem;
  }
}
```

**\_variables.scss**

```scss
$color-primario: #3498db;
$color-secundario: #2ecc71;
$texto: #333;
$fondo: #f9f9f9;
$fuente-base: 'Arial', sans-serif;

$colores: (
  primario: $color-primario,
  secundario: $color-secundario
);
```

**\_mixins.scss**

```scss
@mixin centrado-flex {
  display: flex;
  justify-content: center;
  align-items: center;
}

@mixin boton-estilo {
  border-radius: 5px;
  padding: 0.5rem 1rem;
  cursor: pointer;
}
```

**\_base.scss**

```scss
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
```

---

## 🚪 8. Compilación Final y Uso

El archivo `main.scss` genera `main.css` con:

```bash
npm run sass
```

Luego incluir en HTML:

```html
<link rel="stylesheet" href="dist/css/main.css" />
```

---

## 📃 9. Recursos

- [https://sass-lang.com](https://sass-lang.com)
- [https://sass-guidelin.es](https://sass-guidelin.es)
- [https://developer.mozilla.org/es/docs/Web/CSS/Sass](https://developer.mozilla.org/es/docs/Web/CSS/Sass)

---

## 📆 10. Cierre

- Diferencias clave con CSS.
- Ventajas al escalar proyectos.
- Preguntas y repaso final.

