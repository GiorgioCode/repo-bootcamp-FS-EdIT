# Guía paso a paso: Uso de **useEffect** en React

**Descripción:**
Esta guía está pensada para principiantes que quieren aprender el hook `useEffect`. Explica de forma clara qué es, cómo funciona, sus casos de uso y cómo probarlo en un proyecto React.

---

## 1) Qué es `useEffect`
- Es un **hook** de React que permite ejecutar **efectos secundarios** después de que el componente se haya renderizado.
- Ejemplos de efectos secundarios:
  - Llamadas a API.
  - Suscripciones (WebSocket, eventos).
  - Temporizadores (`setTimeout`, `setInterval`).
  - Manipulación directa del DOM.

---

## 2) Sintaxis básica
```jsx
useEffect(() => {
  // código que se ejecuta después del render
  return () => {
    // cleanup opcional (se ejecuta antes de desmontar el componente)
  };
}, [dependencias]);
```

### Explicación de los parámetros:
1. **Función de efecto:** lo que queremos que ocurra.
2. **Array de dependencias:** le dice a React cuándo volver a ejecutar el efecto.

---

## 3) Creando el entorno de prueba con Vite
```bash
npm create vite@latest mi-app-useeffect -- --template react
cd mi-app-useeffect
npm install
npm run dev
```
Esto crea un proyecto base para probar los ejemplos.

---

## 4) Ejemplo 1 — useEffect sin dependencias
### `src/App.jsx`
```jsx
import { useState, useEffect } from 'react';

function App() {
  const [contador, setContador] = useState(0);

  useEffect(() => {
    console.log('El componente se montó');
  }, []); // [] significa que solo se ejecuta al montar el componente

  return (
    <>
      <h1>Contador: {contador}</h1>
      <button onClick={() => setContador(contador + 1)}>Sumar</button>
    </>
  );
}

export default App;
```

**Qué ocurre:**
- El `console.log` se ejecuta solo la primera vez que se monta el componente.

---

## 5) Ejemplo 2 — useEffect con dependencias
```jsx
useEffect(() => {
  console.log(`El contador cambió: ${contador}`);
}, [contador]);
```

**Qué ocurre:**
- Cada vez que `contador` cambie, el efecto se ejecutará de nuevo.

---

## 6) Ejemplo 3 — Limpieza de efectos (cleanup)
```jsx
useEffect(() => {
  const id = setInterval(() => {
    console.log('Intervalo ejecutado');
  }, 1000);

  return () => clearInterval(id); // Limpieza al desmontar
}, []);
```

**Por qué es importante:**
- Evita fugas de memoria o que el código siga ejecutándose cuando el componente ya no está en pantalla.

---

## 7) Errores comunes
- **Olvidar el array de dependencias:** provoca que el efecto se ejecute en cada render.
- **Poner dependencias incorrectas:** puede causar re-render infinitos.
- **No limpiar efectos:** en el caso de suscripciones o intervalos, deja procesos corriendo en segundo plano.

---

## 8) Ejercicio recomendado
1. Crear un contador que aumente automáticamente cada segundo usando `setInterval`.
2. Detener el contador al desmontar el componente usando la función de limpieza.
3. Mostrar en consola un mensaje cada vez que el contador cambie.

---

**Conclusión:** `useEffect` es esencial para manejar efectos secundarios de forma controlada y evitar comportamientos inesperados en tu aplicación React.

