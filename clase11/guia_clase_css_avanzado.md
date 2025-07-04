# Guía de Clase: CSS Avanzado - Nesting, Selectores Complejos y Nuevas Características

## 🌟 Objetivos

- Entender el anidamiento (nesting) nativo en CSS.
- Aprender a utilizar selectores complejos de manera eficiente.
- Conocer nuevas características avanzadas de CSS (variables, container queries, etc).
- Aplicar estilos modernos y organizados sin preprocesadores.

---

## 🧐 1. Nesting en CSS (CSS Nesting)

### ✨ ¿Qué es el anidamiento en CSS?
El anidamiento (o "nesting") es una técnica que permite escribir reglas de CSS dentro de otras reglas. Esto ayuda a organizar el código de manera jerárquica, reflejando la estructura del HTML. Es muy útil para mantener el estilo agrupado según los componentes.

### ⚡ Requisitos
Para usar nesting en CSS sin herramientas externas como SASS, necesitás utilizar navegadores modernos (Chrome, Firefox, Safari, Edge) que lo soporten de forma nativa desde 2023.

### ✍️ Ejemplo:
Este ejemplo muestra cómo se puede aplicar estilos a elementos hijos usando nesting:
```css
.card {
  padding: 1rem; /* Espaciado interno del contenedor */
  background: #f2f2f2; /* Fondo claro */

  & h2 {
    font-size: 1.5rem; /* Estilo para h2 dentro de .card */
  }

  & .btn {
    padding: 0.5rem; /* Espaciado del botón */
    background: blue; /* Color de fondo */
    color: white; /* Color del texto */
  }
}
```
> ⚠️ El símbolo `&` representa el selector padre, en este caso `.card`.

### 🔎 Nesting sin `&`
También podés escribir nesting sin el símbolo `&`, lo que refleja una estructura más limpia:
```css
nav {
  ul {
    list-style: none; /* Quita los puntos de la lista */
  }

  li {
    display: inline-block; /* Muestra los elementos en línea */
  }

  a {
    color: navy; /* Color azul para los enlaces */
    text-decoration: none; /* Sin subrayado */
  }
}
```
> Esta sintaxis aún se está estandarizando, pero ya puede usarse con herramientas como PostCSS.

---

## 🧠 2. Variables en CSS (Custom Properties)

Las variables en CSS permiten definir valores reutilizables que podés usar en cualquier parte del documento. Se definen con `--` delante del nombre y se utilizan con `var()`.

```css
:root {
  --color-principal: #3498db; /* Definimos una variable para color */
  --espaciado: 1rem; /* Definimos una variable para espaciado */
}

button {
  background-color: var(--color-principal); /* Aplicamos el color desde la variable */
  padding: var(--espaciado); /* Aplicamos el espaciado desde la variable */
}
```
> Estas variables pueden ser heredadas por los elementos hijos y también modificadas dinámicamente con JavaScript.

---

## 🌍 3. Selectores Avanzados

Los selectores avanzados te permiten apuntar a elementos específicos según su posición, relación o atributos.

### Selector hijo directo
Este selector aplica estilos solo a elementos que son hijos directos del selector padre.
```css
article > p {
  font-weight: bold; /* Solo afecta párrafos hijos directos de article */
}
```

### Selector de hermanos adyacentes
Este selector selecciona el primer elemento que es hermano del anterior.
```css
h2 + p {
  margin-top: 0; /* Elimina el margen del párrafo que sigue a un h2 */
}
```

### Selector de atributos
Selecciona elementos según sus atributos y valores.
```css
a[target="_blank"] {
  color: red; /* Aplica estilos a enlaces que abren en nueva pestaña */
}
```

### Pseudo-clases
Las pseudo-clases se utilizan para seleccionar elementos en un estado particular o posición.
```css
input:focus {
  outline: 2px solid blue; /* Estilo cuando un input está enfocado */
}

li:first-child {
  font-weight: bold; /* Estilo especial para el primer ítem de una lista */
}
```

---

## 🚀 4. Nuevas Características Avanzadas de CSS

CSS sigue evolucionando e incorporando funcionalidades poderosas. Aquí explicamos dos muy útiles:

### Container Queries
Permiten aplicar estilos en función del tamaño del contenedor, no del viewport. Son útiles para componentes reutilizables.
```css
@container (min-width: 500px) {
  .card {
    flex-direction: row; /* Cambia la dirección de los elementos cuando el contenedor es más grande */
  }
}
```
> Para usar esto, el contenedor debe tener `container-type: inline-size;`

### Clamp()
Esta función permite establecer un valor mínimo, preferido y máximo para una propiedad.
```css
h1 {
  font-size: clamp(1.5rem, 5vw, 3rem); /* El tamaño se adapta al ancho de la ventana */
}
```
> Ideal para fuentes o tamaños responsivos sin media queries.

---

## 🔧 5. Ejemplo Completo

Este ejemplo combina nesting, variables y estilos modernos para crear una tarjeta con un botón.

**HTML**
```html
<div class="card">
  <h2>Título</h2>
  <p>Contenido descriptivo</p>
  <button class="btn">Leer más</button>
</div>
```

**CSS con nesting y variables**
```css
:root {
  --color-fondo: #eee; /* Color de fondo claro */
  --color-primario: #333; /* Color de texto oscuro */
  --espaciado: 1rem; /* Espaciado estándar */
}

.card {
  padding: var(--espaciado); /* Espaciado desde variable */
  background: var(--color-fondo); /* Fondo claro */
  border-radius: 8px; /* Bordes redondeados */

  & h2 {
    color: var(--color-primario); /* Color del título */
  }

  & .btn {
    background: var(--color-primario); /* Fondo del botón */
    color: white; /* Texto blanco */
    border: none; /* Sin borde */
    padding: 0.5rem 1rem; /* Padding interno */
  }
}
```

---

## 📆 6. Actividad para el Aula

Para practicar lo aprendido:

1. Crear un componente `.card` con header, contenido y footer.
2. Aplicar nesting para agrupar estilos relacionados.
3. Usar variables CSS para colores y espaciado.
4. Aplicar `clamp()` para el tamaño del título.
5. Utilizar `@container` en un componente flexible.

---

## 📃 Recursos

- [MDN Nesting](https://developer.mozilla.org/en-US/docs/Web/CSS/Nesting_selectors)
- [CSS Tricks: Advanced Selectors](https://css-tricks.com/)
- [Can I Use](https://caniuse.com/css-nesting)

---

## 🎓 Cierre

- CSS moderno permite patrones similares a SCSS, sin herramientas extra.
- Mejora la legibilidad del código y facilita el mantenimiento.
- Ya se puede usar nesting, variables y funciones modernas en la mayoría de navegadores actuales.

> ✅ Siguiente paso: combinar nesting con estrategias de arquitectura CSS como BEM u OOCSS.

