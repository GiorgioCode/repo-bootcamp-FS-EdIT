# ⚛️ Guía práctica: Usar **Zustand** en React (paso a paso)

Esta guía explica de forma clara y práctica cómo instalar y usar **Zustand**, una librería de estado global para React enfocada en simplicidad y rendimiento. Incluye ejemplos paso a paso y buenas prácticas.

---

## 📦 1. ¿Qué es Zustand y por qué usarlo?

Zustand es una librería pequeña y simple para manejar estado global en aplicaciones React. Sus ventajas principales:
- API mínima y fácil de aprender.
- Evita re-renderizados innecesarios gracias a selectores (suscripciones por propiedad).
- Menos “boilerplate” que `useReducer` + `useContext` o Redux.
- Soporta middleware (persistencia, devtools) fácilmente.

---

## 🛠️ 2. Instalación

Usando npm:
```bash
npm install zustand
```

Usando yarn:
```bash
yarn add zustand
```

Si quieres devtools y persistencia, instala también `zustand/middleware` (viene incluido en el paquete principal; no requiere instalación extra). Si usas TypeScript, instala los tipos de React si no los tienes:
```bash
npm install --save-dev @types/react
```

---

## 🧱 3. Crear tu primer store (store básico)

Crea un archivo para el store, por ejemplo `src/stores/useCounterStore.js`:

```js
// src/stores/useCounterStore.js
// 1. Importamos la función create de Zustand para crear el store
import create from "zustand";

// 2. Exportamos el hook personalizado que será nuestro store
export const useCounterStore = create((set) => ({
  // 3. Definimos el estado inicial - contador comienza en 0
  contador: 0,
  
  // 4. Definimos la acción incrementar usando set() para actualizar estado
  // set() recibe una función que toma el state actual y retorna el nuevo estado
  incrementar: () => set((state) => ({ contador: state.contador + 1 })),
  
  // 5. Acción decrementar - similar a incrementar pero resta 1
  decrementar: () => set((state) => ({ contador: state.contador - 1 })),
  
  // 6. Acción resetear - set() puede recibir directamente el nuevo objeto de estado
  // No necesita función porque no depende del estado anterior
  resetear: () => set({ contador: 0 }),
}));
```

Uso en un componente:

```jsx
// src/components/Contador.jsx
// 1. Importamos React (necesario para JSX)
import React from "react";
// 2. Importamos nuestro store personalizado
import { useCounterStore } from "../stores/useCounterStore";

function Contador() {
  // 3. Usamos el hook del store para obtener estado y acciones
  // Desestructuramos lo que necesitamos: valor del contador y las 3 acciones
  const { contador, incrementar, decrementar, resetear } = useCounterStore();
  
  // 4. Renderizamos la UI
  return (
    <div style={{ textAlign: "center" }}>
      {/* 5. Mostramos el valor actual del contador desde el store */}
      <h2>Contador: {contador}</h2>
      
      {/* 6. Botón que ejecuta la acción incrementar al hacer click */}
      <button onClick={incrementar}>+</button>
      
      {/* 7. Botón que ejecuta la acción decrementar al hacer click */}
      <button onClick={decrementar}>-</button>
      
      {/* 8. Botón que ejecuta la acción resetear al hacer click */}
      <button onClick={resetear}>Reset</button>
    </div>
  );
}

// 9. Exportamos el componente para poder usarlo en otros archivos
export default Contador;
```

📘 **Nota:** Cada llamada a `useCounterStore()` suscribe el componente solo a las partes del estado que se leen (mejor cuando uses selectores, ver abajo).

---

## 🎯 4. Usar selectores para evitar re-renderizados

En lugar de obtener todo el objeto del store, puedes seleccionar solo las partes necesarias:

```jsx
// 1. Selector específico para obtener SOLO el valor del contador
// Este componente solo se re-renderiza cuando cambia 'contador'
const contador = useCounterStore((state) => state.contador);

// 2. Selector específico para obtener SOLO la función incrementar
// Las funciones normalmente no cambian, pero es buena práctica usar selectores
const incrementar = useCounterStore((state) => state.incrementar);
```

Ejemplo optimizado en el componente:

```jsx
// Ejemplo de componente OPTIMIZADO con selectores
import React from "react";
import { useCounterStore } from "../stores/useCounterStore";

function ContadorOpt() {
  // 1. Selector optimizado: solo se suscribe al valor 'contador'
  // Si otras partes del store cambian, este componente NO se re-renderiza
  const contador = useCounterStore((s) => s.contador);
  
  // 2. Selector para la acción incrementar
  // (s) es abreviación de (state) - ambas formas son válidas
  const incrementar = useCounterStore((s) => s.incrementar);

  // 3. Este componente es MÁS EFICIENTE porque solo se actualiza
  // cuando 'contador' cambia, no cuando cambia todo el store
  return (
    <div>
      {/* 4. Mostramos solo el valor, sin texto extra */}
      <h3>{contador}</h3>
      
      {/* 5. Botón que ejecuta la acción optimizada */}
      <button onClick={incrementar}>+</button>
    </div>
  );
}
```

Esto hace que el componente se re-renderice **solo** cuando cambie `contador` o `incrementar` (según lo que se use).

---

## 💾 5. Persistencia (guardar en localStorage)

Zustand incluye middleware para persistir el estado. Ejemplo en `usePersistedStore.js`:

```js
// src/stores/usePersistedCounterStore.js
// 1. Importamos create para crear el store
import create from "zustand";
// 2. Importamos el middleware persist para persistencia automática
import { persist } from "zustand/middleware";

// 3. Creamos store envuelto en middleware persist
export const usePersistedCounterStore = create(
  // 4. persist() envuelve nuestra función de store
  persist(
    // 5. Función de store normal (igual que antes)
    (set) => ({
      // 6. Estado inicial - si existe en localStorage, lo usa; sino, usa 0
      contador: 0,
      
      // 7. Acción incrementar - cada cambio se guarda automáticamente
      incrementar: () => set((s) => ({ contador: s.contador + 1 })),
      
      // 8. Acción decrementar - también se persiste automáticamente
      decrementar: () => set((s) => ({ contador: s.contador - 1 })),
    }),
    // 9. Configuración del middleware persist
    {
      // 10. Nombre de la clave en localStorage donde se guardará
      name: "contador-storage",
      
      // 11. Tipo de storage a usar (localStorage por defecto)
      // También podría ser sessionStorage
      getStorage: () => localStorage,
    }
  )
);
```

---

## 🧰 6. Devtools

Para integrar con Redux DevTools (útil en desarrollo):

```js
// 1. Importamos create y el middleware devtools
import create from "zustand";
import { devtools } from "zustand/middleware";

// 2. Creamos store envuelto en devtools para debugging
export const useStore = create(
  // 3. devtools() habilita Redux DevTools para inspeccionar el store
  devtools((set) => ({
    // 4. Estado inicial
    contador: 0,
    
    // 5. Acción que aparecerá en DevTools con nombre automático
    incrementar: () => set((s) => ({ contador: s.contador + 1 })),
  }))
);
```

En muchos casos puedes combinar `devtools` y `persist` envolviéndolos desde afuera hacia adentro (o viceversa), por ejemplo:

```js
// Combinando múltiples middlewares - se lee de afuera hacia adentro:
// 1. create() crea el store
// 2. devtools() habilita Redux DevTools  
// 3. persist() habilita persistencia en localStorage
create(devtools(persist((set) => ({ ... }), { name: "app" })))
```

---

## 🧩 7. Stores compuestas y separar responsabilidades

En apps grandes es buena práctica **separar stores por responsabilidad** (similar a usar múltiples contextos):
- `src/stores/useUserStore.js` → usuario y autenticación
- `src/stores/useCartStore.js` → carrito de compras
- `src/stores/useUiStore.js` → estado de UI (modals, sidebars, tema)

Ejemplo rápido de `useUserStore`:

```js
// src/stores/useUserStore.js
// 1. Store separado SOLO para gestión de usuarios
import create from "zustand";

// 2. Store independiente - no interfiere con otros stores
export const useUserStore = create((set) => ({
  // 3. Estado inicial - usuario no logueado
  user: null,
  
  // 4. Acción para establecer usuario
  // Recibe el objeto user como parámetro y lo guarda
  setUser: (user) => set({ user }),
  
  // 5. Acción para cerrar sesión
  // Resetea user a null
  logout: () => set({ user: null }),
}));
```

---

## ♻️ 8. Acciones complejas y middleware

Puedes crear acciones más complejas que llamen APIs o realicen lógica asíncrona. Solo usa `set` dentro de la acción:

```js
// Store con acción asíncrona compleja
export const useUserStore = create((set) => ({
  // 1. Estados para manejar la carga asíncrona
  user: null,
  loading: false,
  error: null,
  
  // 2. Acción síncrona simple
  setUser: (user) => set({ user }),
  
  // 3. Acción ASÍNCRONA compleja - puede hacer llamadas a API
  fetchUser: async (id) => {
    // 4. Indicamos que empezó la carga
    set({ loading: true, error: null });
    
    try {
      // 5. Realizamos la llamada a la API
      const res = await fetch(`/api/user/${id}`);
      // 6. Convertimos respuesta a JSON
      const data = await res.json();
      // 7. Guardamos el usuario y terminamos la carga
      set({ user: data, loading: false });
    } catch (error) {
      // 8. Si hay error, lo guardamos y terminamos la carga
      set({ error: error.message, loading: false });
    }
  },
}));
```

Si necesitas más control (logging, side-effects), considera middleware personalizado.

---

## 🧪 9. Ejemplo con TypeScript

```ts
// src/stores/useCounterStore.ts
// 1. Importamos create (igual que en JavaScript)
import create from "zustand";

// 2. Definimos el TIPO del estado del store
// Esto da autocompletado y detección de errores
type State = {
  contador: number;           // Valor numérico
  incrementar: () => void;    // Función que no retorna nada
};

// 3. Creamos store con tipado explícito usando <State>
export const useCounterStore = create<State>((set) => ({
  // 4. Estado inicial - debe coincidir con el tipo State
  contador: 0,
  
  // 5. Función tipada - TypeScript verifica que sea correcta
  incrementar: () => set((s) => ({ contador: s.contador + 1 })),
}));
```

---

## ✅ 10. Buenas prácticas

- Divide los stores por responsabilidad (como con contextos).  
- Usa selectores `(state) => state.x` para suscribir componentes sólo a lo necesario.  
- Evita almacenar datos derivados que se pueden calcular a partir del estado.  
- Para lógica compleja, mantén las acciones en el store para centralizar cambios.  
- Usa `persist` solo cuando necesites mantener estado entre sesiones.  
- En producción, evita habilitar `devtools`.

---

## 🔁 11. Comparación rápida con useContext/useReducer

- **Zustand**: API simple, menos boilerplate, suscripciones selectivas, ideal para la mayoría de estados globales.  
- **useContext + useReducer**: Bueno para patrones React puros y cuando quieres controlar cada render; puede necesitar más código y provocar re-renderizados amplios si no se optimiza.  
- **Redux**: Más estructura y herramientas para apps muy grandes y equipos que necesitan convenciones estrictas.

---
