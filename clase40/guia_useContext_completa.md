# 🌐 Guía práctica: useContext() en React

Esta guía explica **cómo usar el hook `useContext()`** en React, cómo **crear contextos separados**, y cómo **evitar problemas de rendimiento** cuando la aplicación crece.

---

## 📘 1. ¿Qué es useContext()?

El hook `useContext()` permite **compartir información entre componentes** sin necesidad de pasar props manualmente a cada uno.

Se utiliza junto con `React.createContext()` para crear un **Contexto**, que actúa como un contenedor global de datos.

Ejemplo básico:

```jsx
// 1. Importamos React y los hooks necesarios
import React, { createContext, useContext } from "react";

// 2. Creamos el contexto con un valor por defecto
// "claro" será el valor si no hay Provider
const TemaContext = createContext("claro");

function MuestraTema() {
  // 3. Usamos useContext para leer el valor del contexto
  // Busca el Provider más cercano en el árbol de componentes
  const tema = useContext(TemaContext);
  
  // 4. Renderizamos el valor obtenido del contexto
  return <p>El tema actual es: {tema}</p>;
}

function App() {
  return (
    // 5. Provider envuelve los componentes que necesitan acceso al contexto
    // value="oscuro" sobrescribe el valor por defecto
    <TemaContext.Provider value="oscuro">
      {/* 6. Cualquier componente hijo puede leer el valor "oscuro" */}
      <MuestraTema />
    </TemaContext.Provider>
  );
}
```

---

## 🧩 2. Estructura recomendada de archivos

Cuando la aplicación crece, es buena práctica **crear un archivo separado para cada contexto**.

Por ejemplo:

```
src/
│
├── context/
│   ├── UsuarioContext.jsx
│   ├── TemaContext.jsx
│
├── components/
│   ├── Navbar.jsx
│   └── Perfil.jsx
│
└── App.jsx
```

---

## 👤 3. Ejemplo: UsuarioContext

Creamos un contexto para almacenar información del usuario.

```jsx
// src/context/UsuarioContext.jsx
// 1. Importamos createContext para crear el contexto y useState para el estado
import { createContext, useState } from "react";

// 2. Creamos el contexto - exportamos para usarlo en otros componentes
// No pasamos valor por defecto, será undefined si se usa sin Provider
export const UsuarioContext = createContext();

// 3. Creamos el componente Provider que manejará el estado
export function UsuarioProvider({ children }) {
  // 4. Estado local del usuario con useState - este será el valor del contexto
  const [usuario, setUsuario] = useState({ nombre: "Jorge", rol: "admin" });

  // 5. Función para cambiar el nombre del usuario
  const cambiarUsuario = (nuevoNombre) => {
    // 6. Actualizamos solo el nombre, manteniendo las otras propiedades
    setUsuario({ ...usuario, nombre: nuevoNombre });
  };

  // 7. Renderizamos el Provider con el valor que queremos compartir
  return (
    <UsuarioContext.Provider value={{ usuario, cambiarUsuario }}>
      {/* 8. children son todos los componentes hijos que tendrán acceso al contexto */}
      {children}
    </UsuarioContext.Provider>
  );
}
```

---

## 🎨 4. Ejemplo: TemaContext

Creamos un segundo contexto para manejar el **tema visual**.

```jsx
// src/context/TemaContext.jsx
// 1. Importamos las funciones necesarias de React
import { createContext, useState } from "react";

// 2. Creamos el contexto para el tema
export const TemaContext = createContext();

// 3. Provider component que maneja el estado del tema
export function TemaProvider({ children }) {
  // 4. Estado para guardar el tema actual - inicia en "claro"
  const [tema, setTema] = useState("claro");

  // 5. Función para alternar entre tema claro y oscuro
  const alternarTema = () => {
    // 6. Usamos función callback en setTema para alternar basado en valor previo
    setTema((prev) => (prev === "claro" ? "oscuro" : "claro"));
  };

  // 7. Proveemos el tema actual y la función para alternarlo
  return (
    <TemaContext.Provider value={{ tema, alternarTema }}>
      {/* 8. Todos los componentes hijo tendrán acceso a tema y alternarTema */}
      {children}
    </TemaContext.Provider>
  );
}
```

---

## 🏗️ 5. Combinando múltiples contextos en App.jsx

Podemos envolver la aplicación en varios `Provider`s para que ambos contextos estén disponibles globalmente.

```jsx
// App.jsx
// 1. Importamos los Providers de nuestros contextos
import { UsuarioProvider } from "./context/UsuarioContext";
import { TemaProvider } from "./context/TemaContext";
// 2. Importamos los componentes que usarán los contextos
import Navbar from "./components/Navbar";
import Perfil from "./components/Perfil";

function App() {
  return (
    // 3. Envolvemos toda la app en UsuarioProvider primero
    <UsuarioProvider>
      {/* 4. Dentro anidamos TemaProvider - ambos contextos estarán disponibles */}
      <TemaProvider>
        {/* 5. Estos componentes pueden usar AMBOS contextos */}
        {/* porque están dentro de ambos Providers */}
        <Navbar />
        <Perfil />
      </TemaProvider>
    </UsuarioProvider>
  );
}

// 6. Exportamos App para usar en main.jsx o index.js
export default App;
```

---

## 🧭 6. Consumiendo contextos en componentes

Podemos acceder a los valores desde cualquier componente hijo usando `useContext()`.

```jsx
// components/Navbar.jsx
// 1. Importamos useContext para leer los contextos
import { useContext } from "react";
// 2. Importamos los contextos que necesitamos
import { UsuarioContext } from "../context/UsuarioContext";
import { TemaContext } from "../context/TemaContext";

function Navbar() {
  // 3. Leemos solo lo que necesitamos del UsuarioContext
  const { usuario } = useContext(UsuarioContext);
  
  // 4. Leemos el tema actual y la función para alternarlo
  const { tema, alternarTema } = useContext(TemaContext);

  return (
    // 5. Aplicamos estilos dinámicos basados en el tema
    <nav style={{ 
      backgroundColor: tema === "claro" ? "#eee" : "#333", 
      color: tema === "claro" ? "#000" : "#fff", 
      padding: "1rem" 
    }}>
      {/* 6. Mostramos el nombre del usuario desde el contexto */}
      <p>Usuario: {usuario.nombre}</p>
      
      {/* 7. Botón que ejecuta la función del contexto de tema */}
      <button onClick={alternarTema}>Cambiar tema</button>
    </nav>
  );
}

// 8. Exportamos el componente
export default Navbar;
```

---

## 🧠 7. Evitar contextos demasiado grandes

Cada vez que cambia un valor en un contexto, **todos los componentes que lo usan se re-renderizan**.

Por eso:
- No coloques *todo* el estado global en un solo contexto.
- Divide los contextos por responsabilidad: usuario, tema, configuración, etc.
- Evita pasar funciones o estados que cambian muy seguido si no son necesarios.

---

## ⚙️ 8. useReducer + useContext para estados complejos

Si el estado del contexto tiene muchas propiedades o acciones, es más eficiente combinarlo con `useReducer()`.

Ejemplo:

```jsx
// src/context/ContadorContext.jsx
// 1. Importamos createContext y useReducer para manejar estado complejo
import { createContext, useReducer } from "react";

// 2. Creamos el contexto para el contador
export const ContadorContext = createContext();

// 3. Función reducer que maneja las acciones del contador
function reducer(state, action) {
  // 4. Switch evalúa el tipo de acción recibida
  switch (action.type) {
    case "incrementar":
      // 5. Retornamos nuevo estado incrementando el contador
      // Usamos spread operator para mantener otras propiedades del state
      return { ...state, contador: state.contador + 1 };
      
    case "decrementar":
      // 6. Retornamos nuevo estado decrementando el contador
      return { ...state, contador: state.contador - 1 };
      
    default:
      // 7. Si la acción no existe, retornamos el estado sin cambios
      return state;
  }
}

// 8. Provider que usa useReducer en lugar de useState
export function ContadorProvider({ children }) {
  // 9. useReducer nos da state actual y dispatch para enviar acciones
  // Estado inicial: { contador: 0 }
  const [state, dispatch] = useReducer(reducer, { contador: 0 });

  // 10. Proveemos tanto el state como dispatch a los componentes hijos
  return (
    <ContadorContext.Provider value={{ state, dispatch }}>
      {children}
    </ContadorContext.Provider>
  );
}
```

Uso en un componente:

```jsx
// Componente que usa useReducer + useContext
// 1. Importamos useContext para leer el contexto
import { useContext } from "react";
// 2. Importamos el contexto del contador
import { ContadorContext } from "../context/ContadorContext";

function Contador() {
  // 3. Obtenemos state y dispatch del contexto
  // state contiene { contador: number }
  // dispatch es función para enviar acciones
  const { state, dispatch } = useContext(ContadorContext);

  return (
    <div style={{ textAlign: "center" }}>
      {/* 4. Mostramos el valor del contador desde state.contador */}
      <h2>Contador: {state.contador}</h2>
      
      {/* 5. Botón que dispara acción "incrementar" */}
      <button onClick={() => dispatch({ type: "incrementar" })}>+</button>
      
      {/* 6. Botón que dispara acción "decrementar" */}
      <button onClick={() => dispatch({ type: "decrementar" })}>-</button>
    </div>
  );
}

// 7. Exportamos el componente
export default Contador;
```

---

## ✅ 9. Buenas prácticas

- ✅ Divide contextos por responsabilidad.  
- ✅ Coloca los Providers en lo más alto posible del árbol, pero **solo donde sean necesarios**.  
- ✅ Combina `useReducer` si el estado es complejo.  
- ❌ No uses un solo contexto para toda la app.  
- ❌ No abuses de los re-renderizados al actualizar datos innecesarios.  
