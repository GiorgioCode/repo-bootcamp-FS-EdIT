# Ejemplo 2: SPA Intermedia con History API

## 🎯 Objetivo

Implementar navegación SPA usando History API para URLs limpias sin hash.

## 🔑 Conceptos Clave

### History API

-   **`history.pushState(data, title, url)`**: Cambia URL sin recargar
-   **`history.back()` / `history.forward()`**: Navegación por historial
-   **Evento `popstate`**: Se dispara al usar back/forward

### Diferencias con Hash Routing

| Hash Routing   | History API  |
| -------------- | ------------ |
| `#/home`       | `/home`      |
| Solo fragmento | URL completa |
| `hashchange`   | `popstate`   |

## 📝 Código Explicado

### Navegación Programática

```javascript
// Cambiar URL sin recargar página
history.pushState(data, "", "/products");

// Escuchar navegación back/forward
window.addEventListener("popstate", (event) => {
    // Manejar cambio de ruta
});
```

### Flujo de Navegación

1. **Click** → `navigateTo('/products')`
2. **pushState** → Cambia URL a `/products`
3. **handleRoute** → Muestra contenido de productos

## 🚀 Cómo Probarlo

1. Abrir `index.html` en servidor local
2. Hacer clic en botones de navegación
3. Observar:
    - URL cambia completamente (`/home`, `/products`)
    - Botones back/forward del navegador funcionan
    - No hay recarga de página

## 🔍 Puntos de Aprendizaje

-   ✅ **URLs limpias**: Sin hash, rutas reales
-   ✅ **pushState**: Cambiar URL sin recargar
-   ✅ **popstate**: Detectar back/forward
-   ✅ **Estado**: Pasar datos entre rutas
