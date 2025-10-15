# 🧭 Guía práctica del Hook `useReducer` en React

## 📘 Introducción

En React, los **hooks** son funciones especiales que permiten agregar
lógica de estado y otras funcionalidades a los **componentes
funcionales**.

Uno de estos hooks es **`useReducer`**, que se usa para **manejar
estados complejos** de una forma más organizada que `useState`.\
Si nunca usaste React antes, pensá en `useReducer` como una forma de
**controlar cómo cambia el estado de una aplicación**, paso a paso,
según lo que el usuario haga (por ejemplo: hacer clic, escribir algo,
etc).

------------------------------------------------------------------------

## 🧩 ¿Por qué no alcanza con `useState`?

Cuando el estado es simple (por ejemplo, un contador o un valor
booleano), `useState` está perfecto.\
Pero cuando el estado tiene **muchas propiedades** o **cambia según
distintas condiciones**, `useReducer` te ayuda a mantener el código más
limpio y fácil de mantener.

Ejemplo rápido:

``` jsx
// ✅ Con useState — sencillo
const [count, setCount] = useState(0);

// Para aumentar el contador
setCount(count + 1);
```

``` jsx
// 💪 Con useReducer — más estructurado
const [state, dispatch] = useReducer(reducer, { count: 0 });

// Para aumentar el contador
dispatch({ type: 'increment' });
```

En el segundo ejemplo, el **reducer** decide *cómo* debe cambiar el
estado dependiendo del tipo de acción (`increment`, `decrement`, etc).

------------------------------------------------------------------------

## ⚙️ Sintaxis básica

``` jsx
const [state, dispatch] = useReducer(reducer, initialState);
```

### Parámetros

-   **`reducer`** → función que define cómo cambia el estado.
-   **`initialState`** → el valor inicial del estado.

### Devuelve

-   **`state`** → el estado actual.
-   **`dispatch`** → una función para enviar "órdenes" (acciones) al
    reducer.

------------------------------------------------------------------------

## 🧠 Cómo funciona paso a paso

Imaginá que el reducer es como un **controlador de tráfico**: recibe las
"acciones" (órdenes) y decide cómo cambiar el estado.

``` jsx
// 1️⃣ Se define una función reducer
function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      // Si la acción es "incrementar", sumamos 1 al contador
      return { count: state.count + 1 };

    case 'decrement':
      // Si la acción es "decrementar", restamos 1
      return { count: state.count - 1 };

    case 'reset':
      // Si la acción es "resetear", volvemos a 0
      return { count: 0 };

    default:
      // Si no reconocemos la acción, devolvemos el estado igual
      return state;
  }
}
```

------------------------------------------------------------------------

## 🧪 Ejemplo completo explicado línea por línea

``` jsx
// Importamos useReducer desde React
import { useReducer } from "react";

// Definimos la función reducer que controla cómo cambia el estado
function reducer(state, action) {
  // "state" es el estado actual (ej: { count: 0 })
  // "action" es un objeto con una propiedad "type" (ej: { type: 'increment' })
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 }; // aumenta el contador
    case 'decrement':
      return { count: state.count - 1 }; // disminuye el contador
    case 'reset':
      return { count: 0 }; // vuelve a cero
    default:
      throw new Error('Acción no válida'); // si se envía algo desconocido
  }
}

// Creamos un componente funcional
export default function Contador() {
  // Inicializamos el hook useReducer
  // reducer → la función que define cómo cambia el estado
  // { count: 0 } → el estado inicial
  const [state, dispatch] = useReducer(reducer, { count: 0 });

  // "state" guarda el estado actual → state.count
  // "dispatch" sirve para enviar acciones al reducer

  return (
    <div style={{ textAlign: "center" }}>
      <h2>Contador: {state.count}</h2>

      {/* Cuando el usuario hace clic, enviamos distintas acciones */}
      <button onClick={() => dispatch({ type: 'increment' })}>+</button>
      <button onClick={() => dispatch({ type: 'decrement' })}>-</button>
      <button onClick={() => dispatch({ type: 'reset' })}>Reiniciar</button>
    </div>
  );
}
```

🧠 **Cómo leer esto si sos principiante:** - `useReducer` → maneja el
estado.\
- `dispatch` → envía órdenes (acciones).\
- `reducer` → decide qué hacer con esas órdenes.

------------------------------------------------------------------------

## 🧩 Acciones con datos adicionales (payload)

A veces queremos enviar datos junto con la acción. Por ejemplo,
establecer un número específico:

``` jsx
dispatch({ type: 'setCount', payload: 10 });
```

Y el reducer puede leerlo así:

``` jsx
function reducer(state, action) {
  switch (action.type) {
    case 'setCount':
      return { count: action.payload }; // usamos el valor que mandamos
    default:
      return state;
  }
}
```

💡 Esto es muy útil cuando los cambios dependen de valores externos (por
ejemplo, de un input).

------------------------------------------------------------------------

## 🧭 Ejemplo combinado con Context (nivel intermedio)

Este ejemplo muestra cómo compartir un estado global entre varios
componentes usando **useReducer** y **useContext**:

``` jsx
import { createContext, useReducer, useContext } from "react";

// 1️⃣ Creamos un contexto
const CounterContext = createContext();

// 2️⃣ Definimos el reducer
function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 };
    default:
      return state;
  }
}

// 3️⃣ Creamos un proveedor que envuelve a los componentes hijos
export function CounterProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, { count: 0 });

  return (
    <CounterContext.Provider value={{ state, dispatch }}>
      {children}
    </CounterContext.Provider>
  );
}

// 4️⃣ Creamos un hook personalizado para usar el contexto
export function useCounter() {
  return useContext(CounterContext);
}
```

💡 Con esto, cualquier componente dentro del `CounterProvider` puede
usar el estado y las acciones del contador sin necesidad de pasarlas
como props.

------------------------------------------------------------------------

## 🚀 Conclusión

El hook `useReducer` es como tener una **mini central de control** para
tu estado.\
Te ayuda a que el código sea más **estructurado, predecible y fácil de
mantener**, especialmente cuando tenés varios tipos de acciones o un
estado con muchas propiedades.

------------------------------------------------------------------------

**Resumen final:** \| Concepto \| Explicación \|
\|-----------\|-------------\| \| `state` \| Guarda el estado actual \|
\| `dispatch()` \| Envía una acción al reducer \| \| `reducer()` \|
Decide cómo actualizar el estado \| \| `initialState` \| Estado inicial
\| \| `action` \| Objeto con `type` y opcionalmente `payload` \|

------------------------------------------------------------------------