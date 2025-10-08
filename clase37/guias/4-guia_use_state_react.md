# Guía paso a paso: Uso del **hook useState** en React

**Descripción:**
Esta guía está pensada para personas que recién empiezan con React. Explica qué es el hook `useState`, cómo usarlo para manejar estado en componentes funcionales, patrones comunes (números, cadenas, objetos, arreglos), actualizaciones dependientes del estado previo, y errores habituales. Incluye pasos detallados para preparar el entorno con **Vite** y ejemplos muy sencillos con explicaciones paso a paso.

---

## Contenido
1. Prerrequisitos
2. Crear un proyecto con Vite (React)
3. ¿Qué es `useState`?
4. Sintaxis básica y reglas
5. Ejemplo 1 — Contador simple
6. Ejemplo 2 — Estado con cadenas (input controlado)
7. Ejemplo 3 — Estado con objetos
8. Ejemplo 4 — Estado con arreglos
9. Actualizar estado dependiente del estado previo (funcional updater)
10. Errores comunes y recomendaciones
11. Ejercicios propuestos

---

## 1) Prerrequisitos
- Tener Node.js instalado (LTS recomendado).
- Conocimientos básicos de JavaScript y JSX.
- Haber creado un proyecto React con Vite (si no, sigue el paso 2 abajo).

---

## 2) Crear un proyecto con Vite (React) — paso rápido
Si no tenés proyecto, ejecutá en la terminal:

```bash
npm create vite@latest mi-app-usestate -- --template react
cd mi-app-usestate
npm install
npm run dev
```

Esto levanta Vite y podés abrir la app en `http://localhost:5173`.

---

## 3) ¿Qué es `useState`?
- `useState` es un *hook* que permite añadir estado local a un componente funcional.
- Devuelve un arreglo con dos elementos: el valor actual del estado y una función para actualizarlo.

```jsx
const [valor, setValor] = useState(valorInicial);
```

- `valorInicial` puede ser cualquier tipo (número, string, objeto, arreglo, null).
- La función `setValor` reemplaza el estado (no lo modifica en sitio), por eso para objetos/arreglos conviene crear una nueva referencia.

---

## 4) Sintaxis básica y reglas
- Importar desde React: `import React, { useState } from 'react';`
- Llamar `useState` siempre en el nivel superior del componente (no dentro de condicionales ni loops).
- Cada llamada a `useState` define una porción independiente de estado.

---

## 5) Ejemplo 1 — Contador simple
**Objetivo:** crear un contador que aumente y disminuya.

### `src/components/Contador.jsx`
```jsx
import React, { useState } from 'react';

export default function Contador() {
  // Inicializamos el estado en 0
  const [count, setCount] = useState(0);

  return (
    <div>
      <h2>Contador simple</h2>
      <p>Valor: {count}</p>

      {/* Aumentar */}
      <button onClick={() => setCount(count + 1)}>+</button>

      {/* Disminuir */}
      <button onClick={() => setCount(count - 1)}>-</button>

      {/* Reset */}
      <button onClick={() => setCount(0)}>Reset</button>
    </div>
  );
}
```

**Qué observar:** cada vez que llamás `setCount` React re-renderiza el componente con el nuevo valor.

---

## 6) Ejemplo 2 — Estado con cadenas (input controlado)
**Objetivo:** manejar el valor de un `input` con `useState`.

### `src/components/InputControlado.jsx`
```jsx
import React, { useState } from 'react';

export default function InputControlado() {
  const [texto, setTexto] = useState('');

  return (
    <div>
      <h2>Input controlado</h2>
      <input
        type="text"
        value={texto}                // el input toma el valor del estado
        onChange={(e) => setTexto(e.target.value)} // actualizamos el estado con lo tecleado
        placeholder="Escribí algo..."
      />
      <p>Escribiste: {texto}</p>
    </div>
  );
}
```

**Notas:**
- Esto se llama componente controlado: el valor del input viene del estado.
- Usá `e.target.value` para obtener el texto del input en el `onChange`.

---

## 7) Ejemplo 3 — Estado con objetos
**Objetivo:** guardar varios campos en un único objeto de estado.

### `src/components/FormularioSimple.jsx`
```jsx
import React, { useState } from 'react';

export default function FormularioSimple() {
  // Estado inicial como objeto
  const [form, setForm] = useState({ nombre: '', edad: '' });

  function handleChange(e) {
    const { name, value } = e.target;
    // Crear nueva referencia al objeto mezclando (spread)
    setForm(prev => ({ ...prev, [name]: value }));
  }

  return (
    <div>
      <h2>Formulario simple</h2>
      <input name="nombre" value={form.nombre} onChange={handleChange} placeholder="Nombre" />
      <input name="edad" value={form.edad} onChange={handleChange} placeholder="Edad" />
      <p>Nombre: {form.nombre} — Edad: {form.edad}</p>
    </div>
  );
}
```

**Importante:** nunca mutar directamente `form.nombre = 'x'`; siempre crear un nuevo objeto (por ejemplo con spread `...prev`).

---

## 8) Ejemplo 4 — Estado con arreglos
**Objetivo:** agregar y eliminar elementos de una lista en el estado.

### `src/components/ListaTareas.jsx`
```jsx
import React, { useState } from 'react';

export default function ListaTareas() {
  const [tareas, setTareas] = useState([]);
  const [texto, setTexto] = useState('');

  function agregar() {
    if (!texto) return;
    // Crear nueva referencia: nuevo arreglo con el elemento agregado
    setTareas(prev => [...prev, { id: Date.now(), texto }]);
    setTexto('');
  }

  function eliminar(id) {
    setTareas(prev => prev.filter(t => t.id !== id));
  }

  return (
    <div>
      <h2>Lista de tareas</h2>
      <input value={texto} onChange={(e) => setTexto(e.target.value)} placeholder="Nueva tarea" />
      <button onClick={agregar}>Agregar</button>
      <ul>
        {tareas.map(t => (
          <li key={t.id}>
            {t.texto} <button onClick={() => eliminar(t.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
```

**Puntos clave:** crear nuevos arreglos con spread o `filter` para mantener inmutabilidad.

---

## 9) Actualizar estado dependiente del estado previo (functional updater)
- Cuando la nueva versión del estado depende del anterior, es más seguro usar la función que recibe el valor previo.

Ejemplo con contador (evita problemas si hay actualizaciones en cola):
```jsx
setCount(prev => prev + 1);
```

Esto es importante cuando se llaman varias actualizaciones seguidas o dentro de efectos/handlers asíncronos.

---

## 10) Errores comunes y recomendaciones
- **No usar `useState` en condicionales o loops.** Siempre en el nivel superior del componente.
- **Mutar objetos/arrays directamente.** Siempre crear nuevas referencias (`...prev`, `filter`, `map`).
- **Olvidar pasar la función actualizadora.** `setX` no cambia el estado inmediatamente; programá en base al valor que React dará en el siguiente render.
- **Pensar en re-renderes innecesarios.** Si un objeto cambia de referencia aunque su contenido sea igual, React volverá a renderizar. Para optimizar usa `useMemo`, `useCallback` o descomponer estado.

---

## 11) Ejercicios propuestos
1. Crear un contador con botón que aumente 10 unidades cada vez (usar functional updater).
2. Crear un formulario con varias entradas (nombre, email) usando un solo objeto de estado.
3. Crear una lista de compras que permita marcar ítems como "comprado" (toggle) y filtrar los que están pendientes.