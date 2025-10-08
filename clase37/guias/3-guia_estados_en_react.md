# Guía paso a paso: Por qué los estados en React deben manejarse con **useState**

**Descripción:**
Esta guía explica de manera sencilla y paso a paso **por qué en React no se deben manejar los estados como en JavaScript vanilla**, sino que debemos usar `useState`. Está pensada para principiantes y usa ejemplos simples.

---

## 1) Contexto: Qué es el estado en React
En React, el **estado** es la información que cambia a lo largo del tiempo y que React usa para decidir **qué volver a renderizar** en pantalla.

Ejemplo de estado:
- Contador que incrementa.
- Lista de tareas.
- Bandera de si un modal está abierto o cerrado.

---

## 2) Cómo lo haríamos en JavaScript vanilla
En JavaScript clásico, podríamos guardar valores en variables y modificar el DOM manualmente:

```html
<body>
  <p id="contador">0</p>
  <button onclick="incrementar()">Incrementar</button>

  <script>
    let contador = 0;

    function incrementar() {
      contador++;
      document.getElementById('contador').textContent = contador;
    }
  </script>
</body>
```

**Problema:**
- Nosotros mismos debemos actualizar el DOM.
- Si el valor cambia en otro lugar, el DOM no se actualiza automáticamente.
- No existe un sistema que "recuerde" el valor de contador entre renderizados automáticos.

---

## 3) Qué pasa si usamos variables en React (MALA PRÁCTICA)
Si en React hacemos esto:

```jsx
function App() {
  let contador = 0;

  function incrementar() {
    contador++;
    console.log(contador);
  }

  return (
    <div>
      <p>{contador}</p>
      <button onClick={incrementar}>Incrementar</button>
    </div>
  );
}
```

**Qué ocurre:**
- Cada vez que React vuelve a renderizar el componente, **contador vuelve a 0**.
- No hay forma de mantener el valor entre renderizados.
- React no sabe que debe volver a dibujar la pantalla cuando `contador` cambia.

---

## 4) La solución: `useState`
React provee el hook `useState` que:
1. Guarda el valor entre renderizados.
2. Informa a React que debe **volver a renderizar el componente** si el valor cambia.

Ejemplo correcto:

```jsx
import { useState } from 'react';

function App() {
  const [contador, setContador] = useState(0); // Estado inicial = 0

  function incrementar() {
    setContador(contador + 1); // Actualiza el estado y provoca re-render
  }

  return (
    <div>
      <p>{contador}</p>
      <button onClick={incrementar}>Incrementar</button>
    </div>
  );
}

export default App;
```

**Ventajas:**
- React mantiene el valor aunque el componente se vuelva a renderizar.
- React actualiza el DOM de forma automática.
- Garantiza que el componente siempre muestre el valor correcto.

---

## 5) Razones técnicas
- **Renderizado declarativo:** React vuelve a generar la UI cada vez que cambia el estado. Si usamos variables normales, React no detecta cambios y no vuelve a renderizar.
- **Sincronización:** `useState` garantiza que la UI y los datos estén siempre sincronizados.
- **Aislamiento por componente:** Cada componente tiene su propio estado aislado.
- **Eficiencia:** React optimiza los renderizados basándose en los cambios de estado.

---

## 6) Resumen
| Manejo de estado | ¿Persiste entre renderizados? | ¿React vuelve a renderizar? |
|------------------|--------------------------------|-----------------------------|
| Variable normal  | ❌ No                          | ❌ No                        |
| `useState`       | ✅ Sí                          | ✅ Sí                        |

**Conclusión:** En React es fundamental usar `useState` (o hooks de estado similares) para que la interfaz se mantenga en sincronía con los datos y React pueda hacer su trabajo de forma eficiente.

---

## 7) Ejercicio recomendado
1. Crea un proyecto React con Vite.
2. Implementa el ejemplo incorrecto usando variables normales y observa que no funciona.
3. Luego cambia a `useState` y verifica que el contador ahora sí se actualiza correctamente.

