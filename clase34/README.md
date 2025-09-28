# SPA (Single Page Application) - Ejemplos Progresivos

Tres ejemplos concisos para entender SPAs con JavaScript vanilla en **2.5 horas**.

## ¿Qué es una SPA?

Una **Single Page Application** carga una sola página HTML y actualiza el contenido dinámicamente sin recargar la página completa.

### Ventajas

-   Experiencia de usuario fluida
-   Mejor rendimiento después de carga inicial
-   Navegación instantánea

### Desventajas

-   SEO más complejo
-   Carga inicial más lenta
-   Requiere JavaScript habilitado

## Estructura del Proyecto

```
SPA-CLASE/
├── README.md
├── ejemplo-1-basico/          # Hash routing (#home, #about)
├── ejemplo-2-intermedio/      # History API (pushState/popstate)
└── ejemplo-3-avanzado/        # Router completo con parámetros
```

## APIs del Navegador

### Location API

```javascript
location.hash; // "#home"
location.pathname; // "/products"
location.href; // URL completa
```

### History API

```javascript
history.pushState(data, title, url); // Cambiar URL
history.back(); // Navegar atrás
window.addEventListener("popstate"); // Detectar navegación
```

## Plan de Clase (2.5 horas)

### **Ejemplo 1: Básico** (30 min)

-   Concepto de SPA
-   Hash routing con `location.hash`
-   Evento `hashchange`
-   **Archivo**: Solo abrir `index.html`

### **Ejemplo 2: Intermedio** (45 min)

-   History API con `pushState`
-   Evento `popstate`
-   URLs limpias sin hash
-   **Requisito**: Servidor local necesario

### **Ejemplo 3: Avanzado** (75 min)

-   Router con parámetros dinámicos
-   Manejo de errores 404
-   Navegación interceptada
-   Sistema completo de routing

## Objetivos de Aprendizaje

Al finalizar, los estudiantes podrán:

-   Explicar qué es una SPA y sus beneficios
-   Implementar navegación con hash y History API
-   Crear un router básico desde cero
-   Entender las bases de frameworks como React Router
