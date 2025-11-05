Express.js es un framework web, minimalista y flexible para node.js
simplificar el desarrollo de aplicaciones web y sobre todo API REST.
Es uno de los frameworks mas populares en el ecosistema Node.js y sirve como base para muchos otros frameworks.

Caracteristicas que encontraremos

1. minimalista
2. Middlewares (integracion muy facil)
3. Enrutamiento
4. Plantillas (Handlebars, Pug, EJS, JINJA, etc)
5. Preparado y orientado para generar APIS RESTFUL
6. Compatibilidad con Bases de datos (MongoDB, PostgreSQL, MariaDB, etc)

Parametros aceptados

1. Query params: http://ejemplo.com/api/usuarios?nombre=juan
2. Route Params: /usuarios/:id
3. Request Body: Datos enviados en el cuerpo de una peticion (POST, PUT, PATCH, GET)

Enrutamiento
Define como responde la aplicacion a solicitudes del cliente en un endpoint especifico (URI) y un metodo HTTP especifico (GET, POST, etc)

Middleware comunes

1. express.json()
   app.use(express.json())
2. express.urlencoded()
   app.use(express.urlencoded({extended:true}))
3. express.static()
   app.use(express.static('public'))

Middleware de terceros 4. CORS
npm install cors
const cors=require('cors')
app.use(cors()) 5. npm install helmet
const helmet = require('helmet')
app.use(helmet()) 6. npm install morgan
const morgan = require('morgan')
app.use(morgan())

BUENAS PRACTICAS

1. MANEJO DE ERRORES: Existen middlewares para manejo centralizado de errores
2. variables de entorno: normalmente usamos dotenv y nos va a ayudar al manejo de los .env pero es crucial, que desde el inicio armemos el .gitignore y evitemos que suba el archivo con variables de entorno
3. calidacion: siempre buscar validar los datos de entrada (podemos usar librerias para esto, como Joi o express-validator)
4. Seguridad: implementar medidas basicas (helmet, rate limits, CORS)
5. Logging: Registrar las solicitudes y errores para facilitar el debugging.
