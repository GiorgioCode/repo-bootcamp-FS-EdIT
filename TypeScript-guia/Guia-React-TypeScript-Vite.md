# React + TypeScript + Vite: La Tríada Moderna

Esta guía es un anexo especializado para llevar tus conocimientos de TypeScript al ecosistema de React. React y TypeScript son una pareja hecha en el cielo: React se trata de componentes y flujo de datos, y TypeScript se asegura de que esos componentes encajen y los datos fluyan correctamente.

---

## 1. Inicialización con Vite

Olvídate de `create-react-app`. Vite es el estándar moderno. Es rápido, ligero y tiene soporte de primera clase para TS.

### Comando de Creación

```bash
npm create vite@latest mi-app-react -- --template react-ts
```

Esto genera un proyecto configurado con:
- **Vite**: Bundler y servidor de desarrollo.
- **React**: La librería de UI.
- **TypeScript**: Configurado en `tsconfig.json` y `tsconfig.node.json`.
- **ESLint**: Para linting básico.

### Estructura Clave
Verás archivos `.tsx` en lugar de `.jsx`. La `x` final indica que el archivo contiene JSX (la sintaxis de HTML dentro de JS) y que TypeScript debe parsearlo.

---

## 2. Tipado de Componentes (Props)

La parte más fundamental. ¿Qué recibe tu componente?

### La Forma Moderna (Recomendada)

Ya no usamos tanto `React.FC` (Function Component) porque tenía algunos comportamientos implícitos (como incluir `children` automáticamente en versiones viejas) que no siempre queríamos. Lo mejor es tipar los props directamente en los argumentos.

```tsx
// Definimos la interfaz de los Props
interface BotonProps {
    texto: string;
    onClick: () => void;
    color?: "primario" | "secundario"; // Union type para limitar opciones
    deshabilitado?: boolean; // Opcional
}

// Desestructuramos y tipamos
export function Boton({ texto, onClick, color = "primario", deshabilitado }: BotonProps) {
    return (
        <button 
            onClick={onClick} 
            disabled={deshabilitado}
            className={`btn-${color}`}
        >
            {texto}
        </button>
    );
}
```

### Tipando `children`

Si tu componente envuelve a otros, necesitas recibir `children`. El tipo correcto suele ser `React.ReactNode`.

```tsx
import { ReactNode } from 'react';

interface ContenedorProps {
    titulo: string;
    children: ReactNode; // Acepta JSX, strings, null, arrays, etc.
}

export function Contenedor({ titulo, children }: ContenedorProps) {
    return (
        <section>
            <h1>{titulo}</h1>
            {children}
        </section>
    );
}
```

---

## 3. Hooks

Los hooks son donde ocurre la magia del estado y los efectos. TS infiere mucho, pero a veces necesita ayuda.

### `useState`

**Inferencia Automática (Lo más común):**
```tsx
const [contador, setContador] = useState(0); // TS sabe que es number
const [nombre, setNombre] = useState("Jorge"); // TS sabe que es string
```

**Tipado Explícito (Necesario para uniones o valores iniciales null):**
```tsx
interface Usuario {
    id: number;
    nombre: string;
}

// El estado puede ser Usuario O null (si no se ha logueado)
const [usuario, setUsuario] = useState<Usuario | null>(null);

// Más tarde...
// setUsuario({ id: 1, nombre: "Ana" }); // ✅
// setUsuario("Ana"); // ❌ Error
```

### `useRef` (Referencias al DOM)

Muy útil para acceder a elementos HTML directamente.

```tsx
// Inicializamos con null porque el elemento no existe al montar el componente
const inputRef = useRef<HTMLInputElement>(null);

const enfocarInput = () => {
    // TS nos obliga a verificar si current existe (no es null)
    inputRef.current?.focus(); 
};

return <input ref={inputRef} />;
```

### `useEffect`

`useEffect` no retorna valores (bueno, retorna void o una función de limpieza), así que raramente necesita tipado explícito.

---

## 4. Eventos del DOM

Uno de los dolores de cabeza más comunes al principio: "¿Qué tipo es `e`?".

No uses `any`. React provee tipos específicos para sus eventos sintéticos.

### Eventos de Formularios (`onChange`)

```tsx
import { ChangeEvent, useState } from 'react';

export function Formulario() {
    const [texto, setTexto] = useState("");

    // ChangeEvent<HTMLInputElement> es el tipo mágico
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setTexto(e.target.value);
    };

    return <input value={texto} onChange={handleChange} />;
}
```

### Eventos de Click/Submit (`MouseEvent`, `FormEvent`)

```tsx
import { FormEvent, MouseEvent } from 'react';

const handleSubmit = (e: FormEvent) => {
    e.preventDefault(); // TS sabe que preventDefault existe en FormEvent
    console.log("Enviando...");
};

const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    console.log("Click en coordenadas", e.clientX, e.clientY);
};
```

> **Truco Pro:** Si no sabes qué tipo es un evento, escribe el handler inline en el JSX (`onChange={(e) => ...}`), pon el cursor sobre `e` y mira qué tipo te dice VS Code. Luego copia ese tipo a tu función.

---

## 5. Context API

El Contexto suele ser problemático porque al crearlo a veces no tenemos el valor inicial real.

```tsx
import { createContext, useContext, useState, ReactNode } from 'react';

interface ThemeContextType {
    theme: "light" | "dark";
    toggleTheme: () => void;
}

// Opción 1: Valor inicial undefined (requiere chequeo al usarlo)
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
    const [theme, setTheme] = useState<"light" | "dark">("light");
    
    const toggleTheme = () => {
        setTheme(prev => prev === "light" ? "dark" : "light");
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

// Custom Hook para consumir el contexto de forma segura
export function useTheme() {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error("useTheme debe usarse dentro de un ThemeProvider");
    }
    return context; // Aquí TS ya sabe que context es ThemeContextType (no undefined)
}
```

---

## 6. Custom Hooks

Tipar tus propios hooks es igual que tipar funciones normales.

```tsx
function useToggle(initialState: boolean = false): [boolean, () => void] {
    const [state, setState] = useState(initialState);
    
    const toggle = () => setState(prev => !prev);
    
    // Retornamos una tupla (array fijo)
    return [state, toggle];
}

// Uso
const [esVisible, toggleVisibilidad] = useToggle(true);
```

---

## Resumen

1.  **Archivos `.tsx`**: Úsalos para componentes.
2.  **Props**: Define interfaces claras para tus componentes.
3.  **Hooks**: Deja que la inferencia trabaje, usa genéricos `<Tipo>` cuando haya ambigüedad (`null` inicial).
4.  **Eventos**: Importa los tipos de 'react' (`ChangeEvent`, `FormEvent`) y especifica el elemento HTML (`HTMLInputElement`).
5.  **No uses `any`**: En React es aún más peligroso porque rompe la cadena de props.

React y TypeScript requieren un poco más de escritura inicial, pero la confianza de refactorizar un componente sabiendo que **nada se romperá silenciosamente** no tiene precio.
