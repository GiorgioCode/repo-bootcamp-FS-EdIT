# Ejemplo 3: SPA Avanzada - Router Completo

## 🎯 Objetivo

Implementar un sistema de routing completo con parámetros dinámicos, manejo de errores y navegación avanzada.

## 🔑 Conceptos Avanzados

### Rutas Dinámicas

```javascript
// Patrón con parámetro
'/users/:id' → '/users/123'

// Extraer parámetros
{ id: '123' }
```

### Sistema de Routing

-   **Pattern matching**: Coincidencia de patrones de URL
-   **Parameter extraction**: Extracción automática de parámetros
-   **404 handling**: Manejo de rutas no encontradas
-   **Breadcrumbs**: Navegación contextual

## 📝 Arquitectura del Router

### Componentes Principales

1. **Route Registration**: `addRoute(pattern, callback, title)`
2. **URL Matching**: `matchRoute(path)` con regex
3. **Parameter Extraction**: `extractParams(pattern, path)`
4. **Navigation**: Interceptación de clicks y history

### Flujo de Navegación

```
Click → preventDefault → navigate() → pushState → handleRoute → matchRoute → callback
```

## 🚀 Características Implementadas

### ✅ Rutas Estáticas

-   `/` → Inicio
-   `/products` → Lista de productos
-   `/about` → Información

### ✅ Rutas Dinámicas

-   `/users/:id` → Detalle de usuario específico
-   Parámetros automáticamente extraídos

### ✅ Funcionalidades Avanzadas

-   **Interceptación de enlaces**: Automática con `[data-route]`
-   **Breadcrumbs**: Actualización automática
-   **404 handling**: Página de error personalizada
-   **Estado activo**: Navegación visual

## 🔍 Código Clave

### Extracción de Parámetros

```javascript
extractParams("/users/:id", "/users/123");
// Retorna: { id: '123' }
```

### Interceptación de Enlaces

```javascript
document.addEventListener("click", (e) => {
    if (e.target.matches("[data-route]")) {
        e.preventDefault();
        this.navigate(e.target.getAttribute("href"));
    }
});
```

1. **Navegar y probar**:
    - Rutas estáticas: `/`, `/products`, `/about`
    - Rutas dinámicas: `/users/123`, `/users/456`
    - 404: `/ruta-inexistente`

## 🔍 Puntos de Aprendizaje

-   ✅ **Router completo**: Pattern matching y parámetros
-   ✅ **Navegación interceptada**: Sin recargas
-   ✅ **Manejo de errores**: 404 personalizado
-   ✅ **UX avanzada**: Breadcrumbs y estados

## 🎓 Conceptos Dominados

Al completar este ejemplo, habrás aprendido a crear una SPA completa con todas las características de un router moderno, similar a los que usan frameworks como React Router o Vue Router.
