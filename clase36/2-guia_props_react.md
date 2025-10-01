# Guía paso a paso: Uso de **props** en React

**Descripción:**
Esta guía está pensada para alguien que no sabe nada de React. Explica qué son las _props_, cómo pasarlas a componentes, cómo definir valores por defecto y cómo usar `props.children`. Incluye instrucciones paso a paso para preparar un entorno de prueba con **Vite** y varios ejemplos muy sencillos con comentarios explicativos.

---

## Contenido

1. Prerrequisitos
2. Crear un proyecto con Vite (React)
3. Estructura mínima del proyecto
4. ¿Qué es una _prop_? (explicación simple)
5. Ejemplo 1 — Props básicas
6. Ejemplo 2 — Props con valores por defecto (default)
7. Ejemplo 3 — `props.children`
8. Propiedades avanzadas y consejos (pasar funciones, objetos)
9. Errores comunes y cómo solucionarlos
10. Ejercicios prácticos

---

## 1) Prerrequisitos

-   Tener instalado **Node.js** (recomendado: LTS, por ejemplo 16 o superior).
-   Tener un editor de texto / IDE (recomendado: VSCode).
-   Conocimientos mínimos: usar la terminal / línea de comandos.

Si no tienes Node instalado, ve a https://nodejs.org y descarga la versión LTS.

---

## 2) Crear un proyecto con Vite (React) — paso a paso

Abrir la terminal y ejecutar los siguientes comandos **uno por uno**:

```bash
# 1. Crear proyecto con Vite (plantilla React + JavaScript)
npm create vite@latest mi-aplicacion -- --template react

# 2. Entrar a la carpeta del proyecto
cd mi-aplicacion

# 3. Instalar dependencias
npm install

# 4. Levantar servidor de desarrollo
npm run dev
```

Al ejecutar `npm run dev` Vite mostrará una dirección local (por ejemplo `http://localhost:5173`). Abre esa dirección en el navegador para ver tu aplicación React corriendo.

> Nota: si prefieres `yarn` o `pnpm`, los comandos son equivalentes (`yarn create vite`, `pnpm create vite`), pero aquí usamos `npm` porque es el más común.

---

## 3) Estructura mínima del proyecto (archivos relevantes)

Después de crear el proyecto verás una estructura como esta (resumida):

```
mi-aplicacion/
├─ index.html
├─ package.json
└─ src/
   ├─ main.jsx      # punto de entrada (renderiza <App />)
   └─ App.jsx       # componente principal
```

Trabajaremos creando una carpeta `src/components` para poner nuestros componentes sencillos.

---

## 4) ¿Qué es una _prop_?

-   **Prop** = propiedad que pasamos a un componente para que ese componente pueda recibir datos desde su padre.
-   Piensa en un componente como una _función visual_. Las _props_ son sus argumentos.
-   Ejemplo conceptual (no React): `saludar(nombre)` → `nombre` es la "prop".

En JSX, pasamos props escribiendo atributos en la etiqueta del componente:

```jsx
<MiComponente titulo="Hola" />
<MiComponente numero={5} />
```

-   Los valores entre comillas son cadenas (strings).
-   Si queremos pasar números, booleanos, objetos o expresiones usamos llaves `{}`.

---

## 5) Ejemplo 1 — Props básicas

**Objetivo:** crear un componente `Saludo` que reciba una prop `nombre` y la muestre.

### Archivos a crear/modificar

1. `src/components/Saludo.jsx` (crear)
2. `src/App.jsx` (modificar para usar el componente)

### 1) `src/components/Saludo.jsx`

```jsx
// src/components/Saludo.jsx
import React from "react";

// Componente funcional que recibe props.
// Aquí desestructuramos la prop 'nombre' directamente en los parámetros.
export default function Saludo({ nombre }) {
    return (
        <div>
            {/* Usamos llaves para insertar la variable dentro del JSX */}
            <p>Hola, {nombre} 👋</p>
        </div>
    );
}
```

### 2) `src/App.jsx` (ejemplo de uso)

```jsx
// src/App.jsx
import React from "react";
import Saludo from "./components/Saludo";

export default function App() {
    return (
        <div style={{ padding: "1rem" }}>
            <h1>Ejemplo: props básicas</h1>

            {/* Pasamos la prop 'nombre' como string */}
            <Saludo nombre="Jorge" />

            {/* También se puede pasar usando llaves (expresión JS) */}
            <Saludo nombre={"María"} />

            {/* Pasamos un número (se mostrará tal cual) */}
            <Saludo nombre={10} />
        </div>
    );
}
```

**Qué observar al probar:**

-   Guarda los archivos y Vite recargará la página.
-   Verás tres saludos distintos según el valor de `nombre`.

---

## 6) Ejemplo 2 — Props con **valores por defecto** (default props)

A veces el componente se usa sin pasar una prop; podemos darle un valor por defecto para evitar `undefined`.

### Forma moderna recomendada (funciones): valor por defecto al desestructurar

```jsx
// src/components/SaludoPorDefecto.jsx
import React from "react";

// Si no llega 'nombre', se usa "amigo" como valor por defecto.
export default function SaludoPorDefecto({ nombre = "amigo" }) {
    return <p>Hola, {nombre} — este es un saludo con valor por defecto.</p>;
}
```

### Uso en `App.jsx`

```jsx
import SaludoPorDefecto from './components/SaludoPorDefecto';

// ... dentro de App()
<SaludoPorDefecto nombre="Lucía" />   // muestra Lucía
<SaludoPorDefecto />                   // no le pasamos 'nombre' -> muestra 'amigo'
```

### Alternativa: comprobar con `??` u `||`

```jsx
function Saludo2(props) {
    // Si props.nombre es undefined o null usamos 'amigo'
    const nombre = props.nombre ?? "amigo";
    return <p>Hola, {nombre}</p>;
}
```

### (Opcional) `defaultProps` en componentes de clase

```jsx
import React from "react";
class SaludoClass extends React.Component {
    render() {
        return <p>Hola, {this.props.nombre}</p>;
    }
}

// Para componentes de clase aún es válido
SaludoClass.defaultProps = { nombre: "amigo (class)" };
```

> Recomendación: para componentes funcionales modernos usa desestructuración con valores por defecto. `defaultProps` aún funciona para clases, pero se usa menos hoy.

---

## 7) Ejemplo 3 — `props.children`

`children` es una prop especial que contiene lo que está entre la etiqueta de apertura y cierre de un componente.

### Objetivo

Crear una `Tarjeta` (Card) que reciba `title` como prop y muestre cualquier contenido pasado dentro de la tarjeta usando `children`.

### `src/components/Tarjeta.jsx`

```jsx
import React from "react";

export default function Tarjeta({ title, children }) {
    return (
        <div
            style={{
                border: "1px solid #ddd",
                padding: "1rem",
                borderRadius: "8px",
                marginBottom: "1rem",
            }}
        >
            {title && <h3>{title}</h3>}
            <div>
                {/* Aquí se renderiza lo que el padre ponga dentro de <Tarjeta> ... </Tarjeta> */}
                {children}
            </div>
        </div>
    );
}
```

### Uso en `App.jsx`

```jsx
import Tarjeta from './components/Tarjeta';
import Saludo from './components/Saludo';

// ... dentro de App()
<Tarjeta title="Presentación">
  <p>Este es un texto dentro de la tarjeta.</p>
  <Saludo nombre="Ana" />
</Tarjeta>

<Tarjeta>
  {/* sin 'title', sólo children */}
  <p>Tarjeta sin título pero con contenido.</p>
</Tarjeta>
```

**Qué permite `children`**

-   Pasar texto, elementos HTML, otros componentes, listas, incluso funciones (render props).
-   El componente padre no necesita saber qué tipo de contenido irá dentro; `children` es flexible.

---

## 8) Propiedades avanzadas y consejos rápidos

-   **Pasar funciones (callbacks):** útil para eventos.

```jsx
function Boton({ onClick, etiqueta = "Pulsa" }) {
    return <button onClick={onClick}>{etiqueta}</button>;
}

// Uso
<Boton onClick={() => alert("Hiciste click!")} etiqueta="Aceptar" />;
```

-   **Pasar objetos** (útil para datos complejos):

```jsx
<Perfil usuario={{ nombre: "Diego", edad: 28 }} />;

// Dentro de Perfil
function Perfil({ usuario }) {
    return (
        <div>
            {usuario.nombre} — {usuario.edad} años
        </div>
    );
}
```

-   **Evitar pasar funciones anónimas en listas grandes** si causa re-renderes innecesarios (optimización avanzada).
-   **Nombres de props:** usar `camelCase` (ej: `onClick`, `userName`, `fechaCreacion`).

---

## 9) Errores comunes y soluciones

-   **`undefined` en pantalla:** significa que la prop no fue pasada. Usa valores por defecto o comprobaciones:
    ```jsx
    {
        nombre ?? "sin nombre";
    }
    ```
-   **Olvidar exportar/importar:** revisa `export default` y la ruta de import.
-   **Usar comillas cuando se requiere una expresión:** para números/objetos usa `{}`.
    ```jsx
    <Comp numero={5} />  // correcto
    <Comp numero="5" /> // pasa un string, no un número
    ```
-   **Modificar las props dentro del componente:** las props son de solo lectura. Para cambios usa `useState`.

---

## 10) Ejercicios propuestos (práctica)

1. Crea un componente `Lista` que reciba una prop `items` (array de strings) y renderice cada elemento en una lista (`<ul>`).
2. Crea un componente `Contador` que reciba `initialValue` como prop y muestre un contador con botones + / -. (usa `useState`).
3. Crea un componente `Modal` que use `children` y una prop `isOpen` que controle su visibilidad.

---

## Consejos finales

-   Practica modificando `App.jsx` y creando componentes pequeños.
-   Lee los mensajes de la consola del navegador cuando algo falla: son muy útiles.
-   Usa la documentación oficial de React para profundizar cuando ya te sientas cómodo: https://es.react.dev (o https://reactjs.org en inglés).

---
