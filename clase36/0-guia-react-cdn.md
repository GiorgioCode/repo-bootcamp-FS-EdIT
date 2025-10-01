# Guía Básica de React con CDN

En esta guía aprenderás a usar **React** de manera simple, sin necesidad de usar herramientas como _Webpack_ o _Vite_.  
Usaremos un archivo **HTML** con enlaces a los **CDN** de React y ReactDOM.

---

## 1. Estructura de Archivos

Crea un archivo llamado `index.html` con el siguiente contenido:

```html
<!DOCTYPE html>
<html lang="es">
    <head>
        <meta charset="UTF-8" />
        <title>React con CDN</title>
        <!-- Importamos React y ReactDOM desde un CDN -->
        <script
            src="https://unpkg.com/react@18/umd/react.development.js"
            crossorigin
        ></script>
        <script
            src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"
            crossorigin
        ></script>
        <!-- Babel nos permitirá usar JSX directamente en el navegador -->
        <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
    </head>
    <body>
        <!-- Aquí montaremos nuestra app -->
        <div id="root"></div>

        <!-- Nuestro código React -->
        <script type="text/babel">
            // Componente funcional
            function Saludo(props) {
                return <h1>Hola, {props.nombre}!</h1>;
            }

            // Renderizamos el componente en el div con id="root"
            const root = ReactDOM.createRoot(document.getElementById("root"));
            root.render(<Saludo nombre="Mundo" />);
        </script>
    </body>
</html>
```

---

## 2. Explicación del Código

1. **React y ReactDOM desde CDN**: Importamos las librerías sin instalación.
2. **Babel**: Nos permite usar JSX directamente en el navegador.
3. **Div con `id="root"`**: Es el contenedor donde React inyecta los componentes.
4. **Componente `Saludo`**: Recibe una _propiedad_ `nombre` y muestra un mensaje.
5. **Renderizado**: Usamos `ReactDOM.createRoot` para renderizar el componente.

---

## 3. Ejecución

1. Guarda el archivo `index.html`.
2. Ábrelo en tu navegador.
3. Deberías ver el mensaje:

```
Hola, Mundo!
```
