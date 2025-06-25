🎯 ¿Qué es transform?
La propiedad transform en CSS permite aplicar efectos visuales a un elemento HTML, como moverlo, girarlo, escalarlo o inclinarlo.

🧩 Tipos de transformaciones

1. 🔁 translate() – Mover elementos
   Desplaza un elemento desde su posición original en el eje X y/o Y.

```css
transform: translate(
    50px,
    20px
); /* Mueve 50px a la derecha y 20px hacia abajo */
```

1. 🔄 rotate() – Rotar elementos
   Gira un elemento en sentido horario o antihorario.

```css
transform: rotate(45deg); /* Rota 45 grados */
transform: rotate(-90deg); /* Rota -90 grados (antihorario) */
```

3. 📏 scale() – Escalar elementos
   Aumenta o reduce el tamaño de un elemento.

```css
transform: scale(1.5); /* Aumenta al 150% en ambos ejes */
transform: scale(2, 0.5); /* 200% de ancho y 50% de alto */
```

4. 📐 skew() – Inclinar elementos
   Inclina un elemento horizontal y/o verticalmente.

```css
transform: skew(20deg, 10deg); /* Inclinación en X e Y */
transform: skewX(30deg); /* Solo en el eje X */
transform: skewY(15deg); /* Solo en el eje Y */
```

5. 🧮 matrix() – Transformación combinada
   Permite aplicar transformaciones combinadas en una sola función con 6 valores numéricos (más compleja y poco usada directamente).

```css
transform: matrix(1, 0, 0, 1, 50, 100); /* Equivale a translate(50px, 100px) */
```

🧠 También podés combinar transformaciones

```css
transform: translateX(100px) rotate(45deg) scale(1.2);
```

✨ Ejemplo HTML con transform

```html
<!DOCTYPE html>
<html lang="es">
    <head>
        <style>
            .caja {
                width: 100px;
                height: 100px;
                background-color: lightblue;
                transform: rotate(45deg) translateX(50px);
            }
        </style>
    </head>
    <body>
        <div class="caja"></div>
    </body>
</html>
```
