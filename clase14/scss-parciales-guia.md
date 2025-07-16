# 📦 Uso de Archivos Parciales en SCSS (`_mixins.scss`, `_variables.scss`, etc.)

En **SCSS**, los archivos que comienzan con guion bajo (`_`) se denominan **parciales** o **partials**. Estos archivos no se compilan directamente a CSS, sino que están diseñados para ser **importados o utilizados dentro de otros archivos SCSS**.

---

## 🔍 ¿Qué es un archivo parcial?

Un **archivo parcial** es un fragmento de código SCSS que contiene piezas reutilizables, como mixins, funciones, variables o estilos base.

Por convención:

-   Se nombra como `_archivo.scss` (por ejemplo, `_mixins.scss`).
-   No se compila por separado.
-   Se importa sin el guion bajo ni la extensión.

```scss
// _mixins.scss
@mixin centrar {
    display: flex;
    justify-content: center;
    align-items: center;
}
```

```scss
// styles.scss
@import "mixins";

.container {
    @include centrar;
}
```

> 💡 Aunque el archivo se llama `_mixins.scss`, se importa como `'mixins'`.

---

## ✅ Ventajas de los parciales

-   📁 **Modularidad**: separás tu código por responsabilidades.
-   🚫 **No genera CSS duplicado**: no se compilan si no se usan.
-   🔄 **Reutilización**: fácil mantenimiento y escalabilidad.
-   🧩 **Composición**: permite componer un sistema de diseño limpio.

---

## 🆕 Importación moderna: `@use` y `@forward`

Desde Sass 1.23, se recomienda reemplazar `@import` por `@use` y `@forward`.

### 🔄 `@use`: importar un módulo

```scss
// _variables.scss
$primary-color: #3498db;
```

```scss
// styles.scss
@use "variables";

body {
    background-color: variables.$primary-color;
}
```

> ✅ Sass aísla los nombres, por lo que necesitás usar el prefijo `variables.`.

### 🟢 Acceso sin prefijo (no recomendado)

```scss
@use "variables" as *;

body {
    background-color: $primary-color;
}
```

> ⚠️ Puede generar conflictos de nombres. Se recomienda evitarlo.

---

### 📤 `@forward`: reexportar desde un índice

```scss
// abstracts/_index.scss
@forward "variables";
@forward "mixins";
@forward "functions";
```

```scss
// main.scss
@use "abstracts";

.button {
    @include abstracts.centrar;
}
```

---

## ⚠️ Diferencias clave

| Comando    | ¿Está deprecado? | Aislamiento de nombres | Ideal para...                       |
| ---------- | ---------------- | ---------------------- | ----------------------------------- |
| `@import`  | ✅ Sí            | ❌ No                  | Proyectos antiguos o pequeños       |
| `@use`     | ❌ No            | ✅ Sí                  | Importar variables y mixins         |
| `@forward` | ❌ No            | ✅ Sí                  | Crear archivos índice reutilizables |

---

## 🧱 Ejemplos prácticos adicionales

### 🎨 Variables

```scss
// _variables.scss
$color-principal: #1abc9c;
$espaciado: 1rem;
```

```scss
// styles.scss
@use "variables";

.header {
    background-color: variables.$color-principal;
    padding: variables.$espaciado;
}
```

---

### 🧰 Mixins

```scss
// _mixins.scss
@mixin cuadrado($tamanio) {
    width: $tamanio;
    height: $tamanio;
}
```

```scss
@use "mixins";

.card {
    @include mixins.cuadrado(150px);
}
```

---

### 🧮 Funciones

```scss
// _functions.scss
@function rem($px, $base: 16) {
    @return ($px / $base) * 1rem;
}
```

```scss
@use "functions";

.text {
    font-size: functions.rem(24);
}
```

---

## 🗂️ Organización recomendada del proyecto SCSS

Un ejemplo común siguiendo la arquitectura **7-1**:

```
scss/
├── abstracts/         // Variables, mixins, funciones
│   ├── _variables.scss
│   ├── _mixins.scss
│   └── _functions.scss
├── base/              // Reset, tipografía, elementos HTML
│   ├── _reset.scss
│   └── _typography.scss
├── components/        // Componentes reutilizables (botones, tarjetas, etc.)
│   ├── _button.scss
│   └── _card.scss
├── layout/            // Header, footer, sidebar, grid
│   ├── _header.scss
│   └── _footer.scss
├── pages/             // Estilos por página
│   ├── _home.scss
│   └── _contact.scss
├── themes/            // Temas (oscuro, claro)
│   └── _dark.scss
└── main.scss          // Archivo principal que importa todo
```

En `main.scss`, usarías algo como:

```scss
@use "abstracts" as *;
@use "base/reset";
@use "components/button";
@use "layout/header";
```

---

## 🧠 Resumen

-   Los guiones bajos (`_`) indican **archivos parciales** que **no se compilan directamente**.
-   Se usan con `@import` (antiguo) o `@use` (moderno).
-   La arquitectura modular mejora la escalabilidad y mantenimiento del código.
-   Preferí `@use` y `@forward` en proyectos nuevos.

---
