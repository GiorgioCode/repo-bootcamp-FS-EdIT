// ============================================
// SERVIDOR BACKEND - ECOMMERCE CON MERCADOPAGO
// ============================================
// Este archivo crea un servidor web que actúa como intermediario entre:
// 1. El frontend (la página web que ve el usuario)
// 2. MercadoPago (la plataforma de pagos)
// 3. El archivo products.json (donde están almacenados nuestros productos)

// ============================================
// PASO 1: IMPORTAR DEPENDENCIAS
// ============================================
// Las dependencias son bibliotecas de código que otros programadores crearon
// y que podemos usar en nuestro proyecto para no tener que programar todo desde cero

// require('dotenv').config() carga las variables del archivo .env
// El archivo .env contiene información sensible como contraseñas y tokens
// que NO queremos compartir en el código (por seguridad)
require('dotenv').config();

// Express: Es un framework (conjunto de herramientas) para crear servidores web en Node.js
// Nos facilita crear rutas (URLs) y manejar peticiones HTTP
const express = require('express');

// CORS (Cross-Origin Resource Sharing): Permite que nuestro frontend (en puerto 5173)
// pueda hacer peticiones a nuestro backend (en puerto 3000)
// Sin CORS, el navegador bloquearía estas peticiones por seguridad
const cors = require('cors');

// fs (File System): Módulo nativo de Node.js para trabajar con archivos
// Lo usaremos para leer el archivo products.json
const fs = require('fs');

// path: Módulo nativo de Node.js para trabajar con rutas de archivos
// Nos ayuda a construir rutas correctas independientemente del sistema operativo
const path = require('path');

// MercadoPagoConfig y Preference: Clases del SDK oficial de MercadoPago
// - MercadoPagoConfig: Para configurar la conexión con MercadoPago usando nuestras credenciales
// - Preference: Para crear "preferencias de pago" (es decir, preparar un pago)
const { MercadoPagoConfig, Preference } = require('mercadopago');

// ============================================
// PASO 2: CREAR LA APLICACIÓN EXPRESS
// ============================================
// express() crea una nueva instancia de la aplicación
// Una "instancia" es como crear un objeto que tiene todas las funcionalidades de Express
const app = express();

// ============================================
// PASO 3: CONFIGURAR MIDDLEWARES
// ============================================
// Los middlewares son funciones que se ejecutan ANTES de que nuestras rutas procesen las peticiones
// Piensa en ellos como "filtros" o "procesadores previos"

// app.use(cors()): Habilita CORS para todas las rutas
// Esto permite que el frontend (React en puerto 5173) pueda comunicarse con este backend (puerto 3000)
// Sin esto, el navegador mostraría errores de "CORS policy"
app.use(cors());

// app.use(express.json()): Permite que nuestro servidor entienda datos en formato JSON
// Cuando el frontend envía datos (por ejemplo, al comprar), vienen en formato JSON
// Este middleware los convierte automáticamente en objetos JavaScript que podemos usar
app.use(express.json());

// ============================================
// PASO 4: CONFIGURAR MERCADOPAGO
// ============================================
// Crear una instancia del cliente de MercadoPago
// accessToken: Es como una "llave" o "contraseña" que nos da MercadoPago
// Se obtiene desde process.env.MP_ACCESS_TOKEN que está en el archivo .env
// Esta llave nos permite usar los servicios de MercadoPago en nuestra aplicación
const client = new MercadoPagoConfig({
  accessToken: process.env.MP_ACCESS_TOKEN
});

// ============================================
// RUTA 1: GET /products
// ============================================
// Esta ruta se ejecuta cuando el frontend hace una petición GET a http://localhost:3000/products
// Su objetivo: devolver la lista de productos que están en el archivo products.json

// app.get(): Define una ruta que responde a peticiones GET
// '/products': Es la dirección (URL) de esta ruta
// (req, res) => { ... }: Es una función que se ejecuta cuando alguien accede a esta ruta
//   - req (request): Objeto que contiene información sobre la petición (qué pide el cliente)
//   - res (response): Objeto que usamos para enviar la respuesta al cliente
app.get('/products', (req, res) => {
  // try-catch: Maneja errores posibles
  // Si algo sale mal dentro del "try", el código salta al "catch" en lugar de romper la aplicación
  try {
    // PASO 1: Construir la ruta completa al archivo products.json
    // __dirname: Variable especial de Node.js que contiene la ruta de la carpeta actual
    // path.join(): Une rutas de forma segura, sin importar el sistema operativo (Windows usa \, Linux/Mac usan /)
    // Resultado: algo como "/Users/usuario/proyecto/backend/products.json"
    const productsPath = path.join(__dirname, 'products.json');

    // PASO 2: Leer el contenido del archivo
    // fs.readFileSync(): Lee un archivo de forma SÍNCRONA (el código espera a que termine de leer)
    // 'utf-8': Especifica la codificación del archivo (cómo interpretar los bytes)
    // Resultado: Una cadena de texto (string) con el contenido del JSON
    const productsData = fs.readFileSync(productsPath, 'utf-8');

    // PASO 3: Convertir el texto JSON a un objeto JavaScript
    // JSON.parse(): Convierte una cadena de texto en formato JSON a un objeto/array de JavaScript
    // Ejemplo: '{"nombre": "Juan"}' (texto) → { nombre: "Juan" } (objeto)
    const products = JSON.parse(productsData);

    // PASO 4: Enviar la respuesta al frontend
    // res.json(): Envía una respuesta en formato JSON
    // return: Termina la ejecución de la función (no se ejecuta más código después)
    // Enviamos un objeto con:
    //   - success: true → indica que todo salió bien
    //   - products: [array de productos] → los productos que leímos
    return res.json({ success: true, products });

  } catch (err) {
    // Este bloque se ejecuta si hubo ALGÚN error en el try (archivo no existe, JSON mal formado, etc.)

    // Mostrar el error en la consola del servidor (para que nosotros lo veamos)
    console.error('Error al leer productos:', err);

    // Enviar una respuesta de error al frontend
    // res.status(500): Establece el código de estado HTTP a 500 (Internal Server Error)
    // .json(): Envía un objeto JSON con información del error
    return res.status(500).json({
      success: false,           // Indica que hubo un error
      message: err.message      // El mensaje de error específico
    });
  }
});

// ============================================
// RUTA 2: POST /create_preference
// ============================================
// Esta ruta se ejecuta cuando el frontend hace una petición POST a http://localhost:3000/create_preference
// Su objetivo: crear una "preferencia de pago" en MercadoPago (preparar el checkout)

// app.post(): Define una ruta que responde a peticiones POST (enviar datos)
// async: Indica que esta función es ASÍNCRONA (puede usar "await" para esperar operaciones)
app.post('/create_preference', async (req, res) => {
  try {
    // PASO 1: Extraer los items del cuerpo de la petición
    // req.body: Contiene los datos que el frontend envió en la petición
    // El frontend envía algo como: { items: [{ title: "Producto", quantity: 1, unit_price: 100 }] }
    // Usamos "destructuring" para extraer solo la propiedad "items"
    const { items } = req.body;

    // PASO 2: Validar que recibimos items
    // Verificamos dos cosas:
    // 1. Que "items" existe (!items es verdadero si items es undefined, null, etc.)
    // 2. Que "items" no es un array vacío (items.length === 0)
    if (!items || items.length === 0) {
      // Si no hay items, enviar error 400 (Bad Request - petición incorrecta)
      return res.status(400).json({
        success: false,
        message: 'No hay items para procesar'
      });
    }

    // PASO 3: Formatear los items para MercadoPago
    // MercadoPago requiere que los items tengan un formato específico
    // .map(): Transforma cada elemento del array original en un nuevo formato
    // Por cada item del array, creamos un nuevo objeto con la estructura que MercadoPago espera
    const formattedItems = items.map(item => ({
      title: item.title,                    // El nombre del producto (ej: "Camiseta Premium")
      quantity: Number(item.quantity),      // Cantidad - convertida a número por seguridad
      unit_price: Number(item.unit_price),  // Precio - convertido a número por seguridad
      currency_id: 'ARS'                    // Moneda: ARS = Peso Argentino
    }));

    // PASO 4: Crear el objeto de configuración para la preferencia
    // Este objeto contiene toda la información que MercadoPago necesita para crear el pago
    const body = {
      // Los items que el usuario va a pagar
      items: formattedItems,

      // back_urls: URLs a donde MercadoPago redirigirá al usuario después del pago
      // Dependiendo del resultado, MercadoPago enviará al usuario a una URL diferente
      back_urls: {
        // Si el pago fue aprobado exitosamente
        success: 'http://localhost:5173/success',

        // Si el pago fue rechazado (tarjeta sin fondos, datos inválidos, etc.)
        failure: 'http://localhost:5173/failure',

        // Si el pago está pendiente (esperando confirmación bancaria, por ejemplo)
        pending: 'http://localhost:5173/pending'
      }
    };

    // PASO 5: Crear la preferencia en MercadoPago
    // new Preference(client): Crea una nueva instancia de Preference usando nuestro cliente configurado
    const preference = new Preference(client);

    // preference.create(): Envía una petición a MercadoPago para crear la preferencia
    // await: Espera a que MercadoPago responda antes de continuar
    // MercadoPago nos devuelve un objeto "result" que contiene:
    //   - id: ID único de la preferencia
    //   - init_point: URL donde el usuario debe ir para pagar
    //   - otros datos de la preferencia
    const result = await preference.create({ body });

    // PASO 6: Enviar la respuesta exitosa al frontend
    // El frontend recibirá este objeto y usará "result.init_point" para redirigir al usuario
    return res.json({
      success: true,      // Indica que todo salió bien
      preference: result  // Toda la información de la preferencia creada
    });

  } catch (err) {
    // Este bloque se ejecuta si algo salió mal (error de MercadoPago, red, etc.)

    // Mostrar el error en la consola del servidor
    console.error('Error al crear preferencia:', err);

    // Enviar respuesta de error al frontend
    return res.status(500).json({
      success: false,
      message: err.message
    });
  }
});

// ============================================
// PASO 5: INICIAR EL SERVIDOR
// ============================================
// Definir en qué puerto escuchará nuestro servidor
// process.env.PORT: Intenta obtener el puerto de las variables de entorno
// || 3000: Si no existe esa variable, usa el puerto 3000 por defecto
const PORT = process.env.PORT || 3000;

// app.listen(): Inicia el servidor y lo pone a "escuchar" peticiones
// Parámetros:
//   1. PORT: El puerto donde escuchará (3000 en nuestro caso)
//   2. Una función callback que se ejecuta cuando el servidor arranca correctamente
app.listen(PORT, () => console.log(`Backend started on http://localhost:${PORT}`));

// ============================================
// RESUMEN DE CÓMO FUNCIONA TODO:
// ============================================
// 1. El servidor arranca y queda esperando peticiones en http://localhost:3000
// 2. Cuando el frontend pide productos (GET /products):
//    - Lee products.json
//    - Convierte el JSON a objeto JavaScript
//    - Lo envía al frontend
// 3. Cuando el usuario compra algo (POST /create_preference):
//    - Recibe los items del frontend
//    - Los formatea para MercadoPago
//    - Crea una preferencia de pago en MercadoPago
//    - Envía la URL de pago al frontend
//    - El frontend redirige al usuario a MercadoPago para que pague
// 4. Después del pago, MercadoPago redirige al usuario a /success, /failure o /pending