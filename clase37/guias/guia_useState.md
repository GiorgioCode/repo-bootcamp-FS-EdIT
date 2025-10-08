# ¿Para qué se usa useState? ¿Por qué es necesario en React?

`useState` se usa para manejar **estado local** dentro de componentes funcionales. El estado es información que cambia con el tiempo (input de un formulario, contador, flags de UI) y que debe reflejarse en la interfaz.

Razón técnica: React renderiza funciones puras a partir de props/estado. Las funciones por sí solas no pueden "recordar" valores entre renders. `useState` provee un **mecanismo de almacenamiento reactivo** que:
- Persiste valores entre renders del componente.
- Garantiza un **re-render controlado** cuando el valor cambia (mediante el setter), manteniendo la UI sincronizada con el estado.
- Aísla el estado por componente, permitiendo composición y reutilización sin variables globales ni clases.

> Explicación para principiantes: imagina que tu componente es una función que se ejecuta muchas veces. Normalmente, una función "olvida" todo cuando termina. `useState` es como una pequeña libreta pegada al componente donde puedes anotar un número o un objeto y recuperarlo la próxima vez. Cuando cambias esa anotación con el setter, React "repinta" la parte visual para que coincida con lo que está en la libreta.

## ¿Por qué usar useState si en JavaScript no es necesario?

En JavaScript "puro" puedes guardar valores en variables (`let`, `const`) sin problemas. Pero en React necesitas que la UI se **sincronice** automáticamente con los cambios y que esa sincronización respete el **modelo de renderizado** de React.

- **Variables locales no re-renderizan**: cambiar `let x = 0; x = 1;` no hace que React vuelva a renderizar el componente. Con `useState`, `setX(1)` notifica a React para re-renderizar con el nuevo valor.
- **Los renders son funciones puras**: cada render es una llamada de función; las variables locales se recalculan y se pierden entre renders. `useState` persiste su valor entre renders y por instancia del componente.
- **Concurrencia y planificación**: React puede pausar, reintentar o descartar renders (Concurrent/Strict Mode). `useState` integra las actualizaciones al **programador de React** (batching, prioridad, consistencia) evitando estados intermedios rotos.
- **Identidad por instancia**: si tienes múltiples instancias de un componente, cada una necesita su propio estado aislado. `useState` lo liga a la instancia correcta automáticamente.
- **Evita cierres obsoletos (stale closures)**: usar variables mutables “a mano” con temporizadores/eventos puede capturar valores viejos. `useState` + setState funcional (p. ej., `setX(prev => prev + 1)`) mantiene la lógica consistente.

Comparación rápida:

```jsx
// JavaScript "puro" dentro de un componente React (no recomendado)
let contador = 0;
function onClick() {
  contador = contador + 1; // No dispara re-render; la UI no se actualiza
}

// React con useState (correcto)
const [contador, setContador] = useState(0);
function onClick() {
  setContador(c => c + 1); // Dispara re-render seguro y consistente
}
```

# Guía paso a paso: useState

Esta guía explica qué es `useState`, cómo usarlo paso a paso, cómo afecta el ciclo de vida del componente, y cómo evitar renderizados involuntarios.

## 1) ¿Qué es useState?
- **Estado local**: `useState` permite a un componente funcional guardar información que cambia con el tiempo.
- **Render**: Cuando actualizas el estado, React vuelve a renderizar el componente para reflejar el nuevo valor.

```jsx
// Importa el hook useState desde React para manejar estado local
import { useState } from "react";
```

## 2) Uso básico (paso a paso)
Antes de codificar, piensa así: tienes un "valor actual" y una forma oficial de **actualizarlo**. Nunca cambies el valor directamente; usa el **setter** para que React se entere y vuelva a dibujar la UI.
1. **Declara el estado** con un valor inicial.
2. **Lee el valor** del estado directamente.
3. **Actualiza** usando el setter para disparar un re-render.

```jsx
function ContadorBasico() {
  const [count, setCount] = useState(0); // 1) Declaración con valor inicial 0

  return (
    <div>
      <p>Valor: {count}</p> {/* 2) Leemos el valor */}
      <button onClick={() => setCount(count + 1)}>+1</button> {/* 3) Actualizamos */}
    </div>
  );
}
```

## 3) Actualizaciones basadas en el valor previo
- Usa la **función de actualización** para evitar condiciones de carrera cuando la nueva actualización depende de la anterior.

```jsx
setCount(prev => prev + 1); // Incrementa usando el valor previo de forma segura
```

## 4) Inicialización perezosa (lazy initialization)
- Si el valor inicial es costoso de calcular, pásale una **función** a `useState` para que se ejecute solo en el primer render (montado).

```jsx
const [items, setItems] = useState(() => calcularListaInicial()); // La función solo corre en el primer render
```

## 5) Cómo encaja en el ciclo de vida
- **Montado**: se evalúa el valor inicial de `useState` (o la función perezosa). No hay DOM aún, solo render virtual.
- **Actualización**: cada `setState` encola una actualización y React vuelve a renderizar el componente.
- **Desmontaje**: el estado se descarta junto con el componente.

Analogía: piensa en un teatro. El "estado" es el guion que tienen los actores. Si el guion cambia (setState), se repite la escena (re-render) para mostrar la nueva versión. Cuando la obra termina (desmontaje), se guarda todo y se descarta el guion de esa función.

Nota: En `StrictMode` (sólo desarrollo), React puede invocar el render inicial dos veces para detectar efectos secundarios. El estado final quedará correcto; evita efectos colaterales en el cuerpo del componente.

## 6) Evitar renderizados o re-renderizados involuntarios
- **No mutar objetos/arrays**: crea nuevas referencias para que React detecte cambios correctamente pero evita renders innecesarios aguas abajo.
  - Correcto: `setUser(prev => ({ ...prev, nombre: "Ana" }))`
  - Incorrecto: `prev.nombre = "Ana"; setUser(prev)`
- **Agrupa actualizaciones**: React ya agrupa eventos, pero si haces múltiples `setState` interdependientes, usa la forma funcional.
- **Memoriza callbacks** con `useCallback` cuando pases funciones a hijos que se renderizan frecuentemente.
- **Memoriza valores** con `useMemo` si calculas valores costosos que se usan en el render.
- **Evita crear objetos/funciones inline** si causan renders en hijos que dependen de identidad (usa `useMemo`/`useCallback`).

Piénsalo así: si pasas a un componente hijo un **objeto nuevo** en cada render (aunque tenga los mismos datos), el hijo podría creer que algo cambió y re-renderizarse. Memorizar con `useMemo`/`useCallback` ayuda a **no cambiar la identidad** cuando el contenido no cambió.

## 7) Patrones comunes
- **Formularios controlados**:
```jsx
// Estado del formulario con dos campos controlados
const [form, setForm] = useState({ email: "", pass: "" });
// Actualiza la propiedad correspondiente a partir del name del input
const onChange = e => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
```
- **Toggles**:
```jsx
// Flag booleano para abrir/cerrar algo en la UI
const [abierto, setAbierto] = useState(false);
// Cambia el valor al opuesto tomando el valor actual de forma segura
const toggle = () => setAbierto(a => !a);
```
- **Listas**:
```jsx
// Lista de tareas almacenada en estado
const [todos, setTodos] = useState([]);
// Agrega una nueva tarea preservando las existentes y generando un id simple
const addTodo = texto => setTodos(prev => [...prev, { id: Date.now(), texto }]);
```

## 8) Errores frecuentes (explicados y con solución)

- **Llamar `setState` en cada render sin condiciones (bucle de renders)**
  - Qué pasa: si dentro del cuerpo del componente llamas a `setState` sin una condición, cada render dispara otro render indefinidamente.
  - Síntomas: el componente se re-renderiza de forma infinita, alta CPU, la app parece trabada.
  - Ejemplo incorrecto:
    ```jsx
    import { useState } from "react";
    function Ejemplo() {
      const [n, setN] = useState(0);
      // ❌ Malo: cada render ejecuta esto y vuelve a renderizar
      setN(1);
      return <p>{n}</p>;
    }
    ```
  - Solución: mueve la actualización a un evento o a un `useEffect` con dependencias adecuadas, o agrega condiciones lógicas que eviten ejecutar `setState` en cada render.
    ```jsx
    import { useState } from "react";
    function Ejemplo() {
      const [n, setN] = useState(0);
      function iniciar() { setN(1); } // ✅ Solo al hacer clic
      return <button onClick={iniciar}>Fijar en 1 ({n})</button>;
    }
    ```

- **Modificar el estado directamente (mutación) en vez de crear copia**
  - Qué pasa: React compara referencias para decidir qué actualizar. Si mutas el mismo objeto/array, puedes provocar renders inconsistentes y bugs difíciles.
  - Síntomas: la UI no se actualiza o hijos no detectan cambios; efectos que no se disparan.
  - Ejemplo incorrecto:
    ```jsx
    import { useState } from "react";
    function Perfil() {
      const [user, setUser] = useState({ nombre: "Ana", edad: 20 });
      function cambiar() {
        user.edad = 21;       // ❌ mutación
        setUser(user);        // misma referencia
      }
      return <button onClick={cambiar}>{user.edad}</button>;
    }
    ```
  - Solución: crea una **nueva referencia** copiando el objeto/array.
    ```jsx
    import { useState } from "react";
    function Perfil() {
      const [user, setUser] = useState({ nombre: "Ana", edad: 20 });
      function cambiar() {
        setUser(prev => ({ ...prev, edad: 21 })); // ✅ nueva referencia
      }
      return <button onClick={cambiar}>{user.edad}</button>;
    }
    ```

- **Depender del estado actual sin usar la forma funcional de `setState`**
  - Qué pasa: si calculas el nuevo estado a partir del estado anterior, usar `setX(x + 1)` puede quedar desfasado cuando hay varias actualizaciones en cola.
  - Síntomas: conteos que saltan valores, resultados inesperados al hacer varias actualizaciones seguidas.
  - Ejemplo incorrecto (puede perder incrementos):
    ```jsx
    import { useState } from "react";
    function Contador() {
      const [n, setN] = useState(0);
      function sumarDos() {
        setN(n + 1); // ❌ usa n "viejo" si hay batching
        setN(n + 1);
      }
      return <button onClick={sumarDos}>{n}</button>;
    }
    ```
  - Solución: usa la **forma funcional** para garantizar que partes del valor más reciente.
    ```jsx
    import { useState } from "react";
    function Contador() {
      const [n, setN] = useState(0);
      function sumarDos() {
        setN(prev => prev + 1); // ✅ parte del valor actual
        setN(prev => prev + 1);
      }
      return <button onClick={sumarDos}>{n}</button>;
    }
    ```

## 9) Ejemplo completo con mejores prácticas (solo useState)
```jsx
import { useState } from "react";

function ContadorAvanzado({ paso = 1 }) {
  const [valor, setValor] = useState(0);

  // Handlers sin otros hooks
  function inc() {
    setValor(v => v + paso);
  }
  function dec() {
    setValor(v => v - paso);
  }

  return (
    <div>
      <p>Valor: {valor}</p>
      <button onClick={dec}>-</button>
      <button onClick={inc}>+</button>
    </div>
  );
}
```

## 10) Checklist rápido
- ¿La actualización depende del valor anterior? Usa la forma funcional.
- ¿Creas objetos/funciones en el render? Memoriza si causa renders innecesarios.
- ¿Mutas el estado? Evítalo, haz copias.
