# ⚛️ Proyecto useContext - Ejemplos Educativos Paso a Paso

Este proyecto demuestra los patrones fundamentales de **useContext** de forma simple y educativa, comparando useState vs useReducer dentro de Context API con comentarios explicativos detallados.

## 🚀 Instalación y ejecución

```bash
# Instalar dependencias
npm install

# Ejecutar en modo desarrollo
npm run dev
```

## 📋 Ejemplos implementados (con comentarios paso a paso)

### 1. **Context Simple** (`ContadorSimpleContext.jsx`)
- ✅ Contador usando **useContext + useState**
- ✅ Patrón básico y directo para estado simple
- ✅ Comentarios explicativos línea por línea
- ✅ Ideal para casos sencillos

### 2. **Context Avanzado** (`ContadorContext.jsx`)
- ✅ Contador usando **useContext + useReducer**
- ✅ Patrón estructurado con acciones y dispatch
- ✅ Explicaciones detalladas del patrón reducer
- ✅ Mejor para lógica compleja y escalabilidad

## 🏗️ Estructura simplificada del proyecto

```
src/
├── context/
│   ├── ContadorSimpleContext.jsx   # useState + Context (comentado)
│   └── ContadorContext.jsx         # useReducer + Context (comentado)
├── components/
│   ├── ContadorSimple.jsx          # Consume contexto simple (comentado)
│   └── Contador.jsx                # Consume contexto avanzado (comentado)
└── App.jsx                         # Providers anidados (comentado)
```

## 🎯 Conceptos demostrados (con explicaciones)

### Fundamentos de Context
- ✅ **`createContext()`**: Cómo crear un contexto
- ✅ **`Provider`**: Cómo proveer valores a componentes
- ✅ **`useContext()`**: Cómo consumir valores del contexto
- ✅ **Providers anidados**: Múltiples contextos independientes

### Comparación: useState vs useReducer
- ✅ **useState**: Perfecto para estado simple (números, strings, booleans)
- ✅ **useReducer**: Ideal para estado complejo (objetos, múltiples campos)
- ✅ **Acciones explícitas**: Patrón dispatch({type: "action"}) 
- ✅ **Cuándo usar cada uno**: Guía práctica con ejemplos

## 🔧 ¿Cuándo usar useContext?

### ✅ Perfecto para:
- **🎨 Tema global**: colores, modo oscuro/claro
- **👤 Usuario logueado**: info que necesitan múltiples componentes
- **🌐 Configuración**: idioma, región, preferencias
- **📱 Estado de UI**: modals abiertos, sidebar expandido

### ❌ Evita useContext para:
- **📊 Estado frecuente**: que cambia muchas veces por segundo
- **🔄 Cache de API**: mejor usar React Query o SWR
- **📝 Formularios**: mejor usar React Hook Form
- **📈 Estado complejo**: considerar Zustand o Redux

## 🆚 useState vs useReducer - Guía práctica

### 🟢 useState + Context (ejemplo verde)
```jsx
const [contador, setContador] = useState(0);
// ✅ Llamadas directas: incrementar()
// ✅ Menos código para casos simples
// ✅ Perfecto para: strings, numbers, arrays simples
```

### 🔵 useReducer + Context (ejemplo azul)  
```jsx
const [state, dispatch] = useReducer(reducer, initialState);
// ✅ Acciones explícitas: dispatch({type: "incrementar"})
// ✅ Lógica centralizada en el reducer
// ✅ Perfecto para: objetos complejos, múltiples campos
```

## 🧪 Cómo probar los ejemplos

### Contador Simple (verde):
1. Observa la API directa: `onClick={incrementar}`
2. Ve el código simple del contexto con useState
3. Nota cómo se consume: destructuring directo

### Contador Avanzado (azul):
1. Observa el patrón de acciones: `onClick={() => dispatch({type: "incrementar"})}`
2. Ve la estructura del reducer con switch/case
3. Nota el debugging automático del estado

## 📚 Archivos clave para estudiar

1. **`ContadorSimpleContext.jsx`** - Aprende useContext + useState
2. **`ContadorContext.jsx`** - Entiende useContext + useReducer  
3. **`ContadorSimple.jsx`** - Ve cómo consumir contexto simple
4. **`Contador.jsx`** - Ve cómo consumir contexto con dispatch
5. **`App.jsx`** - Observa los providers anidados

## 💡 Progresión de aprendizaje sugerida

1. **Empieza** con el ejemplo verde (useState + Context)
2. **Entiende** cómo funciona createContext y Provider
3. **Practica** consumiendo con useContext
4. **Avanza** al ejemplo azul (useReducer + Context)
5. **Compara** ambos enfoques lado a lado
6. **Decide** cuál usar según tu caso de uso

¡Cada archivo tiene comentarios detallados explicando paso a paso cómo funciona useContext!
