# Integración Mercado Pago (Argentina) — Guía paso a paso (Node.js + React/Vite)

## 1) Resumen del flujo

1. Obtienes tus credenciales (clave pública y access token) desde tu cuenta de Mercado Pago. ([Mercado Pago][1])
2. En el **backend** (Node.js) creas una **payment preference** (pedido) usando el SDK/endpoint de Mercado Pago. El backend devuelve la URL (`init_point`) o el `id` de la preferencia. ([Mercado Pago][2])
3. En el **frontend** (React/Vite) llamas al endpoint del backend para obtener la preferencia y rediriges al cliente al checkout de Mercado Pago (Checkout Pro) o usas los Bricks/SDK para incrustar el payment brick. ([Mercado Pago][3])
4. Realizas pruebas en **sandbox / modo de prueba** antes de pasar a producción. ([Mercado Pago][4])

---

## 2) Requisitos previos

-   Cuenta en Mercado Pago (Argentina) y aplicación creada para obtener:

    -   **PUBLIC_KEY** (clave pública) — para el frontend.
    -   **ACCESS_TOKEN** (token secreto) — para el backend.

-   Node.js (v16+ recomendado) y npm/yarn.
-   Conocimientos básicos de Express y React.
-   Entorno de desarrollo: por ejemplo `localhost:5173` (Vite) y `localhost:3000` (Express).

> En la documentación oficial se recomienda crear la preference en el backend para no exponer el `access_token`. ([Mercado Pago][5])

---

## 3) Configurar claves (ENV)

Crea un archivo `.env` en la raíz del backend:

```
MP_ACCESS_TOKEN=PROD_OR_SANDBOX_ACCESS_TOKEN_AQUI
MP_PUBLIC_KEY=PUBLIC_KEY_AQUI   # usado en frontend
PORT=3000
```

-   Para pruebas (sandbox), usa las credenciales de testing que Mercado Pago provee en tu panel o activa modo de pruebas en la cuenta. ([Mercado Pago][4])

---

## 4) Backend: crear un endpoint que genere la `preference`

### 4.1 Instalar dependencias

```bash
mkdir mp-backend
cd mp-backend
npm init -y
npm install express mercadopago dotenv cors
```

### 4.2 Código mínimo (`server.js`)

```js
// server.js
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mercadopago = require("mercadopago");

const app = express();
app.use(cors());
app.use(express.json());

mercadopago.configure({
    access_token: process.env.MP_ACCESS_TOKEN,
});

// Endpoint para crear preference
app.post("/create_preference", async (req, res) => {
    try {
        const {
            title = "Producto de prueba",
            quantity = 1,
            unit_price = 100,
        } = req.body;

        const preference = {
            items: [
                {
                    title,
                    quantity,
                    unit_price: Number(unit_price),
                    currency_id: "ARS", // moneda Argentina
                },
            ],
            back_urls: {
                success: "http://localhost:5173/success",
                failure: "http://localhost:5173/failure",
                pending: "http://localhost:5173/pending",
            },
            auto_return: "approved", // redirige automáticamente cuando está aprobado
            // opcional: notification_url: 'https://tu-dominio.com/webhook'
        };

        const mpResponse = await mercadopago.preferences.create(preference);
        // mpResponse.body.init_point -> URL para Checkout Pro (usuario)
        // mpResponse.body.id -> id de preferencia
        res.json({ success: true, preference: mpResponse.body });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, error: err.message });
    }
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server listening on ${port}`));
```

**Qué hace**:

-   Crea la `preference` con `items`, `back_urls` y devuelve el objeto de preferencia con `init_point` (URL de checkout) y `id`. Usar el SDK servidor evita exponer el `ACCESS_TOKEN`. ([Mercado Pago][1])

---

## 5) Frontend: React + Vite (redirección simple a Checkout Pro)

### 5.1 Crear proyecto Vite + React

```bash
npm create vite@latest mp-frontend --template react
cd mp-frontend
npm install
```

### 5.2 Página simple que consume el endpoint

`src/App.jsx`:

```jsx
import { useState } from "react";

function App() {
    const [loading, setLoading] = useState(false);

    const handlePay = async () => {
        setLoading(true);
        try {
            const res = await fetch("http://localhost:3000/create_preference", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    title: "Camiseta demo",
                    quantity: 1,
                    unit_price: 1500,
                }),
            });
            const data = await res.json();
            if (data.success && data.preference && data.preference.init_point) {
                // Redirige al checkout de Mercado Pago (Checkout Pro)
                window.location.href = data.preference.init_point;
            } else {
                alert("Error al crear la preferencia");
            }
        } catch (err) {
            console.error(err);
            alert("Error en el pago");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ padding: 40 }}>
            <h1>Demo Mercado Pago - Checkout Pro</h1>
            <button onClick={handlePay} disabled={loading}>
                {loading ? "Cargando..." : "Pagar con Mercado Pago"}
            </button>
        </div>
    );
}

export default App;
```

**Explicación**:

-   El frontend **no** usa el `access_token`. Simplemente pide al backend que genere la preference y luego redirige al `init_point`. Es el flujo más sencillo y recomendado si no necesitas una experiencia embebida. ([Mercado Pago][5])

---

## 6) Alternativa: usar Bricks / SDK React para integrar el botón embebido

Si quieres un checkout embebido (sin ir a otra página), Mercado Pago ofrece **Checkout Bricks** y un SDK React (`@mercadopago/sdk-react`) con componentes listos (Payment Brick, Wallet Brick, etc.). Requiere inicializar con la **public key** en frontend y aún así crear la preference en backend. ([GitHub][6])

Ejemplo mínimo de inicialización (si optás por usar bricks):

```jsx
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";

initMercadoPago(import.meta.env.VITE_MP_PUBLIC_KEY);

// luego usar <Wallet /> o los Bricks correspondientes con el preference id
```

Consulta la doc oficial del SDK React para ver los componentes y props disponibles. ([GitHub][6])

---

## 7) Pruebas (sandbox / test purchases)

-   Mercado Pago tiene documentación específica para pruebas y tarjetas de prueba. Usá el modo de prueba (sandbox) y las tarjetas de testing proporcionadas para simular pagos sin mover dinero real. ([Mercado Pago][4])
-   En el panel de developers podés ver logs, credenciales y detalles de integración. ([Mercado Pago][1])

---

## 8) Consideraciones y buenas prácticas

-   **Nunca** publiques el `ACCESS_TOKEN` en el frontend ni en repositorios públicos. Manténlo en variables de entorno del servidor. ([Mercado Pago][1])
-   Usa `back_urls` y el parámetro `auto_return` para controlar a dónde redirigir al comprador tras la compra. ([Mercado Pago][5])
-   Para notificaciones/conciliación automática, configurá `notification_url` (webhook) en la preference o en la app y procesá las notificaciones recibidas según la documentación — útil para confirmar pagos en tu sistema antes de entregar producto/servicio. (Ver docs de Notificaciones en la documentación oficial). ([Mercado Pago][2])
-   Si querés una experiencia UI más integrada (formularios de tarjeta en tu sitio), investigá Secure Fields / Card Tokenization y Checkout Bricks (requieren atención a PCI y uso del SDK cliente). ([GitHub][6])

---

## 9) Checklist rápido para pasar a producción

-   [ ] Cambiar credenciales a las de producción (ACCESS_TOKEN y PUBLIC_KEY). ([Mercado Pago][1])
-   [ ] Probar flujos completos con tarjetas de prueba (sandbox). ([Mercado Pago][4])
-   [ ] Implementar y verificar webhook/notification_url para confirmar pagos. ([Mercado Pago][2])
-   [ ] Revisar políticas de reembolso, cuotas e impuestos según Argentina.
-   [ ] Revisar manejo de errores y logs en backend.

---

## 10) Recursos oficiales (lectura recomendada)

-   SDKs servidor (Node.js y otros) — documentación oficial. ([Mercado Pago][1])
-   Create preference (reference) — cómo armar la preference y parámetros. ([Mercado Pago][2])
-   Add frontend SDK (MercadoPago.js) — integrar SDK cliente / bricks. ([Mercado Pago][3])
-   SDK React (github + docs) — componentes React para Checkout Bricks. ([GitHub][6])
-   Test purchases / Integration test — cómo ejecutar compras de prueba (sandbox). ([Mercado Pago][4])

---

### ¿Querés que lo adapte a tu caso concreto?

Puedo:

-   Generar un proyecto completo (zip) con backend y frontend listo para ejecutar en `localhost` (incluyendo `README` y `.env.example`).
-   Mostrar cómo implementar **webhooks** y procesar notificaciones.
-   Convertir el ejemplo a **Checkout Bricks** embebido con `@mercadopago/sdk-react`.

Dime cuál de las opciones preferís y lo entrego listo (código completo y probado para ejecutar en local).

[1]: https://www.mercadopago.com.ar/developers/en/docs/sdks-library/server-side?utm_source=chatgpt.com "Server side - SDKs - Mercado Pago Developers"
[2]: https://www.mercadopago.com.ar/developers/en/reference/preferences/_checkout_preferences/post?utm_source=chatgpt.com "Create preference"
[3]: https://www.mercadopago.com.ar/developers/en/docs/checkout-pro/web-integration/add-frontend-sdk?utm_source=chatgpt.com "Add the SDK to the frontend and initialize the checkout"
[4]: https://www.mercadopago.com.ar/developers/en/docs/checkout-pro/integration-test/test-purchases?utm_source=chatgpt.com "Perform test purchases - Integration test"
[5]: https://www.mercadopago.com.ar/developers/en/docs/checkout-pro/create-payment-preference?utm_source=chatgpt.com "Create and configure a payment preference"
[6]: https://github.com/mercadopago/sdk-react?utm_source=chatgpt.com "mercadopago/sdk-react: Mercado Pago's Official React SDK"
