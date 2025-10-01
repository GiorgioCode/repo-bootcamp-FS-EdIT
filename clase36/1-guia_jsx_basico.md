# Guía paso a paso: Conceptos básicos de **JSX** en React

**Descripción:**
Esta guía está pensada para principiantes y explica de forma sencilla qué es JSX, por qué se usa en React y cuáles son sus reglas básicas. Incluye ejemplos muy simples y comparación con JavaScript puro.

---

## 1) Qué es JSX
- JSX significa **JavaScript XML**.
- Es una **sintaxis especial** que permite escribir código que parece HTML, pero que en realidad es JavaScript.
- React convierte JSX en llamadas a `React.createElement`, generando la estructura de la interfaz.

Ejemplo simple:
```jsx
const elemento = <h1>Hola mundo</h1>;
```
Esto crea un elemento React equivalente a:
```js
const elemento = React.createElement('h1', null, 'Hola mundo');
```

---

## 2) Por qué usar JSX
- Hace el código **más legible** y cercano a la forma en que pensamos la UI.
- Permite combinar **HTML + JS** de forma expresiva.
- Facilita crear interfaces complejas de manera declarativa.

---

## 3) Reglas básicas de JSX

### a) Debe devolver un único elemento padre
Incorrecto:
```jsx
return (
  <h1>Título</h1>
  <p>Párrafo</p>
);
```
Correcto (envolviendo en un `div` o `<>`):
```jsx
return (
  <>
    <h1>Título</h1>
    <p>Párrafo</p>
  </>
);
```

### b) Usar `className` en lugar de `class`
```jsx
<div className="contenedor">Contenido</div>
```

### c) Cerrar siempre las etiquetas
```jsx
<img src="logo.png" alt="Logo" />
```

### d) Insertar JavaScript con llaves `{}`
```jsx
const nombre = 'React';
return <h1>Hola {nombre}</h1>;
```

### e) Los atributos siguen la sintaxis de JS (camelCase)
```jsx
<button onClick={manejarClick}>Clic</button>
```

### f) Usar fragmentos (`<> </>`) para evitar `div` innecesarios
En vez de envolver con un `div`, podemos usar **fragmentos**, que no generan un nodo extra en el DOM:
```jsx
return (
  <>
    <h1>Título</h1>
    <p>Subtítulo</p>
  </>
);
```
También podés usar `React.Fragment` explícitamente si necesitás agregar `key`:
```jsx
return (
  <React.Fragment key="grupo1">
    <h1>Título</h1>
    <p>Subtítulo</p>
  </React.Fragment>
);
```

---

## 4) Comparación con HTML
| Concepto | HTML | JSX |
|---------|------|-----|
| Clases | `class="boton"` | `className="boton"` |
| Atributos | `onclick="funcion()"` | `onClick={funcion}` |
| Cierre de etiquetas | `<img>` | `<img />` |
| Variables | No aplica | `{variable}` |

---

## 5) Ejemplo completo

### `src/App.jsx`
```jsx
import React from 'react';

function App() {
  const nombre = 'React';
  const tareas = ['Aprender JSX', 'Practicar Hooks', 'Construir componentes'];
  const mostrarLista = true;

  return (
    <>
      <h1 style={{ color: '#333', marginBottom: '10px' }}>Hola {nombre}</h1>

      {/* Renderizado condicional con && */}
      {mostrarLista && <h2>Lista de tareas</h2>}

      {/* Renderizado condicional con operador ternario */}
      {tareas.length > 0 ? (
        <ul>
          {tareas.map((tarea, i) => (
            <li key={i}>{tarea}</li>
          ))}
        </ul>
      ) : (
        <p>No hay tareas por hacer.</p>
      )}
    </>
  );
}

export default App;
```

**Qué aprender de este ejemplo:**
- Uso de `{}` para interpolar valores.
- Uso de `map` para renderizar listas.
- Uso de `key` para identificar cada elemento en la lista.
- Uso de **condicionales** con `&&` y operador ternario.
- Uso de **estilos en línea** mediante objetos JS.
- Uso de **fragmentos** para evitar nodos innecesarios en el DOM.

---

## 6) Beneficios de JSX
- Código más **legible y declarativo**.
- Más fácil de mantener y de razonar.
- Integración directa de lógica de JavaScript.
- Permite crear UI dinámicas con poco código.

---

## 7) Ejercicio recomendado
1. Crear un componente que muestre tu nombre y edad usando variables.
2. Crear un arreglo de colores y mostrarlos como lista.
3. Cambiar el estilo de los elementos usando `className` según una condición (por ejemplo, marcar en rojo si es un número menor a 5).
4. Usar renderizado condicional para mostrar un mensaje solo si el arreglo de colores está vacío.
5. Usar un **fragmento** para devolver múltiples elementos sin `div` extra.

---

**Conclusión:** JSX es la forma en que React nos permite describir cómo debe verse la interfaz de usuario, combinando la expresividad de HTML con la potencia de JavaScript de forma declarativa.

