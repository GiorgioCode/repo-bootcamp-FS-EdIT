✅ ¿Qué es una Media Query?
Una media query es una regla que permite aplicar estilos CSS según el tipo de dispositivo o las características de su pantalla, como el ancho, la altura, la orientación, la resolución, etc.

📌 1. Por Ancho o Alto del Viewport
Las más comunes. Se usan para adaptar el diseño al tamaño de pantalla.

min-width: aplica estilos a pantallas mayores o iguales a cierto ancho.

max-width: aplica estilos a pantallas menores o iguales a cierto ancho.

```css
@media (min-width: 768px) {
    body {
        background: lightblue;
    }
}
```

```css
@media (max-width: 480px) {
    body {
        background: lightcoral;
    }
}
```

También puedes usar height (min-height, max-height) para lo mismo, pero con la altura.

📌 2. Por Dispositivo (media types)
Antiguamente usados para distinguir entre tipos de dispositivos:

screen: pantallas

print: impresoras o vista previa de impresión

all: se aplica a todos

speech: lectores de pantalla

```css
@media screen and (max-width: 600px) {
    body {
        font-size: 14px;
    }
}

@media print {
    body {
        color: black;
        background: white;
    }
}
```

Hoy en día, casi siempre se usa screen.

📌 3. Por Orientación
Detecta si el dispositivo está en modo retrato o paisaje.

```css
@media (orientation: portrait) {
    body {
        background: pink;
    }
}

@media (orientation: landscape) {
    body {
        background: lightgreen;
    }
}
```

📌 4. Por Resolución o Densidad de Píxeles
Detecta la resolución de la pantalla. Útil para mostrar imágenes en alta calidad.

```css
@media (min-resolution: 300dpi) {
    .logo {
        background-image: url("logo@2x.png");
    }
}
```

También puedes usar min-device-pixel-ratio (aunque es menos estándar).

📌 5. Combinadas y Condicionales
Puedes combinar varias condiciones con and, or (,) y not.

```css
/* Pantallas grandes en orientación horizontal */
@media screen and (min-width: 1024px) and (orientation: landscape) {
    body {
        background: navy;
    }
}

/* Múltiples media queries separadas por coma = "o" lógico */
@media (max-width: 480px), (orientation: portrait) {
    body {
        background: salmon;
    }
}
```

📌 6. Nuevas Media Features (nivel 4 y 5)
CSS está evolucionando y ahora puedes consultar más características como:

prefers-color-scheme (modo claro u oscuro)

prefers-reduced-motion (usuarios que prefieren menos animaciones)

```css
@media (prefers-color-scheme: dark) {
    body {
        background: black;
        color: white;
    }
}

@media (prefers-reduced-motion: reduce) {
    * {
        animation: none !important;
    }
}
```
