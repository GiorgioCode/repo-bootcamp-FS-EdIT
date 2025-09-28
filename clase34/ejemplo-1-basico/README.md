# Ejemplo 1: SPA Básica con Hash Routing

## 🎯 Objetivo

Entender los fundamentos de una SPA usando `location.hash` para la navegación.

## 🔑 Conceptos Clave

### Location.hash

-   **¿Qué es?**: El fragmento de la URL después del símbolo `#`
-   **Ejemplo**: `http://localhost/#about` → `location.hash = "#about"`
-   **Ventaja**: No recarga la página al cambiar

### Evento hashchange

-   Se dispara cuando cambia `location.hash`
-   Permite detectar navegación sin recargar página

## 📝 Código Explicado

### HTML (25 líneas)

-   Navegación con enlaces `href="#section"`
-   Contenedores `.page` para cada sección
-   Solo una página visible (`.active`)

### JavaScript (45 líneas)

```javascript
// 1. Escuchar cambios de hash
window.addEventListener("hashchange", () => this.handleRoute());

// 2. Obtener hash actual
const hash = location.hash.slice(1) || "home";

// 3. Mostrar/ocultar contenido
document.getElementById(hash).classList.add("active");
```

## 🚀 Cómo Probarlo

1. Abrir `index.html` en el navegador
2. Hacer clic en los enlaces de navegación
3. Observar:
    - URL cambia pero NO hay recarga
    - Contenido se actualiza dinámicamente
    - Botones back/forward funcionan

## 🔍 Puntos de Aprendizaje

-   ✅ **SPA básica**: Una página, múltiples vistas
-   ✅ **Hash routing**: Navegación con `#`
-   ✅ **Location API**: `location.hash`
-   ✅ **Event handling**: `hashchange`
