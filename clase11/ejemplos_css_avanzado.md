# Guía de Clase: CSS Avanzado - Nesting, Selectores Complejos y Nuevas Características

## 🧪 7. Ejemplos adicionales prácticos

A continuación se presentan algunos ejemplos prácticos para reforzar los conceptos vistos en clase.

### 🧩 Ejemplo 1: Menú de navegación con nesting

**HTML:**

```html
<nav class="menu">
    <ul>
        <li><a href="#">Inicio</a></li>
        <li><a href="#">Nosotros</a></li>
        <li><a href="#">Contacto</a></li>
    </ul>
</nav>
```

**CSS:**

```css
.menu {
    background-color: #222; /* Fondo oscuro para el nav */
    padding: 1rem; /* Espaciado interior */

    ul {
        list-style: none; /* Quita viñetas */
        display: flex; /* Alineación horizontal */
        gap: 1rem; /* Separación entre ítems */

        li {
            a {
                color: white; /* Color del texto */
                text-decoration: none; /* Sin subrayado */

                &:hover {
                    color: #ffd700; /* Color dorado al pasar el mouse */
                }
            }
        }
    }
}
```

### 🧩 Ejemplo 2: Tarjeta de usuario con variables y pseudo-clases

**HTML:**

```html
<div class="usuario">
    <h3>María González</h3>
    <p>Desarrolladora Frontend</p>
    <button class="seguir">Seguir</button>
</div>
```

**CSS:**

```css
:root {
    --color-fondo-tarjeta: #fefefe;
    --color-boton: #6200ee;
    --radio-borde: 8px;
}

.usuario {
    background-color: var(--color-fondo-tarjeta);
    padding: 1rem;
    border-radius: var(--radio-borde);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

    h3 {
        margin-bottom: 0.5rem;
    }

    .seguir {
        background-color: var(--color-boton);
        color: white;
        padding: 0.5rem 1rem;
        border: none;
        border-radius: var(--radio-borde);
        cursor: pointer;

        &:hover {
            background-color: #3700b3;
        }
    }
}
```

### 🧩 Ejemplo 3: Responsive con `clamp()` y `@container`

**HTML:**

```html
<div class="contenedor" style="container-type: inline-size;">
    <h1>Texto adaptativo</h1>
</div>
```

**CSS:**

```css
h1 {
    font-size: clamp(1rem, 4vw, 2.5rem); /* Se adapta entre 1rem y 2.5rem */
}

@container (min-width: 600px) {
    h1 {
        color: darkgreen; /* Cambia el color si el contenedor es ancho */
    }
}
```
