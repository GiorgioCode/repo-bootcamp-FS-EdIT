
# 🧑‍🏫 Guía de Clase: BEM en CSS + Aplicación práctica en SCSS

## 🧠 ¿Qué es BEM?

**BEM** es una metodología de nombramiento para clases CSS que te ayuda a escribir código más limpio, predecible y escalable. Proviene de las siglas:

- **B**lock (Bloque)
- **E**lement (Elemento)
- **M**odifier (Modificador)

### 🎯 ¿Por qué usar BEM?

Sin una convención clara, los nombres de clases pueden volverse caóticos y difíciles de mantener:

```html
<!-- Ejemplo problemático -->
<div class="caja caja2 azul fondo-oscuro"></div>
```

Esto no describe realmente el propósito de los estilos ni la relación entre los elementos.

Con BEM, escribimos CSS como si cada componente fuera **una entidad independiente y reutilizable**, siguiendo una jerarquía clara.

---

## 📦 La estructura BEM explicada

### 1. 🧱 **Bloque**
Es una unidad independiente de la interfaz, como un componente. Puede funcionar por sí solo.

```css
.menu {}
```

### 2. 🧩 **Elemento**
Es una parte del bloque que **no tiene sentido por sí sola**. Siempre está conectado a un bloque.

```css
.menu__item {}
```

> ⚠️ Nota: El doble guion bajo (`__`) indica que es un elemento dentro del bloque.

### 3. 🎨 **Modificador**
Altera la apariencia o comportamiento del bloque o elemento. Se usa con doble guion (`--`).

```css
.menu__item--active {}
```

---

## 🧪 Ejemplo práctico en HTML + CSS tradicional

### 🎬 HTML:

```html
<nav class="menu menu--horizontal">
  <ul class="menu__list">
    <li class="menu__item menu__item--active">Inicio</li>
    <li class="menu__item">Servicios</li>
    <li class="menu__item">Contacto</li>
  </ul>
</nav>
```

### 🎨 CSS:

```css
.menu {
  background: #eee;
  padding: 10px;
}

.menu--horizontal {
  display: flex;
}

.menu__list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
}

.menu__item {
  margin-right: 15px;
  color: #333;
}

.menu__item--active {
  font-weight: bold;
  color: #007bff;
}
```

---

## 🔀 Ventajas de usar BEM

| Problema común              | Cómo lo resuelve BEM                 |
|----------------------------|--------------------------------------|
| Clases genéricas confusas | Nombres descriptivos y jerárquicos   |
| Reglas CSS que se pisan    | Aislamiento por bloque               |
| Código difícil de escalar  | Componentes reutilizables y predecibles |

---

## 🧵 BEM con SCSS: más limpio, más escalable

SCSS nos permite usar **anidamiento**, lo que se complementa muy bien con la estructura de BEM.

### 📁 SCSS:

```scss
.menu {
  background: #eee;
  padding: 10px;

  &--horizontal {
    display: flex;
  }

  &__list {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
  }

  &__item {
    margin-right: 15px;
    color: #333;

    &--active {
      font-weight: bold;
      color: #007bff;
    }
  }
}
```

---

## 🔧 Ejemplo completo: Botón con BEM + SCSS

### HTML:

```html
<button class="button button--primary">
  <span class="button__icon">🚀</span>
  <span class="button__label">Enviar</span>
</button>
```

### SCSS:

```scss
.button {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &--primary {
    background-color: #007bff;
    color: white;
  }

  &--secondary {
    background-color: #6c757d;
    color: white;
  }

  &__icon {
    margin-right: 0.5rem;
  }

  &__label {
    font-weight: bold;
  }
}
```

---

## 🧪 Actividad práctica en clase

**Objetivo:** Crear un componente de tarjeta (`card`) con variantes utilizando BEM y SCSS.

1. Crear la estructura HTML con:
   - `card`
   - `card__image`
   - `card__content`
   - `card__title`
   - `card__text`
   - `card--highlighted`

2. Estilizar en SCSS usando nesting y la convención BEM.


---

## 🧾 Ejemplo resuelto: Componente "card" con BEM + SCSS

### 📄 HTML

```html
<article class="card card--highlighted">
  <img class="card__image" src="https://via.placeholder.com/300x150" alt="Imagen de ejemplo" />
  <div class="card__content">
    <h2 class="card__title">Título de la tarjeta</h2>
    <p class="card__text">Este es un texto descriptivo dentro de la tarjeta. Es un ejemplo de cómo se estructura usando BEM.</p>
  </div>
</article>
```

### 🎨 SCSS

```scss
.card {
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
  transition: transform 0.2s;

  &--highlighted {
    border-color: #007bff;
    box-shadow: 0 4px 12px rgba(0,123,255,0.3);
  }

  &__image {
    width: 100%;
    height: auto;
    display: block;
  }

  &__content {
    padding: 1rem;
    background-color: #fff;
  }

  &__title {
    margin: 0 0 0.5rem;
    font-size: 1.25rem;
    color: #333;
  }

  &__text {
    margin: 0;
    color: #555;
    font-size: 1rem;
  }
}
```

---


## ✅ Conclusiones

- **BEM** es una convención de nombres, no una tecnología, pero mejora radicalmente la forma en que escribimos CSS.
- Se adapta muy bien al trabajo con **SCSS**, sobre todo en proyectos grandes o en equipo.
- Nos permite crear estilos **modulares, escalables y mantenibles**.

---

## 📎 Recursos adicionales

- [Documentación oficial de BEM (en inglés)](https://en.bem.info/methodology/)
- [Guía rápida de BEM en CSS-Tricks](https://css-tricks.com/bem-101/)
- [SCSS Nesting y buenas prácticas](https://sass-lang.com/guide/)
