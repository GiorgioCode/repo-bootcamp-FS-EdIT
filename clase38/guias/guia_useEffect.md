# ¿Para qué se usa useEffect? ¿Por qué es necesario en React?

`useEffect` se usa para manejar **efectos secundarios** en componentes funcionales: código que interactúa con el exterior (fetch, timers, websockets, listeners, almacenamiento, título del documento, etc.) y que debe ejecutarse **después** del render.

Razón técnica: el render de React debe ser **puro** (sin efectos colaterales) y determinista; sólo transforma props/estado en UI. `useEffect` proporciona un **canal controlado de efectos** que:
- Se ejecuta tras el render, evitando bloquear el pintado y manteniendo el render puro.
- Se **sincroniza** con el ciclo de vida (montado/actualización/desmontaje) mediante el array de dependencias y la función de limpieza.
- Permite limpiar recursos (cleanup) para prevenir fugas de memoria y estados inconsistentes.

> Explicación para principiantes: piensa en el componente como una cocina. El **render** es preparar el plato (no ensucia nada fuera del plato). Los **efectos** son acciones como encender el horno, poner un temporizador o avisar a alguien: suceden después de tener el plato listo. Al terminar, debes **apagar el horno y limpiar** (cleanup) para no dejar cosas encendidas.

# Guía paso a paso: useEffect

Esta guía explica `useEffect` con foco en montado, ciclo de vida, dependencias, limpieza (cleanup) y cómo evitar renderizados/rerenders involuntarios.

## 1) ¿Qué es useEffect?
- Permite ejecutar **efectos secundarios** después de que React haya renderizado: suscripciones, timers, peticiones HTTP, manipulación de APIs del navegador, sincronización con sistemas externos, etc.
- `useEffect` corre **después** del render en el navegador (no bloquea el pintado).

```jsx
// Importa el hook useEffect para ejecutar efectos secundarios tras el render
import { useEffect } from "react";
```

## 2) Estructura básica
```jsx
useEffect(() => {
  // 1) Efecto: se ejecuta después del render
  return () => {
    // 2) Cleanup: se ejecuta antes del próximo efecto o al desmontar
  };
}, [/* dependencias */]);
```

- El **efecto** ve los valores actuales del render.
- El **cleanup** limpia suscripciones, timers o listeners para evitar pérdidas de memoria y comportamientos inesperados.

Analogía rápida: el efecto es "encender un temporizador" y el cleanup es "apagarlo". Si cambias la duración del temporizador (dependencias), apagas el anterior y enciendes uno nuevo.

## 3) Montado, actualización y desmontaje
- **Montado**: el efecto se ejecuta tras el primer render.
- **Actualización**: el efecto se vuelve a ejecutar cuando alguna dependencia cambia; antes de re-ejecutar, se corre el cleanup previo.
- **Desmontaje**: al remover el componente del árbol, React ejecuta el último cleanup.

## 4) Patrón de dependencias
- `[]` (array vacío): se ejecuta solo en el montado (y cleanup al desmontar).
- `[a, b]`: se ejecuta en el montado y cuando `a` o `b` cambian.
- Sin array: se ejecuta en **cada** render (normalmente no recomendado).

```jsx
// Montado una vez
useEffect(() => {
  console.log("montado"); // Se ejecuta después del primer render
  return () => console.log("desmontado"); // Cleanup al desmontar el componente
}, []);

// Reaccionar a cambios de "query"
useEffect(() => {
  // Este efecto se ejecuta cuando cambia 'query'
  fetch(`/api?q=${query}`); // Sincroniza datos externos con el estado 'query'
  // No hay cleanup aquí porque no abrimos suscripciones ni timers
}, [query]);
```

Piénsalo así: el **array de dependencias** es la lista de ingredientes que, si cambian, te obligan a repetir la receta. Si no cambia nada, no repites el efecto.

## 5) Evitar bucles y re-renderizados involuntarios
- Incluye **todas** las dependencias que lees dentro del efecto: variables, props, y funciones usadas dentro.
- Evita recrear funciones/valores innecesariamente dentro del render si eso dispara el efecto sin necesidad (verás herramientas para esto más adelante).
- No llames `setState` sin condiciones dentro de un efecto que depende de ese mismo estado; crea una **condición** para evitar un bucle.

```jsx
// Posible bucle si value cambia siempre
useEffect(() => {
  if (value < 10) {
    setValue(v => v + 1);
  }
}, [value]);
```

Regla práctica: si el efecto usa algo, **decláralo** en dependencias; si eso causa re-ejecuciones indeseadas, ajusta la **condición** dentro del efecto o refactoriza el código. (Más adelante aprenderás herramientas para estabilizar identidades.)

## 6) Limpieza (cleanup) correcta
- Cancela timers: `clearInterval`, `clearTimeout`.
- Remueve listeners o suscripciones.
- Aborta fetches con `AbortController` si el componente se desmonta.

```jsx
useEffect(() => {
  const id = setInterval(() => console.log("tick"), 1000);
  return () => clearInterval(id);
}, []);
```

## 7) Efectos vs. eventos
- Prefiere **eventos** (onClick, onChange) para lógica iniciada por el usuario y **efectos** para sincronizar con el exterior.
- No uses efectos para derivar valores que puedes calcular durante el render (usa props/estado directamente o `useMemo`).

Analogía: un **evento** es que el usuario toque un botón (acción directa). Un **efecto** es llamar a un servicio externo o poner un temporizador "como consecuencia" de que el estado/las props cambiaron.

## 8) Datos y peticiones
- Maneja **abortos** y **estados** (loading, error).
- Evita race conditions si `query` cambia rápido.

```jsx
useEffect(() => {
  const ctrl = new AbortController(); // Controla la cancelación del fetch
  async function load() {
    try {
      setLoading(true); // 1) Indica que empezamos a cargar
      const res = await fetch(`/api?q=${query}`, { signal: ctrl.signal }); // 2) Petición con señal de aborto
      const data = await res.json(); // 3) Parsear JSON
      setData(data); // 4) Guardar datos en estado
    } catch (e) {
      if (e.name !== 'AbortError') setError(e); // 5) Si no fue cancelación, guardar error
    } finally {
      setLoading(false); // 6) Finalizar carga pase lo que pase
    }
  }
  load(); // Ejecutar la carga
  return () => ctrl.abort(); // Cleanup: aborta si cambia 'query' o se desmonta
}, [query]);
```

## 9) Modo estricto y dobles invocaciones (desarrollo)
- En `StrictMode` (sólo dev) React puede **montar, ejecutar el efecto, limpiar y volver a montar** para ayudarte a detectar efectos con fugas.
- No afecta producción, pero asegúrate que los efectos sean **idempotentes** y que la limpieza sea correcta.

## 10) Checklist rápido
- ¿Incluiste todas las dependencias? (props, estado, funciones usadas)
- ¿Tu efecto hace limpieza adecuada? (cancelar timers, listeners, abortar fetch)
- ¿Estás evitando bucles de `setState`? (condiciones, memoización)
- ¿Debería ser un evento en vez de un efecto?

## 11) Ejemplo completo
```jsx
// Importa useEffect y useState para manejar efectos y estado local
import { useEffect, useState } from "react";

function Buscador({ initialQuery = "react" }) {
  // Estado de la consulta de búsqueda
  const [query, setQuery] = useState(initialQuery);
  // Estado con los resultados recibidos
  const [data, setData] = useState([]);
  // Estado de carga y error para mostrar feedback en la UI
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Handler simple de input: actualiza 'query' con lo que escribe el usuario
  function onChange(e) {
    setQuery(e.target.value);
  }

  useEffect(() => {
    const ctrl = new AbortController(); // Permite cancelar la petición si 'query' cambia o se desmonta
    async function load() {
      try {
        setLoading(true); // 1) Marcamos estado de carga
        const res = await fetch(`/api?q=${encodeURIComponent(query)}`, { signal: ctrl.signal }); // 2) Fetch con señal
        if (!res.ok) throw new Error("HTTP " + res.status); // 3) Validar respuesta HTTP
        const json = await res.json(); // 4) Convertir a JSON
        setData(json); // 5) Guardar resultados
      } catch (e) {
        if (e.name !== 'AbortError') setError(e); // 6) Guardar error si no fue cancelación
      } finally {
        setLoading(false); // 7) Fin de carga
      }
    }
    load(); // Ejecuta la carga inicial y en cada cambio de 'query'
    return () => ctrl.abort(); // Cleanup: aborta la petición anterior
  }, [query]);

  return (
    <div>
      {/* Input controlado por 'query' */}
      <input value={query} onChange={onChange} />
      {/* Mensaje de carga condicional */}
      {loading && <p>Cargando...</p>}
      {/* Mensaje de error si existe */}
      {error && <p>Error: {String(error)}</p>}
      {/* Lista de resultados renderizada desde 'data' */}
      <ul>
        {data.map(item => <li key={item.id}>{item.name}</li>)}
      </ul>
    </div>
  );
}
```
