# Prácticas con Callbacks en Frontend

En estas prácticas aplicamos **callbacks** en situaciones comunes del
**desarrollo frontend**: manejo de eventos, animaciones, interacciones
con el DOM y simulación de asincronía en UI.

------------------------------------------------------------------------

## 📌 Práctica 1: Manejo de eventos en botones con callbacks dinámicos

Podemos asignar callbacks a un mismo botón para cambiar su
comportamiento según el contexto.

``` javascript
function asignarAccion(boton, callback) {
    boton.addEventListener("click", callback);
}

// Uso en el DOM
const btn = document.querySelector("#miBoton");

asignarAccion(btn, () => alert("Primera acción"));
asignarAccion(btn, () => console.log("Segunda acción registrada"));
```

✅ **Objetivo**: Comprender cómo los callbacks permiten modularizar la
lógica de eventos en el frontend.

------------------------------------------------------------------------

## 📌 Práctica 2: Animación con `setInterval` y callback al terminar

Creamos una animación de progreso con barra visual y ejecutamos un
callback al completarse.

``` javascript
function animarBarra(elemento, callback) {
    let progreso = 0;
    const intervalo = setInterval(() => {
        progreso += 10;
        elemento.style.width = progreso + "%";
        
        if (progreso >= 100) {
            clearInterval(intervalo);
            callback(); // cuando termina la animación
        }
    }, 300);
}

// Uso en el DOM
const barra = document.querySelector(".barra");
animarBarra(barra, () => alert("Carga completa ✅"));
```

✅ **Objetivo**: Usar callbacks para ejecutar acciones posteriores a una
animación.

------------------------------------------------------------------------

## 📌 Práctica 3: Confirmación personalizada con callbacks

Podemos construir un cuadro de confirmación propio que acepte callbacks
para **aceptar** o **cancelar**.

``` javascript
function mostrarConfirmacion(mensaje, onAceptar, onCancelar) {
    const respuesta = confirm(mensaje);
    if (respuesta) {
        onAceptar();
    } else {
        onCancelar();
    }
}

// Uso
mostrarConfirmacion(
    "¿Deseas guardar los cambios?",
    () => alert("Cambios guardados 💾"),
    () => alert("Operación cancelada ❌")
);
```

✅ **Objetivo**: Reemplazar flujos rígidos con callbacks flexibles en
interacciones con el usuario.

------------------------------------------------------------------------

## 📌 Práctica 4: Encadenar operaciones asincrónicas simuladas (AJAX fake)

Con callbacks se pueden encadenar operaciones dependientes, como si
fueran peticiones a un servidor.

``` javascript
function obtenerUsuario(callback) {
    setTimeout(() => {
        const usuario = { id: 1, nombre: "Ana" };
        callback(usuario);
    }, 1000);
}

function obtenerPedidos(usuarioId, callback) {
    setTimeout(() => {
        const pedidos = ["Pedido 1", "Pedido 2"];
        callback(pedidos);
    }, 1000);
}

// Uso
obtenerUsuario(function(usuario) {
    console.log("Usuario:", usuario.nombre);
    obtenerPedidos(usuario.id, function(pedidos) {
        console.log("Pedidos del usuario:", pedidos);
    });
});
```

✅ **Objetivo**: Entender cómo los callbacks gestionan dependencias
asincrónicas en frontend.

------------------------------------------------------------------------

## 🎯 Conclusión

En frontend, los **callbacks** son clave para: - Gestionar **eventos del
DOM**. - Coordinar **animaciones y transiciones**. - Implementar
**confirmaciones y diálogos personalizados**. - Manejar **operaciones
asincrónicas simuladas o reales (XHR, fetch, timers, etc.)**.

Aunque hoy se usan **promesas** y `async/await`, los callbacks siguen
siendo esenciales en muchas APIs del navegador.
