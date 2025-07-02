🎯 ¿Qué es transition?
La propiedad transition permite aplicar un cambio suave entre dos estados CSS (por ejemplo, cuando el usuario pasa el mouse).

✏️ Sintaxis básica:

```css
elemento {
    transition: propiedad duración función-retardo;
}
```

🧪 Ejemplo:

```css
button {
    background-color: blue;
    transition: background-color 0.5s ease;
}

button:hover {
    background-color: green;
}
```

✅ Ventajas:

Simple de usar

Se activa por un cambio de estado (hover, focus, etc.)

🌀 ¿Qué es animation?
La propiedad animation permite crear animaciones complejas y controladas que no dependen de interacciones del usuario. Utiliza la regla @keyframes.

✏️ Sintaxis básica:

```css
@keyframes nombre {
    from {
        propiedad: valor;
    }
    to {
        propiedad: valor;
    }
}

elemento {
    animation: nombre duración función-retardo iteraciones dirección;
}
```

🧪 Ejemplo:

```css
@keyframes girar {
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
}

.circulo {
    animation: girar 2s linear infinite;
}
```

✅ Ventajas:

Funciona sin interacción del usuario

Soporta múltiples etapas (0%, 50%, 100%)

Más control: delay, iteration-count, direction, fill-mode, etc.

✨ Usá transition cuando...

-   Querés un efecto simple (hover, foco, etc.)

-   Solo cambia una propiedad a otro valor

🚀 Usá animation cuando...

-   Necesitás efectos complejos y automáticos

-   Querés múltiples etapas o animaciones infinitas
